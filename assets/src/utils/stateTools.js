import mapObject from './mapObject';
import actionCreator from './actionCreator';

export const prefixedReducer = (prefix, reducer, exceptions) => (state, action) => {
  if (state === undefined) return reducer(state, action);
  if (exceptions && exceptions.includes(action.type)) return reducer(state, action);
  const { type, ...rest } = action;
  if (type.startsWith(prefix)) {
    return reducer(state, {
      ...rest,
      type: type.slice(prefix.length)
    }) 
  } 
  return state;
}

export const prefixTypes = (prefix, types) => {
  const result = {};
  types.forEach(type => {
    result[type] = prefix + type
  });
  return result;
}

export const prefixActions = (prefix, actions) => {
  const convertToActionCreator = (arg) => {
    if (typeof arg === "string") {
      return prefix + arg;
    }
    else {
      const [type, ...args] = arg;
      return [prefix + type, ...args];
    }
  }
  return mapObject(actions, convertToActionCreator);
}

export const actions = (actions, creator = actionCreator) => mapObject(actions, action => {
  if (typeof action === "string") return creator(action);
  else return creator(...action);
});

export const prefixedActions = (prefix, a) => actions(prefixActions(prefix, a));

export const globalizeSelectors = (globalSelector, selectors) => 
  mapObject(selectors, selector => 
    (state, ...args) => selector(globalSelector(state), ...args)
  );

export { actionCreator }; 