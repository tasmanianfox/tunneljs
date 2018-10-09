import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';

const config = require('./config');

const configuration = config.loadConfig();
const connections = configuration.connections.map(src => {
  const connection = { 
    ...src,
    isActive: false
  };
  connection.gate.port = connection.gate.port === null ? 22 : connection.gate.port;

  return connection;
});

const store = configureStore({
  connections
});

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}