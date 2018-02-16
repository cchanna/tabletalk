import React from 'react';

// eslint-disable-next-line react/prop-types
const route = (path, here, pages, extraProperties = {}) => {
  const [where, ...newPath] = path;
  let fallBack = null;
  for (let i=0; i < pages.length; i++) {
    const page = pages[i];
    if (page.path === "*") fallBack = page;
    else if (where === page.path) {
      const properties = {
        ...extraProperties,
        ...(page.properties || {})  
      }
      const Component = page.component;
      const newHere = (where === undefined) ? here : [...here, where];
      return <Component here={newHere} path={newPath} depth={newHere.length} {...properties}/>
    }
  }
  if (fallBack) {
    const Component = fallBack.component;
    const properties = {
      ...extraProperties,
      ...(fallBack.properties || {})  
    }
    const newHere = (where === undefined) ? here : [...here, where];
    return <Component here={newHere} path={newPath} depth={newHere.length} {...properties}/>
  }
  return null;
}

export default route;