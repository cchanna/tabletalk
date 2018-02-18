import React, { Component } from 'react'
import { string, number, bool, func, arrayOf } from 'prop-types'
import rx from 'resplendence'

import AutoSizeInput from 'react-input-autosize';

import Condition from './Condition';

rx`
@import '~Monsterhearts/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`

const Container = rx('div')`
  min-width: 200px;
  max-width: 300px;
`
const NewConditionInput = rx(AutoSizeInput)`
  margin-top: 10px;
  * {
    @include input-style;
    min-width: 160px;
  }
`
const Form = 'form';
const List = rx('div')`
  display: flex;
  flex-flow: row wrap;
`

class Conditions extends Component {
  static propTypes = {
    id: number.isRequired,
    conditions: arrayOf(string).isRequired,
    readOnly: bool.isRequired,
    createCondition: func.isRequired,
    deleteCondition: func.isRequired 
  }

  state = {
    value: ""
  }

  submit = () => {
    const value = this.state.value.trim();
    const { conditions } = this.props;
    if (value && !conditions.includes(value)) {
      const { id, createCondition } = this.props;
      createCondition({id, condition: value});
      this.setState({value: ""});
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.submit();
  }

  handleChange = e => {
    this.setState({value: e.target.value});
  }
  
  render() {
    const { id, conditions, readOnly, deleteCondition } = this.props;
    const { value } = this.state;
    const conditionComponents = conditions.map(name => (
      <Condition key={name} {...{name, id, readOnly, deleteCondition}}/>
    ))
    let form = null;
    if (!readOnly) {
      form = (
        <Form onSubmit={this.handleSubmit}>
          <NewConditionInput 
            onChange={this.handleChange} 
            value={value}
            maxLength={64}
            placeholder="Enter a condition"/>
        </Form>
      )
    }
    return (
      <Container>
        <List>
          {conditionComponents}
        </List>
        {form}
      </Container>
    );
  }
}

export default Conditions;