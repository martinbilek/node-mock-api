'use strict';

var config = require('../config'),
    logger = require('../logging').createLogger(),
    httpErrors = require('./http.errors');

function notFoundHandler(req, res, next) {
    throw new httpErrors.NotFoundError('The requested resource "' + req.url + '" was not found.');
}

function errorHandler(err, req, res, next) {
    var _send = function (err) {
        // Send the error to the client.
        err.send(res);
        next();
    };

    try {
        if (! (err instanceof httpErrors.HttpError)) {
            err = new httpErrors.HttpError(err);
        }

        // Log to logging facility.
        if (err instanceof httpErrors.NotFoundError) {
            logger.debug({req: req}, err);
            _send(err);
        } else {
            logger.error({req: req}, err);
            _send(err);
        }
    } catch (newError) {
        // Something happened when trying to log the actual error.
        logger.error("Error serving http error. The original error was: " + err + "\n\n" + err.toString());
        res.send({
            code: '500',
            message: newError.toString()
        });
        next();
    }
}

function slowResponse(req, res, next) {
    if (config.enableSlowResponse) {
        setTimeout(next, config.slowResponseTimeout);
    } else {
        next();
    }
}

module.exports = {
    notFoundHandler: notFoundHandler,
    errorHandler: errorHandler,
    slowResponse: slowResponse,
};
