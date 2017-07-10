import React, { Component } from 'react';
import store, {gotMessagesFromServer, writeMessage, gotNewMessageFromServer, postMessage, writeName} from '../store';

export default class NameEntry extends Component {

  constructor () {
    super();
    this.state = store.getState();
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    store.dispatch(writeName());
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  handleChange (evt) {
    const action = writeName(evt.target.value);
    store.dispatch(action);
  }


  render () {
    return (
      <form className="form-inline">
        <label htmlFor="name">Your name:</label>
        <input
          className="form-control"
          type="text"
          name="name"
          value={this.state.name}
          onChange = {this.handleChange}
          placeholder="Enter your name"
          className="form-control"
         />
      </form>
    );
  }
}
