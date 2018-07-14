import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import AutoSizeTextArea from 'react-autosize-textarea';

import Markdown from './Markdown';

rx`
@import '~DreamAskew/styles';
`

const Container = rx('div')`
  width: 0%;
`
const TextArea = rx(AutoSizeTextArea)`
  @include input-style;
  width: 100%;
  box-sizing: border-box;
  min-height: 25px;
  &.hidden {
    opacity: 0;
    position: absolute;
    pointer-events: none;
  }
`
const Display = rx('button')`
  @include button;  
  @include input-style;
  width: 100%;
  margin-bottom: 5px;
  &:disabled {
    border-color: transparent;
  }
  &:not(:disabled):active {
    opacity: 0;
  }
  &.hidden {
    display: none;
    position: absolute;
    pointer-events: none;
  }
  &.placeholder {
    color: darken($foreground, 50%);
  }
  text-align: left;
  &.readOnly {
    border-left-width: 0;
    padding: 0;
  }
`

class Notes extends Component {
  static propTypes = {
    value: string,
    disabled: bool,
    readOnly: bool.isRequired,
    onEdit: func.isRequired
  }

  textArea = null;

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      editing: false
    }
  }

  handleChange = e => {
    this.setState({value: e.target.value});
  }

  handleRef = e => this.textArea = e;

  handleBlur = () => {
    const { value } = this.state;
    const { disabled, onEdit } = this.props;
    if (!disabled) {
      onEdit({value});
      this.setState({editing: false});
    }
  }

  handleClick = () => {
    const { disabled, readOnly } = this.props;
    if (!disabled && !readOnly) {
      this.setState({editing: true});
    }
    if (this.textArea) {
      this.textArea.select();
      this.textArea.setSelectionRange(0, this.textArea.value.length);
    }
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props;
    const { editing } = this.state;
    if (prevProps.value !== value && !editing) {
      this.setState({value});
    }
  }
  
  render() {
    const { disabled, readOnly } = this.props;
    const { value, editing } = this.state;
    if (readOnly && !this.props.value) return null;
    return (
      <Container>
        <TextArea 
          value={value} 
          onChange={this.handleChange} 
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          disabled={disabled || readOnly}
          innerRef={this.handleRef}
          tabIndex={editing ? 0 : -1}
          rx={{hidden: !editing}}
          placeholder="notes"/>
        <Display
          onFocus={this.handleClick}
          onClick={this.handleClick}
          disabled={disabled || readOnly}
          rx={{
            hidden: editing,
            placeholder: !this.props.value,
            readOnly
          }}
        >
          <Markdown text={this.props.value || "notes"}/>
        </Display>
      </Container>
    );
  }
}

export default Notes;