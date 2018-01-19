import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import AutosizeTextArea from 'react-textarea-autosize';
import AutosizeInput from 'react-input-autosize';

rx`
@import '~Monsterhearts/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`

const Form = rx('form')`

`
const NameInput = rx(AutosizeInput)`
  display: block;
  margin-bottom: 10px;
  * {
    min-width: 250px;
    @include input-style;
  }
  &.error * {
    border-color: $accent;
    &::placeholder {
      color: darken($accent, 10%);
    }
    &:focus::placeholder {
      color: transparent;
    }
  }
`
const NotesTextArea = rx(AutosizeTextArea)`
  display: block;
  @include input-style;
  background: transparent;
  border-left: 2px solid $foreground;
  min-height: 20px;
  resize: none;
  height: auto;
  min-width: 250px;
  width: 100%;
  margin-bottom: 10px;
  transition-property: color, background, border;
  transition-duration: 150ms;
  &:hover {
    background: lighten($background, 10%);
  }
  &:focus {
    color: $background;
    background: $foreground;
    &::placeholder {
      color: transparent;
    }
  }
`
const Buttons = rx('div')`
  display: flex;
  flex-flow: row nowrap;
`
const CreateButton = rx('input')`
  @include button-style;
  &:disabled {
    color: transparent;
  }
`
const CancelButton = rx('button')`
  @include button-style;
  margin-left: 20px;
  &:disabled {
    color: transparent;
  }
`

class SideCharacterForm extends Component {
  static propTypes = {
    name: string,
    notes: string,
    submitting: bool,
    onSubmit: func.isRequired,
    onCancel: func
  }

  initialState = () => {
    const { name, notes } = this.props;
    return {
      values: {
        name: name ? name : "",
        notes: notes ? notes: ""
      },
      errors: {
        name: null,
        notes: null
      }
    }
  }

  constructor(props) {
    super(props);
    this.state = this.initialState()
  }
  

  handleSubmit = e => {
    e.preventDefault();
    const { values, errors } = this.state;
    const { submitting, onSubmit } = this.props;
    if (!errors.name && !submitting) {
      onSubmit(values);
    }
  }

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(({values}) => ({
      values: {
        ...values,
        [name]: value
      }
    }));
  }

  handleBlur = e => {
    if (e.target.name === "name") {
      this.setState(({errors, values}) => ({
        errors: {
          ...errors,
          name: values.name ? null : "required"
        }
      }))
    } 
  }

  componentDidUpdate(prevProps) {
    if (prevProps.submitting && !this.props.submitting) {
      this.setState(this.initialState());
    }
  }
  
  render() {
    const { values, errors } = this.state;
    const { submitting, onCancel } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <NameInput 
          type="text" 
          name="name"
          disabled={submitting}
          placeholder={errors.name ? "Name is required" : "Create a new side character"} 
          maxLength={64} 
          value={values.name} 
          rx={{error: !!errors.name}} 
          onChange={this.handleChange} 
          onBlur={this.handleBlur}/>
        <NotesTextArea 
          name="notes" 
          disabled={submitting}
          value={values.notes} 
          placeholder="description (optional)"
          onChange={this.handleChange}/>
        <Buttons>
          <CreateButton type="submit" value={onCancel ? "Save" : "Create"}
            disabled={!values.name || submitting}/>
          <CancelButton disabled={!onCancel} onClick={onCancel}>Cancel</CancelButton>
        </Buttons>
      </Form>
    );
  }
}

export default SideCharacterForm;