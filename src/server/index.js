'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    httpErrors = require('server/http.errors'),
    middlewares = require('server/middlewares'),
    cors = require('cors');

/*
 * Set up server
 * @return the created server
 */
module.exports = function build() {
    var routes = require('routes'),
        config = require('config');

    // Create new Restify server
    var server = express()
        .use(bodyParser.json({limit: '10mb'}))
        .use(bodyParser.urlencoded({ extended: true }))
        .use(cors(config.cors)) // adds Allow-Access-Origin headers
        .use(middlewares.slowResponse)
        .use(routes) // MAIN ROUTES
        .use(middlewares.notFoundHandler) // default handler if no other route matches
        .use(middlewares.errorHandler);

    server.httpErrors = httpErrors;
    return server;
};
