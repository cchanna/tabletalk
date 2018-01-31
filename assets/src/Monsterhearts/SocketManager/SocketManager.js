import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import { Socket } from 'phoenix';

rx`
@import '~common/styles';
@import '~common/colors';
`

const Container = rx('div')`

`

class SocketManager extends Component {
  static propTypes = {
    slug: string.isRequired,
    jwt: string.isRequired,
    actionQueue: arrayOf(string).isRequired, 
    slowActionQueue: arrayOf(string).isRequired, 
    actionsById: object.isRequired, 
    slowActionsById: object.isRequired,
    connect: func.isRequired, 
    disconnect: func.isRequired, 
    answer: func.isRequired, 
    answerSlow: func.isRequired, 
    send: func.isRequired,
    chat: func.isRequired,
    dispatch: func.isRequired
  }

  dispatch = action => {
    const { actionsById, slowActionsById, answer, answerSlow, chat, dispatch } = this.props;
    const { uniqueId, log } = action;
    if (log) {
      chat(log);
    }
    if (actionsById[uniqueId]) {
      answer({uniqueId});
    }
    else {
      if (slowActionsById[uniqueId]) {
        answerSlow({uniqueId});
      }
      dispatch(action);
    }
  }
  
  componentDidUpdate(prevProps) {
    const { actionQueue, slowActionQueue, actionsById, slowActionsById, send } = this.props;
    let sent = false;
    if (!prevProps.actionQueue.length && actionQueue.length) {
      actionQueue.forEach(id => {
        const action = actionsById[id];
        this.channel.push("dispatch", action);
      });
      sent = true;
    }
    if (!prevProps.slowActionQueue.length && slowActionQueue.length) {
      slowActionQueue.forEach(id => {
        const action = slowActionsById[id];
        this.channel.push("dispatch", action);
      })
      sent = true;
    }
    if (sent) send();
  }

  componentDidMount() {
    const { slug, jwt, connect } = this.props;
    let baseUrl = (process.env.NODE_ENV === "production") ? "" : "ws://" + process.env.REACT_APP_API_URL;
    this.socket = new Socket(baseUrl + "/socket", {params: {jwt}});
    this.socket.connect();
    this.channel = this.socket.channel(`monsterhearts:${slug}`);
    this.channel.on("dispatch", this.dispatch);
    this.channel.join()
    .receive("ok", connect)
    .receive("error", ({reason}) => console.error("Failed join", reason))
    .receive("timeout", () => console.log("Networking issue. Still waiting..."))
  }
  
  componentWillUnmount() {
    const { disconnect } = this.props;
    this.channel.leave();
    this.socket.disconnect();
    disconnect();

  }
  
  render = () => null
}

export default SocketManager;