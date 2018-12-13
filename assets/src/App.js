import React, { useEffect, useState } from "react";

import rx from "resplendence";

import Games from "Games";
import Play from "Play";
import Auth from "Auth";

import Spinner from "common/components/Spinner";
import "./index.scss";

import { Route, useNavigator } from "Routing";
import { useAuth } from "store";
import { useApiEffect } from "common/useApi";
import { hot } from "react-hot-loader";

rx`
@import "~common/styles";
@import "~common/colors";
`;

const Container = rx("div")`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  user-select: none;
  overflow: hidden;
`;

const DownMessage = rx("div")`
  color: white;
  font-family: "League Spartan";
  max-width: 900px;
  font-size: 50px;
  text-shadow: -1px 1px 1px hsla(0, 0%, 0%, .1);
  text-align: center;
`;

const SignoutButton = rx("button")`
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
`;

const FloatAbove = rx("div")`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: none;
  &.show {
    display: block;
  }
`;

const onSignIn = args => (window.googleJwt = args.Zi.id_token);
window.onSignIn = onSignIn;

const useGoogleJwt = () => {
  const [jwt, setJwt] = useState(null);
  useEffect(() => {
    if (window.googleJwt) {
      setJwt(window.googleJwt);
      window.googleJwt = null;
    } else {
      window.onSignIn = args => {
        setJwt(args.Zi.id_token);
      };
    }
    return () => {
      window.onSignIn = onSignIn;
    };
  });

  return jwt;
};

const STATUS_ERROR_DEFAULT = "Tabletalk is down right now. Sorry!";
const STATUS_UP = "up";

const useStatus = () => {
  const [status, setStatusBase] = useState(null);
  const [{ isStatusUnknown }, { setStatusUnknown }] = useAuth();
  const setStatus = status => {
    setStatusUnknown({ value: false });
    setStatusBase(status);
  };

  useApiEffect(
    "status",
    () => setStatus(STATUS_UP),
    error => {
      if (error.response && error.response.status === 503) {
        error.response
          .json()
          .then(({ reason }) => setStatus(reason))
          .catch(() => setStatus(STATUS_ERROR_DEFAULT));
      } else {
        setStatus(STATUS_ERROR_DEFAULT);
      }
    },
    { baseUrl: "", onlyWhen: isStatusUnknown }
  );

  return status;
};

const useLoginReady = isUp => {
  const [isReady, setIsReady] = useState(false);
  useEffect(
    () => {
      let timeout;
      if (isUp) {
        timeout = setTimeout(() => setIsReady(true), 500);
      }
      return () => clearTimeout(timeout);
    },
    [isUp]
  );
  return isReady;
};

const pages = [
  {
    path: "games",
    component: Games
  },
  {
    path: "play",
    component: Play
  }
];

const useLogin = (googleJwt, isUp) => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [{ isLoggedIn }, { setJWT }] = useAuth();

  useApiEffect(
    `login?provider=google&jwt=${googleJwt}`,
    ({ jwt }) => {
      setJWT({ jwt });
      setPending(false);
    },
    error => {
      setError(error);
      setPending(false);
    },
    {
      baseUrl: "auth",
      onlyWhen: isUp && googleJwt && !isLoggedIn,
      onStart: () => {
        setPending(true);
      }
    }
  );

  return [isLoggedIn, pending, !!error];
};

const App = () => {
  const { next, replace } = useNavigator();
  const [_getAuth, { logout }] = useAuth();

  const status = useStatus();
  const isUp = status === STATUS_UP;
  const isReady = useLoginReady(isUp);
  const googleJwt = useGoogleJwt();
  const [isLoggedIn, isLoggingIn, failedLoggingIn] = useLogin(googleJwt, isUp);

  const signout = () => {
    logout();
    if (googleJwt && window.gapi) {
      window.gapi.auth2.getAuthInstance().signOut();
    }
  };

  // console.log(
  //   status,
  //   isUp,
  //   isReady,
  //   googleJwt,
  //   isLoggedIn,
  //   isLoggingIn,
  //   failedLoggingIn
  // );

  useEffect(
    () => {
      if (isLoggedIn && !next) replace("games");
    },
    [isLoggedIn, next]
  );

  return (
    <Container>
      <FloatAbove rx={{ show: isReady && !isLoggedIn && !isLoggingIn }}>
        <Auth isLoggingIn={isLoggingIn} isFailed={failedLoggingIn} />
      </FloatAbove>
      {isLoggedIn ? (
        <SignoutButton onClick={signout}>signout</SignoutButton>
      ) : null}
      {!isUp ? (
        <DownMessage>{status}</DownMessage>
      ) : !isReady ? (
        <Spinner />
      ) : isLoggedIn ? (
        <Route pages={pages} />
      ) : null}
    </Container>
  );
};

export default hot(module)(App);
