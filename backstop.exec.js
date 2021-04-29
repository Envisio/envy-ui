const backstop = require('backstopjs');

const arg = process.argv.slice(2)[0];

backstop(arg, {
  config: require('./backstop.config_new.js')({
    // section,
  })
});
