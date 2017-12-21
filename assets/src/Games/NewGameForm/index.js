import { connect } from 'react-redux';

import NewGameForm from './NewGameForm';

import { create } from 'Games/actionCreators';
import { compose } from '../../../../../../Users/castl/AppData/Local/Microsoft/TypeScript/2.6/node_modules/redux';
import withSize from '../../common/withSize';

const mapStateToProps = ({games}) => ({})

const mapDispatchToProps = { create }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSize({482: "narrow"})
)(NewGameForm);