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
  overflow-y: scroll;
  padding: 30px;
  font-size: 20px;
  font-family: $body;
`
const Wrapper = rx('div')`
  max-width: 600px;
  display: flex;
  width: 100%;
  flex-flow: column nowrap;
`

class SideCharacters extends Component {
  static propTypes = {
    sideCharacters: arrayOf(number).isRequired,
    path: arrayOf(string).isRequired,
    here: arrayOf(string).isRequired,
    readOnly: bool.isRequired
  }
  
  render() {
    const { sideCharacters, path, here, readOnly } = this.props;
    if (path.length < 2) {
      const content = sideCharacters.map(id => (
        <SideCharacter key={id} {...{id, path, here, readOnly}}/>
      ))
      return (
        <Container>
          <Wrapper>
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
          <Wrapper>
            <NewString path={newPath} here={newHere}/>
          </Wrapper>
        </Container>
      )
    }
  }
}

export default SideCharacters;