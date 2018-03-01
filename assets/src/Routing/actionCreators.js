import { fromRouting } from 'state';

const getFullPath = (path, depth, state) => {
  if (depth === 0) return path;
  const { here } = fromRouting.getPath(state, depth);
  return [...here, ...path];
}

export const goTo = (path, depth = 0) => (_dispatch, getState, {history}) => {
  const fullPath = getFullPath(path, depth, getState()) 
  history.push("/" + fullPath.join("/"));
}
export const goBack = () => (_dispatch, _getState, {history}) => {
  history.goBack();
}
export const replace = (path, depth = 0) => (_dispatch, getState, {history}) => {
  const fullPath = getFullPath(path, depth, getState()) 
  history.replace("/" + fullPath.join("/"));
} 
