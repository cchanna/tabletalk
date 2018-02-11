import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import NewMoveList from '../NewMoveList';

rx`
@import '~Monsterhearts/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`

const Container = rx('div')`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`

class SelfMove extends Component {
  static propTypes = {
    id: number.isRequired,
    moves: arrayOf(string).isRequired,
    createAdvancement: func.isRequired,
    goBack: func.isRequired
  }

  handleAdd = move => {
    const { id, createAdvancement, goBack } = this.props;
    createAdvancement({id, advancementId: "self", move});
    goBack();
  }
  
  render() {
    const { id, moves } = this.props;
    return (
      <Container>
        <NewMoveList {...{id, moves}} onAdd={this.handleAdd}/>
      </Container>
    );
  }
}

export default SelfMove;