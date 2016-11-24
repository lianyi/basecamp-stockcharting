'use strict';

// Use local.env.js for environment variables that will be set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: 'stockcharts-secret',

  QUANDL_API_KEY: 'BZRnYK-rqbJXeiU3tHbS',
  MONGODB_URI: 'mongodb://heroku_v4tbj859:quh9qth1fu0fmasj54up7bpncf@ds147167.mlab.com:47167/heroku_v4tbj859',
  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
//# sourceMappingURL=local.env.js.map
