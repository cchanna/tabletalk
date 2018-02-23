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

export const prefixedActions = (prefix, actions) => {
  const convertToActionCreator = ([type, ...args]) => actionCreator(prefix + type, ...args);
  return mapObject(actions, convertToActionCreator);
}

export const makeActions = (actions) => mapObject(actions, action => actionCreator(...action));

export const globalizeSelectors = (globalSelector, selectors) => 
  mapObject(selectors, selector => 
    (state, ...args) => selector(globalSelector(state), ...args)
  );

export { actionCreator }; 