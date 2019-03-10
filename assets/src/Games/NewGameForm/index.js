import { connect } from "react-redux";

import NewGameForm from "./NewGameForm";

import { create } from "../actionCreators";
import { compose } from "redux";
import withSize from "../../common/with-size";

const mapStateToProps = () => ({});

const mapDispatchToProps = { create };

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withSize({ 482: "narrow" })
)(NewGameForm);
