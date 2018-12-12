import { useMonsterhearts } from "store";

import React from "react";
import { number, string, bool } from "prop-types";
import rx from "resplendence";

import BigTabList from "./BigTabList";
import TabList from "./TabList";
import MainCharacter from "Monsterhearts/MainCharacter";
import NewCharacter from "Monsterhearts/NewCharacter";
import SideCharacters from "Monsterhearts/SideCharacters";
import RetiredCharacters from "./RetiredCharacters";

import { Route } from "Routing";

rx`
@import '~common/styles';
@import '~Monsterhearts/colors';
`;

const Container = rx("div")`
  width: 100%;
  height: 100%;
  flex: 1 0 0;
  display: flex;
  flex-flow: column;
`;
const Content = rx("div")`
  flex: 1 0 0;
  width: 100%;
  overflow: hidden;
`;

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
    properties: { retired: true }
  },
  {
    path: "*",
    component: MainCharacter
  },
  {
    component: BigTabList
  }
];

const TabPicker = ({ depth }) => {
  const [{ characterTabs: tabs }] = useMonsterhearts();
  const showRetired = false;

  return (
    <Container>
      <TabList {...{ tabs, depth, showRetired }} />
      <Content>
        <Route
          depth={depth}
          pages={pages}
          extraProperties={{ tabs, showRetired }}
        />
      </Content>
    </Container>
  );
};
TabPicker.propTypes = {
  depth: number.isRequired
};

export default TabPicker;
