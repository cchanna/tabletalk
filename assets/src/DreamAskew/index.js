import { connect } from "react-redux";

import DreamAskew from "./DreamAskew";
import withSize from "common/with-size";
import { compose } from "redux";

import { load } from "./thunks";
import { fromDreamAskew, fromSocket } from "state";

const mapStateToProps = (state, { depth }) => {
  return {
    depth,
    loaded: fromDreamAskew.getIsLoaded(state),
    connected: fromSocket.getIsConnected(state)
  };
};
const mapDispatchToProps = { load };

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withSize({ 1023: "mobile" })
)(DreamAskew);
