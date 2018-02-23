import { connect } from 'react-redux';
import { compose } from 'redux';
import withSize from 'common/withSize';
import Auth from './Auth';

import { fromAuth } from './state';

export { reducer, name } from './state'; 
export { login, signout, setGoogleJWT, loginReady } from './actionCreators';
export { fromAuth };

const mapStateToProps = (state) => {
  return {
    isLoggingIn: fromAuth.getIsLoggingIn(state),
    isFailed: fromAuth.getIsFailed(state)
  }
}

export default compose(
  connect(mapStateToProps),
  withSize({525: "narrow", 768: "small"})
)(Auth);