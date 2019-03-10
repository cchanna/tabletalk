import { connect } from "react-redux";
import SideCharacters from "./SideCharacters";
import { compose } from "redux";
import withSizes from "common/with-size";

import { getPath } from "Routing";
import { fromMonsterhearts } from "state";

const mapStateToProps = (state, { depth }) => ({
  path: getPath(state, depth).path,
  sideCharacters: fromMonsterhearts.getSideCharacterIds(state),
  readOnly: !fromMonsterhearts.getAmIGM(state),
  depth
});

const mapDispatchToProps = {};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withSizes({ 1000: "small" })
)(SideCharacters);
