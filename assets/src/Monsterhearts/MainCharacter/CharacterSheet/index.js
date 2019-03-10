import { connect } from "react-redux";
import CharacterSheet from "./CharacterSheet";
import { compose } from "redux";
import withSizes from "common/with-size";
import { fromMonsterhearts } from "state";

const mapStateToProps = (state, { id, depth }) => {
  const {
    eyes,
    look,
    origin,
    moves,
    playbook
  } = fromMonsterhearts.getCharacter(state, id).mainCharacter;
  const { sexMove, advice } = fromMonsterhearts.getPlaybookDefinition(
    state,
    playbook
  );
  return {
    id,
    depth,
    eyes,
    look,
    origin,
    moves,
    playbook,
    sexMove,
    advice
  };
};

const mapDispatchToProps = {};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withSizes({ 1000: "small" })
)(CharacterSheet);
