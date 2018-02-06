import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import ExtraMove from './ExtraMove';
import Link from 'Routing/Link';

rx`
@import '~common/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`

const Container = rx('div')`
  height: 100%;
  padding-left: 30px;
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
    moves: arrayOf(string).isRequired,
    playbooksByName: object.isRequired,
    playbooks: arrayOf(string).isRequired,
    here: arrayOf(string).isRequired,
    showBackButton: bool.isRequired,
    advancement: bool.isRequired,
    createAdvancement: func.isRequired,
    createMove: func.isRequired,
    goBack: func.isRequired,
  }

  createMove = ({id, name}) => {
    const {createMove, advancement, createAdvancement, goBack} = this.props;
    if (advancement) {
      createAdvancement({id, advancementId: "any", move: name});
    }
    else {
      createMove({id, name});
    }
    goBack();
  }
  
  render() {
    const { id, moves, playbooksByName, playbooks, goBack, here, showBackButton } = this.props;
    const content = playbooks
      .map(name => {
        const playbook = playbooksByName[name];
        const playbookMoves = playbook.moves
          .filter(moveName => !moves.includes(moveName))
          .map(moveName => (
            <ExtraMove key={moveName} id={id} createMove={this.createMove} name={moveName}/>
          ))
        return (
          <Playbook key={name}>
            <Header>{name}</Header>
            {playbookMoves}
          </Playbook>
        )
      })
    return (
      <Container>
        {content}
      </Container>
    );
  }
}

export default AddMove;