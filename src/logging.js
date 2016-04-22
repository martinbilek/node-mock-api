/*global module:true, require:true */

'use strict';

var fs = require('fs'),
    path = require('path'),
    bunyan = require('bunyan');

exports.createLogger = createLogger;

var logger;

/*
 * configure and start logging
 * @param {Object} config The configuration object for defining dir: log directory, level: loglevel
 * @return the created logger instance
 */
function createLogger() {
    if (logger !== undefined) {
        return logger;
    }
    var config = require('config').logging,
        logLevel = config.level,
        streams = [];

    if (config.enabled && config.toStdout) {
        streams.push({
            stream: process.stdout,
            level: logLevel
        });
    }

    if (config.enabled && config.toFile) {
        var logDir = config.dir,
            logFile = path.join(logDir, config.filename + '-log.json'),
            logErrorFile = path.join(logDir, config.filaname + '-errors.json');

        // Create log directory if it doesnt exist
        if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

        streams.push({
            path: logErrorFile,
            level: logLevel
        });
    }

    // Log to console and log file
    var log = bunyan.createLogger({
        name: config.filename,
        streams: streams,
        serializers: bunyan.stdSerializers
    });

    return log;
}
