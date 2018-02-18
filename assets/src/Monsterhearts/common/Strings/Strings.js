import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import String from './String';
import Link from 'Routing/Link';

rx`
@import '~Monsterhearts/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`

const Container = rx('div')`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  min-width: 350px;
`
const AddLink = rx(Link)`
  @include link;
  @include button-style;
  margin-top: 10px;
  &:not(:disabled) {
    color: darken($foreground, 30%);
  }
`


class Strings extends Component {
  static propTypes = {
    path: arrayOf(string).isRequired, 
    here: arrayOf(string).isRequired, 
    slowActionsById: object.isRequired,
    id: number.isRequired, 
    stringsTo: arrayOf(number).isRequired, 
    stringsFrom: arrayOf(number).isRequired, 
    stringsById: object.isRequired, 
    charactersById: object.isRequired,
    readOnly: bool.isRequired,
    addString: func.isRequired,
    createString: func.isRequired,
    spendString: func.isRequired
  }
  
  render() {
    const { 
      id, stringsTo, stringsFrom, stringsById, charactersById, 
      here, slowActionsById, addString, createString, spendString,
      readOnly 
    } = this.props;
    
    const allStrings = {}

    stringsTo
      .forEach(id => {
        const {to, value} = stringsById[id]
        allStrings[to] = {
          to: value,
          from: 0,
          toStringId: id,
          fromStringId: null
        }
      });
    stringsFrom
      .forEach(id => {
        const {from, value} = stringsById[id]
        if (allStrings[from]) {
          allStrings[from].from = value;
          allStrings[from].fromStringId = id;
        }
        else {
          allStrings[from] = {
            to: 0,
            from: value,
            toStringId: null,
            fromStringId: id
          }
        }
      });
    
    const ids = Object.keys(allStrings);
    const content = ids.map(them => {
      const { to, from, toStringId, fromStringId } = allStrings[them];
      const { name, mainCharacter } = charactersById[them];
      let fullName = name;
      if (!name && mainCharacter) fullName = "The " + mainCharacter.playbook;
      return (
        <String 
          key={`${id} ${them}`}
          name={fullName}
          myId={id} 
          {...{slowActionsById, toStringId, fromStringId, addString, createString, spendString, readOnly}}
          theirId={parseInt(them)} 
          myStrings={to} 
          theirStrings={from}
          giveString={() => {}}/>
      )
    })

    
    let addLink = null;
    if (!readOnly) {
      const linkTo = (here[2] === 'side') ? [...here, id.toString(), "newstring"] : [...here, "newstring"];
      addLink = <AddLink to={linkTo}>New string</AddLink>
    }
    return (
      <Container>
        {content}
        {addLink}
      </Container>
    );
  }
}

export default Strings;