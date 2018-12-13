import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useMemo,
  createContext
} from "react";
import { node, any } from "prop-types";
import { Provider } from "react-redux";
import * as state from "state";
import { fromMonsterhearts } from "../state";
import mapObject from "utils/mapObject";

export const StoreContext = createContext();

export const useReduxStore = () => {
  return useContext(StoreContext);
};

export const useStore = () => {
  const store = useReduxStore();
  const [state, setState] = useState(store.getState());
  useEffect(() => {
    return store.subscribe(() => {
      setState(store.getState());
    });
  });
  return [state, store.dispatch];
};

const Redux = ({ children }) => {
  const store = useReduxStore();
  return <Provider store={store}>{children}</Provider>;
};
Redux.propTypes = {
  children: node.isRequired
};

export const StoreProvider = ({ children, store }) => (
  <StoreContext.Provider value={store}>
    <Redux>{children}</Redux>
  </StoreContext.Provider>
);
StoreProvider.propTypes = {
  children: node.isRequired,
  store: any.isRequired
};

const makeStoreHook = (whereFrom, whereFor) => {
  return () => {
    const [state, dispatch] = useStore();
    const fromProxy = new Proxy(whereFrom, {
      get: (target, prop) => {
        const getter = "get" + prop[0].toUpperCase() + prop.slice(1);
        if (!target[getter]) {
          throw new Error(`Selector ${getter} does not exist.`);
        }
        return target[getter](state);
      }
    });
    const forProxy = new Proxy(whereFor, {
      get: (target, prop) => (...args) => dispatch(target[prop](...args))
    });

    return [fromProxy, forProxy];
  };
};

export const useMonsterhearts = makeStoreHook(
  state.fromMonsterhearts,
  state.forMonsterhearts
);
export const useAuth = makeStoreHook(state.fromAuth, state.forAuth);
export const useRouting = makeStoreHook(state.fromRouting, state.forRouting);
export const useSocket = makeStoreHook(state.fromSocket, state.forSocket);
