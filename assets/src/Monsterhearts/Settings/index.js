import React from "react";
import rx from "resplendence";
import { hot } from "react-hot-loader";
import CustomPlaybooks from "./custom-playbooks";
import CustomMoves from "./custom-moves";
import { Route, Link } from "Routing";
import { useStore } from "store";

rx`
@import '~Monsterhearts/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`;

const SETTINGS = rx()`
  padding: 30px;
  width: 100%;
  box-sizing: border-box;
  overflow-y: scroll;
  height: 100%;
`;

const HEADER = rx()`
  font-family: $header;
  font-size: 30px;
  margin: 0;
`;

const SECTION = rx()`
  margin-bottom: 0px;
`;

const BREAK = rx()`
  @extend %break;
`;

const pages = [
  {
    route: {
      path: "playbooks",
      component: CustomPlaybooks
    },
    name: "Custom Playbooks"
  },
  {
    route: {
      path: "moves",
      component: CustomMoves
    },
    name: "Custom Moves"
  }
];

const LINK = rx()`
  @extend %link;
`;

const Settings = ({ depth }) => {
  return (
    <div className={SETTINGS}>
      {pages.map(({ name, route }) => (
        <Link key={route.path} className={LINK} to={route.path} depth={depth}>
          {name}
        </Link>
      ))}
      <Route pages={pages.map(({ route }) => route)} depth={depth} />
    </div>
  );
};

export default hot(module)(Settings);
