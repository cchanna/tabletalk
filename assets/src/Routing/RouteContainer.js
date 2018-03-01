import { connect } from 'react-redux'
import Component from './RouteComponent';

import { fromRouting } from 'state';

const routeForPage = (page, depth, extraProperties, ...rest) => {
  const properties = {
    ...extraProperties,
    ...rest,
    ...(page.properties || {}),
  };
  return {
    ...properties,
    Component: page.component,
    depth: page.path ? depth + 1 : depth,
  }
}

const mapStateToProps = (state, {depth = 0, pages, extraProperties = {}}) => {
  let fallback = null;
  const next = fromRouting.getNext(state, depth);
  for (const page of pages) {
    if (page.path === "*") fallback = page;
    else if ((!next && !page.path) || (next === page.path)) {
      return routeForPage(page, depth, extraProperties);
    }
  }
  if (fallback) {
    return routeForPage(fallback, depth, extraProperties);
  }
  return {
    Component: null,
    depth
  }
};

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Component);