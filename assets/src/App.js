import React, { Component } from 'react';
import { bool, arrayOf, string, func } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import rx from 'resplendence';

import Games from 'Games';
import Play from 'Play';
import Auth from 'Auth';

import { getStatus } from 'Status/actionCreators';
import { login, loginReady, signout } from 'Auth';
import { replace } from 'Routing/actionCreators';
import route from 'Routing/route';

import Spinner from 'common/components/Spinner';
import "./index.scss";

rx`
@import "~common/styles";
@import "~common/colors";
`


const Container = rx('div')`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  user-select: none;
  overflow: hidden;
`

const DownMessage = rx('div')`
  color: white;
  font-family: "League Spartan";
  max-width: 900px;
  font-size: 50px;
  text-shadow: -1px 1px 1px hsla(0, 0%, 0%, .1);
  text-align: center;
`

const SignoutButton = rx('button')`
  @include button;
  font-family: "League Spartan";
  color: fade-out($color-light, 0.6);
  font-size: 16px;
  position: absolute;
  top: 5px;
  right: 5px;
  height: 20px;
  transition-properties: top, right, color, font-size, text-shadow;
  transition-duration: .15s;
  z-index: 1;
  &:hover {
    color: $link-hover;
    text-shadow: -1px 1px 1px rgba(0, 0, 0, .2);
    font-size: 20px;
    top: 2px;
    right: 3px;
  }
`

const FloatAbove = rx('div')`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: none;
  &.show {
    display: block;
  }
`

class App extends Component {
static propTypes = {
    up: bool.isRequired,
    googleJwt: string,
    loginReady: bool.isRequired,
    path: arrayOf(string).isRequired,
    loggedIn: bool.isRequired,
    downMessage: bool.isRequired,
    loggingIn: bool.isRequired,
    ready: bool.isRequired,
    getStatus: func.isRequired,
    login: func.isRequired,
    replace: func.isRequired,
    signout: func.isRequired,
  }

  componentDidMount() {
    const { getStatus } = this.props;
    getStatus();
  }
  componentDidUpdate(prevProps) {
    {
      const { up, googleJwt, login } = this.props;

      const canLogIn = (up && googleJwt);
      const couldLogIn = (prevProps.up && prevProps.googleJwt);
      if (canLogIn && (!couldLogIn || googleJwt !== prevProps.googleJwt)) {
        login();
      }
    }
    {
      const { up, loginReady } = this.props;
      if (!prevProps.up && up) {
        setTimeout(loginReady, 500);
      }
    }
    {
      const { path, loggedIn, replace } = this.props;
      if (loggedIn && path.length === 0) {
        replace(["games"]);
      }
    }
  }

  pages = [
    {
      path: "games",
      component: Games
    },
    {
      path: "play",
      component: Play
    }
  ]

  render() {
    const { up, downMessage, loggedIn, loggingIn, ready, path, signout } = this.props;

    let content
    if (up === false) {
      content = <DownMessage>{downMessage}</DownMessage>;
    }
    else if (!ready) content = <Spinner/>;
    else if (loggedIn) {
      content = route(path, [], this.pages);
    }

    const signoutButton = loggedIn ? <SignoutButton onClick={signout}>signout</SignoutButton> : null;

    return (
      <Container>
        <FloatAbove rx={{show: (ready && !loggedIn && !loggingIn)}}>
          <Auth/>
        </FloatAbove>
        {signoutButton}
        {content}
      </Container>
    );
  }
}

const mapStateToProps = ({auth, path, status}) => {
  return {
    up: status.up,
    downMessage: status.message,
    ready: auth.ready,
    googleJwt: auth.googleJwt,
    loggedIn: !!auth.jwt,
    loggingIn: auth.pending,
    path
  }
}

const mapDispatchToProps = { getStatus, login, loginReady, replace, signout };

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps)
)
export default enhance(App);
