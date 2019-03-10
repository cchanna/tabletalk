import Route from "./RouteComponent";
import Link from "./Link";
import route from "./route";
import { createSelector } from "reselect";
import { fromRouting } from "state";
import useNavigator from "./use-navigator";
export { getPath } from "./selectors";
export * from "./actionCreators";

const getDepth = (_state, depth) => depth;
export const makeGetPath = () =>
  createSelector(
    [fromRouting.getFullPath, getDepth],
    (path, depth) => path.slice(0, depth)
  );
export const makeGetHere = () =>
  createSelector(
    [fromRouting.getFullPath, getDepth],
    (path, depth) => path.slice(depth)
  );
export const makeGetNext = () =>
  createSelector(
    [fromRouting.getFullPath, getDepth],
    (path, depth) => path[depth] || null
  );

export { Route, route, Link, useNavigator };
