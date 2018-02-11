import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import NewMoveList from '../NewMoveList';

rx`
@import '~common/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`

const Container = rx('div')`
  height: 100%;
`
const Playbook = rx('div')`
  max-width: 600px;
  width: 100%;
  &:not(:first-child) {
    margin: 30px 0 0 0;
  }
`
const Header = rx('h1')`
  font-family: $header;
  margin: 0;
`

class AddMove extends Component {
  static propTypes = {
    id: number.isRequired,
    playbooks: arrayOf(shape({
      name: string.isRequired,
      moves: arrayOf(string).isRequired
    })),
    onAdd: func.isRequired,
  }
  
  render() {
    const { id, playbooks, onAdd } = this.props;
    return (
      <Container>
        {playbooks.map(({name, moves}) => {
          return (
            <Playbook key={name}>
              <Header>{name}</Header>
              <NewMoveList {...{id, moves, onAdd}}/>
            </Playbook>
          )
        })}
      </Container>
    );
  }
}

export default AddMove;