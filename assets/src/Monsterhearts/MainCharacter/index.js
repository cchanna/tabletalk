import React, { useEffect } from "react";
import { string, number, bool, func, shape, object, arrayOf } from "prop-types";
import rx from "resplendence";

import Edit from "./Edit";
import CharacterSheet from "./CharacterSheet";
import { Link } from "Routing";
import NewString from "Monsterhearts/common/NewString";
import AnyMove from "./AnyMove";
import SelfMove from "./SelfMove";
import GrowingUpMove from "./GrowingUpMove";

import { Route } from "Routing";

import { useNavigator } from "Routing";
import { useMonsterhearts } from "store";
import { useSize } from "common/withSize";

rx`
@import '~Monsterhearts/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`;

const MAIN_CHARACTER = rx()`
  color: $foreground;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  font-size: 20px;
  font-family: $body;
  overflow: hidden;
  box-sizing: border-box;
  align-items: center;
  &.under-tablet {
    padding-top: 0px;
  }
`;

const NAME = rx()`
  margin: 0;
  font-family: $header;
  font-size: 40px;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  padding: 0 80px 10px 80px;
  &.under-tablet {
    font-size: 20px;
    padding: 0 50px 5px 50px;
  }
  box-shadow: 0 1px 2px 1px $background;
  position: relative;
  z-index: 1;
`;
const PLAYBOOK = rx()`
  color: $accent;
  white-space: nowrap;
`;
const CONTENT = rx()`
  width: 100%;
  flex: 1 1 0;
  padding: 0 30px 30px 30px;
  box-sizing: border-box;
  overflow-y: scroll;
`;
const EDIT_LINK = rx()`
  @include link;
  @include button-style;
  position: absolute;
  right: 30px;
  top: 25px;
  z-index: 2;
  &.under-tablet {
    font-size: 14px;
    top: 10px;
    right: 15px;
  }
`;
const BACK_BUTTON = rx()`
  @include button-style;
  position: absolute;
  left: 30px;
  top: 25px;
  z-index: 2;
  &.under-tablet {
    font-size: 14px;
    top: 10px;
    left: 15px;
  }
`;

const pages = [
  {
    path: "edit",
    component: Edit
  },
  {
    path: "newstring",
    component: NewString
  },
  {
    path: "anymove",
    component: AnyMove
  },
  {
    path: "selfmove",
    component: SelfMove
  },
  {
    path: "grow",
    component: GrowingUpMove
  },
  {
    component: CharacterSheet
  }
];

const MainCharacter = ({ depth }) => {
  const { replace, next, here, path, goBack } = useNavigator(depth);
  const id = parseInt(here[2], 10);
  const [
    { charactersById },
    _for,
    { getEditDone, getReadOnly }
  ] = useMonsterhearts();
  const character = charactersById[id];

  let editDone = true;
  let readOnly = false;
  if (character) {
    editDone = getEditDone(id).allDone;
    readOnly = getReadOnly(id);
  }

  useEffect(
    () => {
      if (!next && !editDone && !readOnly) {
        replace("edit");
      } else if (next && readOnly) {
        replace();
      }
    },
    [next, editDone, readOnly]
  );

  useEffect(
    () => {
      if (!character || !character.mainCharacter) replace([], -1);
    },
    [character]
  );

  const sizes = useSize({ 425: "mobile", 768: "tablet", 1024: "laptop" });

  if (!character) return null;
  const { name, mainCharacter } = character;
  if (!mainCharacter) return null;
  const { playbook } = mainCharacter;

  return (
    <div className={MAIN_CHARACTER} rx={sizes}>
      <div className={NAME}>
        {name ? (
          <>
            {name} <span className={PLAYBOOK}>the {playbook}</span>
          </>
        ) : (
          "The " + playbook
        )}
      </div>
      {next !== "edit" ||
      (path.length > 1 && sizes.includes("under-max")) ||
      path.length > 2 ? (
        <button className={BACK_BUTTON} rx={sizes} onClick={goBack}>
          Back
        </button>
      ) : null}
      {!editDone && readOnly ? null : !next ? (
        <Link className={EDIT_LINK} to="edit" depth={depth} rx={sizes}>
          Edit
        </Link>
      ) : next === "edit" ? (
        <Link className={EDIT_LINK} depth={depth} rx={sizes}>
          Done
        </Link>
      ) : null}
      <div className={CONTENT}>
        <Route depth={depth} pages={pages} sizes={sizes} id={id} />
      </div>
    </div>
  );
};

/*
 */

export default MainCharacter;
