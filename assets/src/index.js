import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { setGoogleJWT } from 'Auth/actionCreators';
import './fonts/fonts.scss';
import configureStore from './configureStore';



const store = configureStore();

window.onSignIn = (args) => {
  const jwt = args.Zi.id_token;
  store.dispatch(setGoogleJWT({jwt}));
}

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
  ), document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    ReactDOM.render(
      <Provider store={store}>
        <NextApp />
      </Provider>,
      document.getElementById('root')
    )
  })
}

