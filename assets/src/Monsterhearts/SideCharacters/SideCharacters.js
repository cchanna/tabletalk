import React, { Component } from 'react'
import { string, number, bool, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import SideCharacter from './SideCharacter';
import NewSideCharacter from 'Monsterhearts/common/NewSideCharacter';
import NewString from 'Monsterhearts/common/NewString';

rx`
@import '~Monsterhearts/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`

const Container = rx('div')`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;
  padding: 30px;
  font-size: 20px;
  font-family: $body;
  height: 100%;
  box-sizing: border-box;
  overflow-y: scroll;
`
const Wrapper = rx('div')`
  height: 100%;
  &.small {
    max-width: 600px;
  }
`

class SideCharacters extends Component {
  static propTypes = {
    sideCharacters: arrayOf(number).isRequired,
    path: arrayOf(string).isRequired,
    here: arrayOf(string).isRequired,
    readOnly: bool.isRequired,
    sizes: arrayOf(string).isRequired
  }
  
  render() {
    const { sideCharacters, path, here, readOnly, sizes } = this.props;
    if (path.length < 2) {
      const content = sideCharacters.map(id => (
        <SideCharacter key={id} {...{id, path, here, readOnly, sizes}}/>
      ))
      return (
        <Container>
          <Wrapper rx={sizes}>
            {content}
            <NewSideCharacter/>
          </Wrapper>
        </Container>
      );
    }
    else {
      const [id, newString, ...newPath] = path;
      const newHere = [...here, id, newString];
      return (
        <Container>
          <Wrapper rx={sizes}>
            <NewString path={newPath} here={newHere}/>
          </Wrapper>
        </Container>
      )
    }
  }
}

export default SideCharacters;