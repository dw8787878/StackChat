import React, { Component } from 'react';
import store, {gotMessagesFromServer, writeMessage, gotNewMessageFromServer, postMessage} from '../store';
import axios from 'axios';


export default class NewMessageEntry extends Component {

  constructor(props){
    super(props);
    this.state = store.getState();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
  }
  componentWillUnmount(){
    this.unsubscribe()
  }

  handleChange (evt) {
    const action = writeMessage(evt.target.value);
    store.dispatch(action);
  }

  handleSubmit(evt){
    evt.preventDefault()
    const action = postMessage(this.state.newMessageEntry, this.props.channelId, this.state.name)
    store.dispatch(action);
  }



  render () {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            value={this.state.newMessageEntry}
            onChange = {this.handleChange}
            placeholder="Say something nice..."
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}
