'use strict';

var _ = Promise = require('bluebird'),
    server = require('./server'),
    logging = require('./logging.js'),
    config = require('./config');

var app = {
    config: config,
    logger: logging.createLogger(),
    server: server(),
};

module.exports = app;
global.APP = app;

function boot() {
    var promises = [];

    app.logger.info('Booting in "%s" env .', config.env);
    app.logger.info('Starting ' + config.pkg.name + ', version ' + config.pkg.version + ' ...');

    return Promise.all(promises);
}

// then run the server
function listen() {
    return app.server.listen(config.port, config.host, function() {
        app.logger.info('Listening at %s:%s ...', config.host, config.port);
    });
}

if (require.main === module) {
    boot().then(listen);
} else {
    boot();
}
