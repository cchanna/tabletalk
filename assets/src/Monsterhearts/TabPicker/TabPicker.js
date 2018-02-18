import React, { Component } from 'react'
import { number, string, bool } from 'prop-types'
import { tabsShape } from './propTypes';
import rx from 'resplendence'
  
import BigTabList from './BigTabList';
import TabList from './TabList';
import MainCharacter from 'Monsterhearts/MainCharacter';
import NewCharacter from 'Monsterhearts/NewCharacter';
import SideCharacters from 'Monsterhearts/SideCharacters';
import RetiredCharacters from './RetiredCharacters';

import route from 'Routing/routeNext';

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
  overflow: hidden;
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
    path: "retired",
    component: RetiredCharacters,
    properties: {retired: true}
  },
  {
    path: "*",
    component: MainCharacter
  },
  {
    component: BigTabList
  }
];

class TabPicker extends Component {
  static propTypes = {
    tabs: tabsShape.isRequired,
    depth: number.isRequired,
    showRetired: bool,
    next: string
  }

  render() {
    const { tabs, depth, next, showRetired } = this.props;

    let window = route(depth, next, pages, {tabs, showRetired});
    return (
      <Container>
        <TabList {...{tabs, depth, showRetired}}/>
        <Content>
          {window}
        </Content>
      </Container>
    )
  }
}

export default TabPicker;