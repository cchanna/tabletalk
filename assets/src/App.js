import React, { Component } from 'react';
import { connect } from 'react-redux';
import rx from 'resplendence';

import Games from 'Games';
import Auth from 'Auth';

import { getStatus } from 'Status/actionCreators';
import { login, loginReady, signout } from 'Auth/actionCreators';
import { replace } from 'Routing/actionCreators';

import Spinner from 'common/components/Spinner';

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
  &:hover {
    color: $link-hover;
    text-shadow: -1px 1px 1px rgba(0, 0, 0, .2);
    font-size: 20px;
    top: 2px;
    right: 3px;
  }
`

class App extends Component {
  componentDidMount() {
    const { getStatus } = this.props;
    getStatus();
  }
  componentDidUpdate(prevProps) {
    {
      const { up, googleLoggedIn, login } = this.props;

      const canLogIn = (up && googleLoggedIn);
      const couldLogIn = (prevProps.up && prevProps.googleLoggedIn);
      if (!couldLogIn && canLogIn) {
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
  render() {
    const { up, loggedIn, ready, path, signout } = this.props;

    const paths = [
      {
        path: "games",
        className: Games
      }
    ]

    let content;
    if (up === false) {
      content = <DownMessage>Sorry, Tabletalk is down for maintenence. Check back later!</DownMessage>;
    }
    else if (!ready) content = <Spinner/>;
    else if (loggedIn) {
      for (let i=0; i < paths.length; i++) {
        const entry = paths[i];
        const [here, ...tail] = path;
        if (here === entry.path) {
          const Node = entry.className;
          content = <Node here={[here]} path={tail}/>
        }
      }
    }

    const signoutButton = loggedIn ? <SignoutButton onClick={signout}>signout</SignoutButton> : null;

    return (
      <Container>
        <Auth/>
        {signoutButton}
        {content}
      </Container>
    );
  }
}

const mapStateToProps = ({auth, path, status}) => {
  return {
    up: status.up,
    ready: auth.ready,
    googleLoggedIn: !!auth.googleJwt,
    loggedIn: !!auth.jwt,
    path
  }
}

const mapDispatchToProps = { getStatus, login, loginReady, replace, signout };

export default connect(mapStateToProps, mapDispatchToProps)(App);
