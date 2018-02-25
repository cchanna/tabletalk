import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import String from './String';
import { Link } from 'Routing';

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
    sideCharacter: bool.isRequired,
    depth: number.isRequired,
    slowActionsById: object.isRequired,
    id: number.isRequired, 
    readOnly: bool.isRequired,
    strings: arrayOf(shape({
      name: string.isRequired,
      theirId: number.isRequired,
      toStringId: number,
      fromStringId: number,
      myStrings: number.isRequired,
      theirStrings: number.isRequired
    })).isRequired,
    addString: func.isRequired,
    createString: func.isRequired,
    spendString: func.isRequired,
  }
  
  render() {
    const { 
      id, strings, depth, sideCharacter, slowActionsById, 
      addString, createString, spendString,
      readOnly 
    } = this.props;

    
    let addLink = null;
    if (!readOnly) {
      const linkTo = sideCharacter ? [id.toString(), "newstring"] : "newstring";
      addLink = <AddLink to={linkTo} depth={depth}>New string</AddLink>
    }
    return (
      <Container>
        {strings.map(({name, theirId, toStringId, fromStringId, myStrings, theirStrings}) => 
          <String 
            key={`${id} ${theirId}`}
            myId={id}
            {...{
              name, theirId, toStringId, fromStringId, myStrings, theirStrings, 
              slowActionsById, addString, createString, spendString, readOnly
            }}/>
        )}
        {addLink}
      </Container>
    );
  }
}

export default Strings;