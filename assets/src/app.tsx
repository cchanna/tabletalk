import React, { useEffect, useState } from "react";

import rx from "resplendence";

import Games from "Games";
import Play from "Play";
import Auth from "Auth";

import Spinner from "common/components/Spinner";
import "./index.scss";

import { Route, useNavigator } from "Routing";
import { useAuth } from "store";
import { useApi } from "common/use-api";
import cx from "classnames";

rx`
@import "~common/styles";
@import "~common/colors";
`;

const CONTAINER = rx()`
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
  transition-property: top, right, color, font-size, text-shadow;
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

const FLOAT_ABOVE = rx()`
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

type GoogleSignIn = { Zi: { id_token: string } };

declare global {
  interface Window {
    onSignIn: (arg: GoogleSignIn) => void;
    gapi: {
      auth2: {
        getAuthInstance: () => {
          signOut: () => void;
        };
      };
    };
  }
}

let googleJwt = "";

const onSignIn = (arg: GoogleSignIn) => {
  googleJwt = arg.Zi.id_token;
};
window.onSignIn = onSignIn;

const useGoogleJwt = () => {
  const [jwt, setJwt] = useState<string>("");
  useEffect(() => {
    if (googleJwt) {
      setJwt(googleJwt);
      googleJwt = "";
    } else {
      window.onSignIn = (args: GoogleSignIn) => {
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
  useApi(isStatusUnknown ? "/status" : null, () => setStatus(STATUS_UP), {
    endpoint: "root",
    ignoreAuth: true
  });

  return status;
};

const useLoginReady = isUp => {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    let timeout;
    if (isUp) {
      timeout = setTimeout(() => setIsReady(true), 500);
    }
    return () => clearTimeout(timeout);
  }, [isUp]);
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
  const [{ jwt }, { setJWT }] = useAuth();

  useApi(
    isUp && googleJwt && !jwt
      ? `/auth/login?provider=google&jwt=${googleJwt}`
      : null,
    setJWT,
    {
      endpoint: "root",
      ignoreAuth: true
    }
  );

  return [!!jwt, !!isUp && !!googleJwt && !jwt];
};

const App = () => {
  const { next, replace } = useNavigator();
  const [_getAuth, { logout }] = useAuth();

  const status = useStatus();
  const isUp = status === STATUS_UP;
  const isReady = useLoginReady(isUp);
  const googleJwt = useGoogleJwt();
  const [isLoggedIn, isLoggingIn] = useLogin(googleJwt, isUp);

  const signout = () => {
    logout();
    if (googleJwt && window.gapi) {
      window.gapi.auth2.getAuthInstance().signOut();
    }
  };

  useEffect(() => {
    if (isLoggedIn && !next) replace("games");
  }, [isLoggedIn, next]);

  return (
    <div className={CONTAINER}>
      <div
        className={cx(FLOAT_ABOVE, {
          show: isReady && !isLoggedIn && !isLoggingIn
        })}
      >
        <Auth isLoggingIn={isLoggingIn} isFailed={false} />
      </div>
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
    </div>
  );
};

export default App;
