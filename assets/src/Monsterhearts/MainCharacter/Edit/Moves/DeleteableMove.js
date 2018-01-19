import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import Move from 'Monsterhearts/common/Move';
import Button from './Button';

rx`
@import '~Monsterhearts/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`

const Container = rx('div')`
  position: relative;
  color: $foreground;
`

class DeleteableMove extends Component {
  static propTypes = {
    id: number.isRequired,
    name: string.isRequired,
    deleteMove: func.isRequired
  }

  handleClick = () => {
    const { id, name, deleteMove } = this.props;
    deleteMove({id, name});
  }
  
  render() {
    const { id, name } = this.props;
    return (
      <Container>
        <Move id={id} name={name} showNotes/> 
        <Button onClick={this.handleClick}>X</Button>
      </Container>
    );
  }
}

export default DeleteableMove;