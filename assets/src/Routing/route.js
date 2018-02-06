import React from 'react';

export default (path, here, pages, extraProperties = {}) => {
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
      return <Component here={newHere} path={newPath} {...properties}/>
    }
  }
  if (fallBack) {
    const Component = fallBack.component;
    const properties = {
      ...extraProperties,
      ...(fallBack.properties || {})  
    }
    const newHere = (where === undefined) ? here : [...here, where];
    return <Component here={newHere} path={newPath} {...properties}/>
  }
  return null;
}

