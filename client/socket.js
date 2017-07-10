import io from 'socket.io-client';
import store, {gotMessagesFromServer, writeMessage, gotNewMessageFromServer} from './store';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('I am now connected to the server!');

  socket.on('new-message', function(message) {
    store.dispatch(gotNewMessageFromServer(message));
  });
});

export default socket;
