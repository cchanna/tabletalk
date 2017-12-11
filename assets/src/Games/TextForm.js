import React, { Component } from 'react'
import { string, func } from 'prop-types';
import rx from 'resplendence'
  
import Form from './Form';

rx`
@import '~common/styles';
@import '~common/colors';
`

let Input = props => <input type="text" {...props}/>
Input = rx(Input)`
  border: none;
  display: block;
  background: none;
  font-family: "Junction";
  color: $background-1;
  font-size: 20px;
  padding: 5px;
  text-align: center;
  &:focus {
    outline: none;
  }
  border-bottom: 2px solid $background-1;
`

const TextBox = ({value, onChange, onSubmit}) => <form onSubmit={onSubmit}><Input value={value} onChange={onChange}/></form>


class TextForm extends Component {
  static propTypes = {
    label: string.isRequired,
    input: string.isRequired,
    setInput: func.isRequired,
    submit: func.isRequired,
    goBack: func
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.submit();
  }

  handleChange = e => {
    this.props.setInput({input: e.target.value});
  }
  
  render() {
    const { label, input, goBack } = this.props;
    return (
      <Form {...{label, goBack}}>
        <TextBox value={input} onChange={this.handleChange} onSubmit={this.handleSubmit}/>
      </Form>
    );
  }
}

export default TextForm;