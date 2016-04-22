'use strict';

var path = require('path'),
    _ = require('lodash');

var ENV = process.env.NODE_ENV;

var pkg = require('../../package');

// All configurations will extend these options
// ============================================
var config = {
    pkg: pkg,

    env: ENV,

    // Root path of server
    root: path.normalize(__dirname + '/..'),

    // Server port
    port: process.env.PORT,
    host: process.env.HOST,
    protocol: process.env.PROTOCOL || 'http',

    getHostUrl: function () {
        return this.protocol + '://' + this.host + (this.port ? ':' + this.port : '');
    },

    clientRootUrl: process.env.CLIENT_ROOT_URL,

    // Slow response - mainly for testing purposes to make requestest longer
    enableSlowResponse: false,
    slowResponseTimeout: 1000,

    // Logging
    logging: {
        enabled: true,
        dir: 'logs',
        level: 'debug',
        filename: pkg.name,
        toStdout: true,
        toFile: false
    },

    // CORS setup
    cors: {
        origin: "*",
        // exposedHeaders: ['auth-token']
    },
};

if ( ! config.env) {
    throw new Error("Invalid configuration - missing NODE_ENV.");
}

config = _.merge(config, require('./env/' + ENV + '.js'));


// Export the config object based on the NODE_ENV
// ==============================================
module.exports = config;


if (! config.port)      throw new Error("Invalid configuration - missing PORT to listen on.");
if (! config.host)      throw new Error("Invalid configuration - missing HOST to listen on.");
