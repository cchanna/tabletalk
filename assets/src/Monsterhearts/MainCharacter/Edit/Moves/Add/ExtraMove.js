import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import BaseMove from 'Monsterhearts/common/Move';
import Button from '../Button';

rx`
@import '~Monsterhearts/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`

const Container = rx('div')`
  position: relative;
  color: $foreground;
  padding-bottom: 1px;
`

class Move extends Component {
  static propTypes = {
    id: number.isRequired,
    name: string.isRequired,
    createMove: func.isRequired
  }

  handleClick = () => {
    const { id, name, createMove } = this.props;
    createMove({id, name});
  }
  
  render() {
    const { id, name } = this.props;
    return (
      <Container>
        <BaseMove id={id} name={name}/> 
        <Button onClick={this.handleClick}>+</Button>
      </Container>
    );
  }
}

export default Move;