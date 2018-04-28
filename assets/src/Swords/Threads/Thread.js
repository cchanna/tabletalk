import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
import AutosizeTextarea from "react-textarea-autosize"  


rx`
@import '~Swords/styles';
`

const TextArea = rx(AutosizeTextarea)`
  @include input-style; 
  width: calc(100% - 40px);
  overflow: hidden;
`

const Container = rx('div')`
  background: white;
  box-shadow: -1px 1px 1px 1px rgba(0, 0, 0, .5);
  color: black;
  margin-bottom: 20px;
  padding: 20px;
`

class Thread extends Component {
  static propTypes = {
    id: number,
    text: string,
    reincorporatedBy: string,
    onChange: func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      text: props.id ? props.text : ""
    }
  }

  handleChange = e => {
    const text = e.target.value;
    this.setState({text})
  }

  handleBlur = () => {
    const { id, onChange } = this.props;
    const { text } = this.state;
    if (id) {
      onChange({ id, text });    
    }
    else if (text) {
      onChange({text});
      this.setState({text: ""})
    }
  }

  handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      this.handleBlur();
      e.preventDefault();
    }
    else if (this.props.id && !this.state.text && e.key === 'Backspace') {
      this.handleBlur();
    }
  }
  
  render() {
    const { text } = this.state;
    return (
      <Container>
        <TextArea value={text} onChange={this.handleChange} onBlur={this.handleBlur} onKeyDown={this.handleKeyDown} placeholder="record a new thread"/>
      </Container>
    );
  }
}

export default Thread;