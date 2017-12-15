import { connect } from 'react-redux';
import { withFormik } from 'formik';

import NewGameForm from './NewGameForm';

import { create } from 'Games/actionCreators';

const mapStateToProps = ({games}) => ({})

const mapDispatchToProps = { create }

export default connect(mapStateToProps, mapDispatchToProps)(NewGameForm);