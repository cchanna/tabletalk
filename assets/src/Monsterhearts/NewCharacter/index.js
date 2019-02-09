import { connect } from "react-redux";
import NewCharacter from "./NewCharacter";
import { compose } from "redux";

import withSize from "common/withSize";

import { goTo, getPath } from "Routing";
import { forMonsterhearts, fromMonsterhearts } from "state";

const { createCharacter } = forMonsterhearts;
const { getPlaybookNames, getMyCharacters } = fromMonsterhearts;

const mapStateToProps = (state, { depth }) => {
  const { next } = getPath(state, depth);
  const playbooks = getPlaybookNames(state);
  const myCharacters = getMyCharacters(state);
  return {
    depth,
    playbooks,
    myCharacters,
    playbook: !next ? null : next[0].toUpperCase() + next.slice(1)
  };
};

const mapDispatchToProps = { createCharacter, goTo };

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withSize({
    425: "mobile",
    768: "tablet",
    1024: "laptop",
    1440: "large",
    1920: "big"
  })
)(NewCharacter);
