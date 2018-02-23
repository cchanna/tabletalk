import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import { createBrowserHistory } from 'history';

import { setPath } from 'Routing';

const pathToArray = pathname => {
  let path = pathname.split('/');
  if (path[path.length - 1] === '') {
    path = path.slice(0, path.length - 1);
  }
  if (path[0] === '') {
    path = path.slice(1);
  }
  return path;
}


export default  () => {
  const history = createBrowserHistory();

  const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

  let enhance = applyMiddleware(thunk.withExtraArgument({history}));

  if (devTools) {
    enhance = compose(enhance, devTools);
  }

  const handleHistoryChange = (location) => {
    store.dispatch(setPath({path: pathToArray(location.pathname)}));
  }
  
  const store = createStore(
    reducer, 
    {}, 
    enhance
  );

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept('./reducer', () => {
      store.replaceReducer(reducer);
    })
  }
  
  handleHistoryChange(history.location);
  history.listen(handleHistoryChange);

  return store;
}