import React, { Component } from 'react'
import { string, number, bool, func } from 'prop-types'
import rx from 'resplendence'
  
rx`
@import '~Monsterhearts/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/colors';
`

const Container = rx('div')`
  margin-right: 15px;
`
const DeleteButton = rx('button')`
  @include button-style;
  font-family: "icomoon";
  margin-right: 5px;
  position: relative;
  top: 2px;
  &:not(:disabled) {
    color: darken($foreground, 40%);
  }
`

class Condition extends Component {
  static propTypes = {
    id: number.isRequired,
    name: string.isRequired,
    readOnly: bool.isRequired,
    deleteCondition: func.isRequired,
  }

  handleClick = () => {
    const { id, name, deleteCondition } = this.props;
    deleteCondition({id, condition: name});
  }
  
  render() {
    const { name, readOnly } = this.props;
    let deleteButton = null;
    if (!readOnly) {
      deleteButton = <DeleteButton onClick={this.handleClick}>X</DeleteButton>
    }
    return (
      <Container>
        {deleteButton}
        {name}
      </Container>
    );
  }
}

export default Condition;