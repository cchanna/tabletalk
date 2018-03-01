const getFullPath = state => state.routing;

export const getPath = (state, depth = 0) => {
  const path = getFullPath(state);
  return {
    path: path.slice(depth),
    here: path.slice(0, depth),
    next: path[depth] || null
  };
}