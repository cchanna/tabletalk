import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import BigTabList from './BigTabList';
import TabList from './TabList';
import MainCharacter from 'Monsterhearts/MainCharacter';
import NewCharacter from 'Monsterhearts/NewCharacter';
import SideCharacters from 'Monsterhearts/SideCharacters';

import route from 'Routing/route';

rx`
@import '~common/styles';
@import '~Monsterhearts/colors';
`

const Container = rx('div')`
  width: 100%;
  height: 100%;
  flex: 1 0 0;
  display: flex;
  flex-flow: column;
`
const Content = rx('div')`
  flex: 1 0 0;
  width: 100%;
`

const pages = [
  {
    path: "side",
    component: SideCharacters
  },
  {
    path: "new",
    component: NewCharacter
  },
  {
    path: "*",
    component: MainCharacter
  }
];

class TabPicker extends Component {
  static propTypes = {
    me: number.isRequired,
    charactersById: object.isRequired,
    characters: arrayOf(number).isRequired
  }

  render() {
    const { me, charactersById, characters, path, here } = this.props;
    const tabs = characters
      .filter(id => charactersById[id].mainCharacter)
      .map(id => {
        const {name, mainCharacter, playerId} = charactersById[id];
        return {
          id, 
          name: name ? name : ("The "+ mainCharacter.playbook), 
          mine: (playerId === me)
        };
      })

    if (path.length === 0) {
      return <BigTabList tabs={tabs} here={here}/>
    }
    else {
      const [tab, ...newPath] = path;
      const window = route(path, here, pages);
      return (
        <Container>
          <TabList tabs={tabs} here={here}/>
          <Content>
            {window}
          </Content>
        </Container>
      )
    }
  }
}

export default TabPicker;