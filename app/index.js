import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';
import Connection from './components/home/Connection';

const application = require('electron').remote.require('./backend');
const config = require('./config');

const configuration = config.loadConfig();
const connections = configuration.connections.map(src => {
  const connection = Object.assign(new Connection(), {
    ...src,
    isActive: false
  });

  return connection;
});

const store = configureStore({
  connections
});

application.init({
  reduxStore: store
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
