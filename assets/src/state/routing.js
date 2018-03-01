const ROUTE = "ROUTE";

export const actions = {
  route: [ROUTE, "path"]
};

export const reducer = (state = [], action) => {
  switch(action.type) {
    case ROUTE: 
      return action.path;
    default:
      return state;
  }
};

const getPath = (state, depth = 0) => state.slice(depth);
const getHere = (state, depth = 0) => state.slice(0, depth);
const getNext = (state, depth = 0) => state[depth] || null;

export const selectors = {
  getPath,
  getHere,
  getNext
};