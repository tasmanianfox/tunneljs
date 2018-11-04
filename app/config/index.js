const fs = require('fs');
const os = require('os');

let config = null;

const getConfigDir = () => `${os.homedir}/.tunneljs`;
const getConfigPath = () => `${getConfigDir()}/config.json`;

const { Connection, createSampleConnection } = require('../models/Connection');

const initConfig = () => {
  if (!fs.existsSync(getConfigPath())) {
    config = {
      connections: [createSampleConnection()]
    };

    saveConfig();
  }

  const rawdata = fs.readFileSync(getConfigPath());
  config = JSON.parse(rawdata);
  config.connections = config.connections.map(connection =>
    Object.assign(new Connection(), connection)
  );
};

const loadConfig = () => {
  if (config === null) {
    initConfig();
  }

  return config;
};

const saveConfig = () => {
  if (!fs.existsSync(getConfigDir())) {
    fs.mkdirSync(getConfigDir());
  }

  const json = JSON.stringify(config, null, 2);
  fs.writeFileSync(getConfigPath(), json);
};

module.exports = {
  loadConfig
};
