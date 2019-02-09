import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reducer, forRouting, forSocket } from "./state";
import { makeMiddleware } from "redux-state-tools";
import { createBrowserHistory } from "history";

const pathToArray = pathname => {
  let path = pathname.split("/");
  if (path[path.length - 1] === "") {
    path = path.slice(0, path.length - 1);
  }
  if (path[0] === "") {
    path = path.slice(1);
  }
  return path;
};

const randomString = (length, chars) => {
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};
const randomUniqueId = () =>
  randomString(36, "abcdefghijklmnopqrstuvwxyz0123456789");

const socketMiddleware = makeMiddleware(
  "socket",
  (actionIn, { dispatch, getState, next }) => {
    const actionOut = {
      ...actionIn,
      playerId: getState().game.state.me
    };
    dispatch(
      forSocket.queueAction({ tempId: randomUniqueId(), data: actionIn })
    );
    return next(actionOut);
  }
);

const slowSocketMiddleware = makeMiddleware(
  "slowsocket",
  (actionIn, { next }) => {
    const tempId = randomUniqueId();
    next(forSocket.queueSlowAction({ tempId, data: actionIn }));
    return tempId;
  }
);

export default () => {
  window.tabletalkHistory = createBrowserHistory();

  const devTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();

  let enhance = applyMiddleware(
    socketMiddleware,
    slowSocketMiddleware,
    thunk.withExtraArgument({ history: window.tabletalkHistory })
  );

  if (devTools) {
    enhance = compose(
      enhance,
      devTools
    );
  }

  const handleHistoryChange = location => {
    store.dispatch(forRouting.route({ path: pathToArray(location.pathname) }));
  };

  const store = createStore(reducer, {}, enhance);

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./state/index", () => {
      store.replaceReducer(reducer);
    });
  }

  handleHistoryChange(window.tabletalkHistory.location);
  window.tabletalkHistory.listen(handleHistoryChange);

  return store;
};
