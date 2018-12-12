import React from "react";
import {
  string,
  number,
  func,
  shape,
  object,
  arrayOf,
  oneOfType,
  instanceOf
} from "prop-types";
import { useRouting } from "store";

const RouteForPage = ({ page, depth, ...rest }) => {
  if (!page) return null;
  const Component = page.component;
  return <Component depth={depth} {...rest} {...page.properties || {}} />;
};
const pageShape = shape({
  component: oneOfType([func, instanceOf(React.Component)]).isRequired,
  path: string.isRequired,
  properties: object
});
RouteForPage.propTypes = {
  page: pageShape,
  depth: number.isRequired,
  extraProperties: object
};

const Route = ({ depth = 0, pages, extraProperties = {} }) => {
  let fallback = null;
  const [{ path }] = useRouting();
  const next = path[depth];
  for (const page of pages) {
    if (page.path === "*") fallback = page;
    else if ((!next && !page.path) || next === page.path) {
      return (
        <RouteForPage page={page} depth={depth + 1} {...extraProperties} />
      );
    }
  }
  if (fallback) {
    return <RouteForPage page={fallback} depth={depth} {...extraProperties} />;
  }
  return null;
};
Route.propTypes = {
  depth: number,
  pages: arrayOf(pageShape).isRequired,
  extraProperties: object
};

export default Route;
