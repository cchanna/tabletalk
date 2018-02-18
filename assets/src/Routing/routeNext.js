import React from 'react';

const route = (depth, next, pages, extraProperties = {}) => {
  let fallBack = null;
  for (let i=0; i < pages.length; i++) {
    const page = pages[i];
    if (page.path === "*") fallBack = page;
    else if (!next && !page.path) {
      const properties = {
        ...extraProperties,
        ...(page.properties || {})  
      }
      const Component = page.component;
      return <Component depth={depth} {...properties}/>
    }
    else if (next === page.path) {
      const properties = {
        ...extraProperties,
        ...(page.properties || {})  
      }
      const Component = page.component;
      return <Component depth={depth + 1} {...properties}/>
    }
  }
  if (fallBack) {
    const Component = fallBack.component;
    const properties = {
      ...extraProperties,
      ...(fallBack.properties || {})  
    }
    return <Component depth={depth + 1} {...properties}/>
  }
  return null;
}

export default route;