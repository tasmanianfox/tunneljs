const Application = require('./Application');

let application = null;

const init = args => {
  application = new Application(args);
};

const getApplication = () => application;

module.exports = {
  getApplication,
  init
};
