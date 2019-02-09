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
import Settings from "../Settings";

rx`
@import '~common/styles';
@import '~Monsterhearts/colors';
`;

const TAB_PICKER = rx()`
  flex: 1 0 0;
  width: 0;
  display: flex;
  flex-flow: column;
  align-items: stretch;
`;
const CONTENT = rx()`
  flex: 1 0 0;
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
    path: "settings",
    component: Settings
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
    <div className={TAB_PICKER}>
      <TabList {...{ tabs, depth, showRetired }} />
      <div className={CONTENT}>
        <Route
          depth={depth}
          pages={pages}
          extraProperties={{ tabs, showRetired }}
        />
      </div>
    </div>
  );
};
TabPicker.propTypes = {
  depth: number.isRequired
};

export default TabPicker;
