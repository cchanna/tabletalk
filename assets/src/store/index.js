import React, { useContext, useState, useEffect, createContext } from "react";
import { node, any } from "prop-types";
import { Provider } from "react-redux";
import * as state from "state";

export const StoreContext = createContext();

const useReduxStore = () => {
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

export const StoreProvider = ({ children, store }) => (
  <StoreContext.Provider value={store}>
    <Provider store={store}>{children}</Provider>
  </StoreContext.Provider>
);
StoreProvider.propTypes = {
  children: node.isRequired,
  store: any.isRequired
};

const useStoreProxy = (whereFrom, whereFor) => {
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
  const getProxy = new Proxy(whereFrom, {
    get: (target, prop) => (...args) => target[prop](state, ...args)
  });

  return [fromProxy, forProxy, getProxy];
};

export const useMonsterhearts = () =>
  useStoreProxy(state.fromMonsterhearts, state.forMonsterhearts);
export const useAuth = () => useStoreProxy(state.fromAuth, state.forAuth);
export const useRouting = () =>
  useStoreProxy(state.fromRouting, state.forRouting);
export const useSocket = () => useStoreProxy(state.fromSocket, state.forSocket);
