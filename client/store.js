import { createStore } from 'redux'

const initialState = { messages : [] };

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';

// Reducer - changes the state

function reducer (state = initialState, action) {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return Object.assign({}, state, { messages: action.messages });
    default:
      return state;
  }
}

// Action Creators accesses the reducer

export function gotMessagesFromServer(messages){
  return {
    type : GOT_MESSAGES_FROM_SERVER,
    messages
  };
};

// Store aka API to our Action Creator

const store = createStore(reducer);
export default store;
