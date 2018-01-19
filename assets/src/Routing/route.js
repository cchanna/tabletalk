import React from 'react';

export default (path, here, pages, extraProperties = {}) => {
  const [where, ...newPath] = path;
  let fallBack = null;
  for (let i=0; i < pages.length; i++) {
    const page = pages[i];
    if (page.path === "*") fallBack = page.component;
    else if (where === page.path) {
      const Component = page.component;
      const newHere = (where === undefined) ? here : [...here, where];
      return <Component here={newHere} path={newPath} {...extraProperties}/>
    }
  }
  if (fallBack) {
    const Component = fallBack;
    const newHere = (where === undefined) ? here : [...here, where];
    return <Component here={newHere} path={newPath} {...extraProperties}/>
  }
  return null;
}

