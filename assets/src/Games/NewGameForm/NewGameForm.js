import React from 'react';
import rx from 'resplendence';
import { func, arrayOf, string, shape, number, bool } from 'prop-types';

import { kindsById, kindsOrder } from 'common/gameKinds';
import { InputStyle, Input, Select, Option, Label, Error, SubmitButton } from '../FormComponents';
import { Formik, Form } from 'formik';

rx`
@import "~common/styles";
@import "~common/colors";
`

const Container = rx(Form)`
  @include card;
  font-family: "Junction";
  color: $color-light;
  padding: 20px;
  margin: 20px 0;
  background: $card-background-dark;
`

const ButtonRow = rx('div')`
  margin: 5px 0 -20px 0;
  height: 53px;
`

const Section = rx('div')`
  margin-bottom: 15px;
`

const kinds = kindsOrder.map(i => <Option key={i} value={i}>{kindsById[i]}</Option>);
const kindsWithEmpty = [
  <Option key="empty" disabled hidden value="">select a kind</Option>,
  ...kinds
]

const convertToSlug = (name) => {
  return filterSlug(name.trim());
}

const filterSlug = (name) => {
  return name.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-_]/g, '').toLowerCase();
}

const FormBody = ({values, isValid, errors, touched, isSubmitting, handleChange, setFieldValue}) => {
  const changeName = e => {
    if (values.slug === "" || values.slug === convertToSlug(values.name)) {
      setFieldValue("slug", convertToSlug(e.target.value));
    }
    handleChange(e);
  }

  const changeSlug = e => {
    setFieldValue("slug", filterSlug(e.target.value));
  }
  
  return (
    <Container>
      <Section>
        <Label name="kind">What kind of game is it?</Label>
        <Select name="kind" >
          {(values.kind === '') ? kindsWithEmpty : kinds }
        </Select>
      </Section>
      <Section>
        <Label name="name" >What should it be called?</Label>
        <InputStyle type="text" name="name" placeholder="name" onChange={changeName} value={values.name} rx={{empty: values.name === ""}} maxLength={36}/>
      </Section>
      <Section>
        <Label name="name">
          {(touched && errors.slug === "duplicate") ? <Error>This slug is already in use, sorry!</Error> : "What url slug will it use?"}
        </Label>
        <InputStyle type="text" name="slug" placeholder="slug" onChange={changeSlug} value={values.slug} rx={{empty: values.slug === "" || errors.slug}} maxLength={36}/>
      </Section>
      <Section>
        <Label name="name">What's&nbsp;your&nbsp;username (not&nbsp;your&nbsp;character&nbsp;name)?</Label>
        <Input type="text" name="player" placeholder="username" maxLength={50} />
      </Section>
      <Section>
        <Label name="name">How many players are in your game?</Label>
        <Input type="number" name="maxPlayers" rx={"short"} min={1} max={20} />
      </Section>
      <ButtonRow>
        <SubmitButton isSubmitting={isSubmitting} isValid={isValid}>Create!</SubmitButton>
      </ButtonRow>
    </Container>
  )
}
FormBody.propTypes = {
  values: shape({
    kind: string.isRequired,
    name: string.isRequired,
    slug: string.isRequired,
    player: string.isRequired,
    maxPlayers: number.isRequired
  }),
  isValid: bool.isRequired,
  errors: shape({
    kind: string,
    name: string,
    slug: string,
    player: string,
    maxPlayers: string
  }),
  touched: bool.isRequired,
  isSubmitting: bool.isRequired,
  handleChange: func.isRequired,
  setFieldValue: func.isRequired
}

class NewGameForm extends React.Component {
  static propTypes = {
    create: func.isRequired,
    sizes: arrayOf(string).isRequired
  }

  initialValues = {
    kind: '',
    name: '',
    slug: '',
    player: '',
    maxPlayers: '6'
  }

  validate = values => {
    const errors = {};
    const required = ['kind', 'name', 'player', 'slug']
    for (let i=0; i<required.length; i++) {
      const property = required[i];
      if (values[property].trim() === "") {
        errors[property] = "required";
      }
    } 
    return errors;
  }

  handleSubmit = ({kind, name, slug, player, maxPlayers}, { setSubmitting, setErrors }) => {
    const { create } = this.props;
    create({kind, name, slug, player, maxPlayers: parseInt(maxPlayers, 10) })
      .catch(() => {
        setErrors({slug: "duplicate"});
        setSubmitting(false);
      })
  }
  render() {
    return (
      <Formik 
        initialValues={this.initialValues}
        validate={this.validate}
        onSubmit={this.handleSubmit}
        validateOnBlur={false}
        render={FormBody}/>
    )
  }
}

export default NewGameForm;