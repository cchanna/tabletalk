import mapObject from 'utils/mapObject';

export const pagedReducer = reducers => (state, action) => {
  if (!state) return {
    type: null,
    state: null
  };
  let reducer = reducers[action.type];
  if (reducer) {
    return {
      type: action.type,
      state: [{type: "@@init"}, action].reduce(reducer, undefined)
    } 
  }
  if (state.type) {
    reducer = reducers[state.type]
    return {
      type: state.type,
      state: reducer(state.state, action)
    };
  }
  return state;
}

export const pagedSelectors = (prefix, type, selectors) => mapObject(
  selectors,
  selector => (state, ...args) => {
    if (state[prefix].type !== type) return null;
    return selector(state[prefix].state, ...args);
  }
)