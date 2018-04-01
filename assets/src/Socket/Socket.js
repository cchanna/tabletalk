import { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
  
import { Socket } from 'phoenix';

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
    dispatch: func.isRequired,
    handle: func.isRequired
  }

  dispatch = event => {
    const { actionsById, slowActionsById, answer, answerSlow, dispatch, handle } = this.props;
    const { playerId, tempId, data } = event;
    const action = {
      ...data,
      playerId
    }
    if (tempId && actionsById[tempId]) {
      answer(event);
    }
    else {
      if (tempId && slowActionsById[tempId]) {
        answerSlow(event);
      }
      else {
        handle(event);
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
        this.channel.push("dispatch", {
          tempId: id,
          data: action
        });
      });
      sent = true;
    }
    if (!prevProps.slowActionQueue.length && slowActionQueue.length) {
      slowActionQueue.forEach(id => {
        const action = slowActionsById[id];
        this.channel.push("dispatch", {
          tempId: id,
          data: action
        });
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
    this.channel = this.socket.channel(`play:${slug}`);
    this.channel.on("dispatch", this.dispatch);
    this.channel.join()
    .receive("ok", connect)
    .receive("error", ({reason}) => console.error("Failed join", reason))
    .receive("timeout", () => console.error("Networking issue. Still waiting..."))
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