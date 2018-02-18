import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
rx`
@import '~Monsterhearts/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`

const Container = rx('div')`
  margin-bottom: 30px;
  font-size: inherit;
  color: $foreground;
  display: block;
  text-align: left;
  width: 100%;
`
const Name = rx('h1')`
  font-family: $header;
  font-size: 1.2em;
  margin: 0;
  &.main {
    color: $accent;
  }
`
const Buttons = rx('div')`
  margin-top: -15px;
`
const StringButton = rx('button')`
  @include button-style;
  display: inline;
  font-size: 16px;
  &:not(:last-child) {
    margin-right: 20px;
  }
`

class Character extends Component {
  static propTypes = {
    myId: number.isRequired,
    id: number.isRequired,
    name: string,
    playbook: string,
    notes: string.isRequired,
    createString: func.isRequired
  }

  handleClickTake = () => {
    const {id, myId, createString} = this.props;
    createString({from: myId, to: id});
  }
  handleClickGive = () => {
    const {id, myId, createString} = this.props;
    createString({from: id, to: myId});
  }
  createSideCharacter
  
  render() {
    const { name, notes, playbook } = this.props;
    const paragraphs = (!notes || playbook) ? <p/> : notes
      .replace(/ *\n */g, "\n")
      .split("\n\n")
      .map((p, i) => <p key={i}>{p}</p>);
    let fullName = name;
    if (playbook) {
      if (name) {
        fullName = name + ", the " + playbook;
      }
      else {
        fullName = "The " + playbook
      }
    }
    return (
      <Container onClick={this.handleClick}>
        <Name rx={{main: !!playbook}}>{fullName}</Name>
        {paragraphs}
        <Buttons>
          <StringButton onClick={this.handleClickTake}>Take a string</StringButton>
          <StringButton onClick={this.handleClickGive}>Give a string</StringButton>
        </Buttons>
      </Container>
    );
  }
}

export default Character;