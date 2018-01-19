import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import { Instructions } from '../components';
import AutosizeInput from 'react-input-autosize';

rx`
@import '~Monsterhearts/styles';
@import '~Monsterhearts/fonts';
@import '~Monsterhearts/colors';
`

const Form = rx('form')`
  margin-bottom: 40px;
`
const Radio = rx('input')`
  width: 0;
  height: 0;
  opacity: 0;
  margin: 0;
  padding: 0;
`
const Label = rx('label')`
  font-family: $interact;
  cursor: inherit;
`
const Option = rx('div')`
  margin: 0;
  padding: 5px 5px;
  color: $foreground;
  transition-property: padding, color;
  transition-duration: 150ms;
  &.dark {
    color: darken($foreground, 30%)
  }
  &:hover, &:focus-within, &.checked {
    padding: 5px 10px;
  }
  &:hover, &:focus-within {
    color: lighten($accent, 10%);
    outline: none;
  }
  &:active {
    color: darken($accent, 30%);
  }
  cursor: pointer;
  &.checked {
    cursor: default;
    color: $accent;
  }
`
const Options = rx('div')`
  display: flex;
  margin: 10px 0;
  flex-flow: row wrap;
  justify-content: flex-start;
  transition: 150ms padding;
  padding: 0 10px;
  &.checked {
    padding: 0 5px;
  }
  &:hover, &:focus-within {
    padding: 0 5px;
    &.checked {
      padding: 0;
    }
  }
`
const TextInput = rx(AutosizeInput)`
  * {
    @include input-style;
    // font-size: 20px;
    // font-family: $body;
    // box-shadow: -1px 1px 2px 1px black;
    // background: lighten($background, 15%);
    // color: $foreground;
    // text-align: center;
    min-width: 80px;
    // box-sizing: border-box;
    // padding: 0 5px;
  }
`


class OptionsForm extends Component {
  static propTypes = {
    name: string.isRequired,
    value: string,
    options: arrayOf(string).isRequired,
    onSubmit: func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      value: props.value ? props.value : ""
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value && this.props.value !== this.state.value) {
      this.setState({value: this.props.value});
    }
  }

  handleRadioChange = e => {
    const { onSubmit, id } = this.props
    onSubmit({
      id,
      value: e.target.value
    });
  }
  handleTextChange = e => {
    this.setState({value: e.target.value})
  }
  handleTextBlur = () => {
    const { onSubmit, id } = this.props
    onSubmit({
      id,
      value: this.state.value
    });
  }
  
  render() {
    const { name, options, onSubmit } = this.props;
    const { value } = this.state;
    const radios = options.map((option, i) => {
      const id = `monsterhearts-character-edit-${name}-${i}`;
      return (
        <Option key={i} rx={{checked: value == option, dark: (value && value !== option)}}>
          <Label name="value" htmlFor={id}>
            <Radio type="radio" name="value" checked={option === value} id={id} tabIndex={0} value={option} onChange={this.handleRadioChange}/>
            {option}
          </Label>
        </Option>
      )
    })
    const checked = options.includes(value)
    return (
      <Form onSubmit={this.handleSubmit}>
        <Instructions>Choose your {name.toLowerCase()}</Instructions>
        <Options rx={{checked}}>
          {radios}
        </Options>
        <TextInput 
          type="text" 
          placeholder={name}
          onBlur={this.handleTextBlur} 
          name={(value && checked) ? undefined : "value"} 
          inputStyle={{}} 
          value={value} 
          onChange={this.handleTextChange} 
          size="10" 
          maxLength="64" />
      </Form>
    );
  }
}

export default OptionsForm;