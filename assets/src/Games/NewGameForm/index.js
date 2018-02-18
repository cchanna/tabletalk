import { connect } from 'react-redux';

import NewGameForm from './NewGameForm';

import { create } from 'Games/actionCreators';
import { compose } from 'redux';
import withSize from '../../common/withSize';

const mapStateToProps = () => ({})

const mapDispatchToProps = { create }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSize({482: "narrow"})
)(NewGameForm);