import React from 'react';
import rx from 'resplendence';
import AutosizeTextarea from 'react-textarea-autosize';

import { func } from 'prop-types';

rx`
@import '~Monsterhearts/fonts';
`

const Textarea = rx(AutosizeTextarea)`
  flex: none;
  width: 100%;
  height: auto;
  border: none;
  resize: none;
  padding: 1em;
  min-height: 1em;
  box-sizing: border-box;
  color: hsl(240, 10%, 7%);
  background-color: hsl(240, 10%, 95%);
  font-family: $body;
  &:focus {
    outline: none;
  }
`

class Input extends React.Component {
  static propTypes = {
    onChat: func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      value: ""
    }
  }
  handleKeyDown(e) {
    if (e.key == 'Enter' && !e.shiftKey) {
      this.props.onChat({text: this.state.value});
      this.setState({value: ""});
      e.preventDefault();
    }
  }
  handleChange(e) {
    this.setState({value: e.target.value});
  }
  render() {
    const { onChat, ...rest } = this.props;
    return (
      <Textarea placeholder='Say something'
                onKeyDown={this.handleKeyDown.bind(this)}
                onChange={this.handleChange.bind(this)}
                value={this.state.value}
                {...rest}/>
    );
  }
}

export default Input;
