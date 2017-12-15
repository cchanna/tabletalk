import React, { Component } from 'react'
import rx from 'resplendence'
import { func, arrayOf, string } from 'prop-types';

import { Formik, Form } from 'formik';
import { Input, Label, Error, SubmitButton } from './FormComponents';
  
rx`
@import '~common/styles';
@import '~common/colors';
`

const Container = rx(Form)`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 100%;
  align-items: center;
`

const Section = rx('div')`
  margin-right: 15px;
  min-width: 400px;
`

const FormBody = ({values, isSubmitting, errors}) => {
  const isValid = values.name.trim().length > 0 && Object.keys(errors).length === 0;
  return (
    <Container>
      <Section>
        <Label name="name">
          {(errors.name == "duplicate") ? <Error>A player with that name already exists</Error> : "What's your username (not your character name)?"}
        </Label>
        <Input type="text" name="name"/>
      </Section>
      <SubmitButton isSubmitting={isSubmitting} isValid={isValid}>Join!</SubmitButton>
    </Container>
  )
}

class JoinGameForm extends Component {
  static propTypes = {
    joinGame: func.isRequired,
    names: arrayOf(string).isRequired,
  }

  initialValues = {
    name: ''
  }

  validate = ({name}) => {
    const { names } = this.props;
    const errors = {};
    if (name.trim() === "") errors.name = "required";
    else if (names.includes(name.trim())) errors.name = "duplicate";
    return errors;
  }

  handleSubmit = ({name}, { setSubmitting, setErrors }) => {
    const { joinGame } = this.props;
    joinGame(name.trim())
      .catch(() => {
        setSubmitting(false);
      })
  }
  
  render() {
    return (
      <Formik
        initialValues={this.initialValues}
        validate={this.validate}
        onSubmit={this.handleSubmit}
        render={FormBody}
        validateOnChange={true}/>
    );
  }
}

export default JoinGameForm;