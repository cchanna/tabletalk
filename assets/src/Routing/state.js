import { makeActions, globalizeSelectors } from 'utils/stateTools';

const ROUTE = "ROUTE";

export const name = "path";

const getPath = (state, depth = 0) => {
  return {
    path: state.slice(depth),
    here: state.slice(0, depth),
    next: state[depth] || null
  };
};

export const fromRouting = globalizeSelectors(state => state.path, {
  getPath
});

export const forRouting = makeActions({
  route: [ROUTE, "path"]
})

export const reducer = (state = [], action) => {
  switch(action.type) {
    case ROUTE: 
      return action.path;
    default:
      return state;
  }
};