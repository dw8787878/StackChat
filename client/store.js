import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import socket from './socket';

const initialState = {
  messages : [],
  newMessageEntry: '',
  name: ''
 };

//Action Type:
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const GOT_NEW_MESSAGE_FROM_SERVER = "GOT_NEW_MESSAGE_FROM_SERVER";
const WRITE_NAME = 'WRITE_NAME'


// Reducer - changes the state

function reducer (state = initialState, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      newState.messages = action.messages
      break
    case GOT_NEW_MESSAGE_FROM_SERVER:
      newState.messages = state.messages.concat(action.message);
      break
    case WRITE_MESSAGE:
      newState.newMessageEntry = action.newMessageEntry;
      break
    case WRITE_NAME:
      newState.name = action.name;
      break
    default:
      return state;
  }
  return newState
}

//thunk functions

export function fetchMessages () {
  return function thunk (dispatch) {
    return axios.get('/api/messages')
      .then(res => res.data)
      .then(messages => {
        const action = gotMessagesFromServer(messages);
        dispatch(action);
      });
  }
}

export function postMessage (message, channelId, name) {
  return function thunk (dispatch) {
    console.log("message ==============>", message)
    return axios.post('/api/messages', {content: message, channelId, name})
      .then(res => res.data)
      .then(newMessage => {
        const action = gotNewMessageFromServer(newMessage);
        dispatch(action);
        socket.emit('new-message', newMessage);
      });
  }
}

// Action Creators accesses the reducer
export function gotMessagesFromServer(messages){
  return {
    type : GOT_MESSAGES_FROM_SERVER,
    messages
  };
};

export function writeMessage(messages){
  return {
    type : WRITE_MESSAGE,
    newMessageEntry : messages
  }
}

export function gotNewMessageFromServer(message){
  return {
    type : GOT_NEW_MESSAGE_FROM_SERVER,
    message
  }
}

export function writeName(name){
  return {
    type: WRITE_NAME,
    name
  }
}


// Store aka API to our Action Creator

const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));
export default store;


// store.dispatch(gotMessagesFromServer("hello world"))
