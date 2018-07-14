import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
import AutoSizeTextArea from 'react-autosize-textarea';
  
import { EditName } from "../EditableName";

rx`
@import '~DreamAskew/styles';
`

const Container = 'div';
const TextArea = rx(AutoSizeTextArea)`
  @include input-style;
  width: 100%;
  box-sizing: border-box;
  min-height: 25px;
  font-size: 15px;
  padding-top: 5px;
  &.hidden {
    opacity: 0;
    position: absolute;
    pointer-events: none;
  }
`
const Save = rx('button')`
  @include button-style;
`

class NewMinorCharacter extends Component {
  static propTypes = {
    createMinorCharacter: func.isRequired
  }

  state = {
    name: "",
    notes: ""
  }

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  handleSave = () => {
    const { createMinorCharacter } = this.props;
    const { name, notes } = this.state;
    createMinorCharacter({name, notes});
    this.setState({
      name: "",
      value: ""
    })
  }

  handleNameRef = e => this.nameRef = e;
  handleNotesRef = e => this.notesRef = e;

  handleClickName = () => this.nameRef.select();
  handleClickNotes = () => this.notesRef.select();
  
  render() {
    const { name, notes } = this.state;
    return (
      <Container>
        <EditName 
          type="text" name="name" value={name} 
          onChange={this.handleChange} placeholder="Create a new character"
          innerRef={this.handleNameRef} onClick={this.handleClickName} 
        />
        <TextArea 
          name="notes" value={notes} 
          onChange={this.handleChange} placeholder="notes"
          innerRef={this.handleNotesRef} onClick={this.handleClickNotes} 
        />
        <Save onClick={this.handleSave} disabled={!name}>Save</Save>
      </Container>
    );
  }
}

export default NewMinorCharacter;