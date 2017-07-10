import { createStore } from 'redux'

const initialState = {
  messages : [],
  newMessageEntry: ''
 };

//Action Type:
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const GOT_NEW_MESSAGE_FROM_SERVER = "GOT_NEW_MESSAGE_FROM_SERVER";


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
    default:
      return state;
  }
  return newState
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


// Store aka API to our Action Creator

const store = createStore(reducer);
export default store;


// store.dispatch(gotMessagesFromServer("hello world"))
