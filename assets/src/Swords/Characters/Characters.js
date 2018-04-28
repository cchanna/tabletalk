import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
import CharacterLink from './CharacterLink';
import Character from './Character';  

rx`
@import '~Swords/styles';
`

const Container = rx('div')`
  max-width: 600px;
  width: 100%;
  background: white;
  box-shadow: -1px 1px 1px 1px rgba(0, 0, 0, .5);
`

const Header = rx('div')`
  background: var(--text);
  display: flex;
  position: relative;
  flex-flow: row nowrap;
  overflow: hidden;
  box-shadow: -1px 1px 1px 1px rgba(0, 0, 0, .25);
`
const Content = rx('div')`
  overflow: hidden;
`

const TabBar = rx('div')`
  position: absolute;
  bottom: 0;
  height: 4px;
  transition-property: left, right, background;
  background: var(--color-single);
`

const Switcher = rx('div')`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  transition: 300ms left ease-in-out;
`



class Characters extends Component {
  static propTypes = {
    depth: number.isRequired,
    selectedCharacter: number,
    characterIds: arrayOf(number).isRequired
  }

  previousIndex = -1;

  componentDidUpdate(prevProps) {
    if (prevProps.selectedCharacter !== this.props.selectedCharacter) {
      this.previousIndex = prevProps.selectedCharacter;
    }
  }
  
  render() {
    const { depth, selectedCharacter, characterIds } = this.props;
    const index = characterIds.indexOf(selectedCharacter);
    return (
      <Container>
        <Header>
          {characterIds.map(id => (
            <CharacterLink key={id} id={id} depth={depth}/>
          ))}
          <TabBar style={{
            left: `${100 * index / characterIds.length}%`,
            right: `${100 * (characterIds.length - index - 1) / characterIds.length}%`,
            transitionDuration: this.previousIndex < index ? "300ms, 150ms, 150ms" : "150ms, 300ms, 150ms"
          }}/>
        </Header>
        <Content>
          <Switcher style={{
            left: `${-100 * (index)}%`,
            width: `${100 * characterIds.length}%`
          }}>
            {characterIds.map((id) => (
              <Character key={id} id={id}/>
            ))}
          </Switcher>
        </Content>
      </Container>
    );
  }
}

export default Characters;