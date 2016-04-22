'use strict';

var util = require('util');
var CODES = require('http-codes');

var HttpError = function (message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.defaultMessage = this.defaultMessage || "Internal server error.";
    this.message = message || this.defaultMessage;
    this.code = this.code || CODES.INTERNAL_SERVER_ERROR;  // default error code
    this.sentryId = undefined;
}; util.inherits(HttpError, Error);

HttpError.prototype.send = function (res) {
    res
        .status(this.code)
        .send({
            code: this.code,
            message: this.message,
            sentryId: this.sentryId,
        });
};

var NotFoundError = function (message) {
    this.code = CODES.NOT_FOUND;
    this.defaultMessage = "Resource not found.";
    HttpError.apply(this, arguments);
}; util.inherits(NotFoundError, HttpError);

var NotAllowedError = function (message) {
    this.code = CODES.METHOD_NOT_ALLOWED;
    this.defaultMessage = "Method not allowed.";
    HttpError.apply(this, arguments);
}; util.inherits(NotAllowedError, HttpError);

var BadRequestError = function (message) {
    this.code = CODES.BAD_REQUEST;
    this.defaultMessage = "Invalid request.";
    HttpError.apply(this, arguments);
}; util.inherits(BadRequestError, HttpError);

var MissingParameterError = function (message) {
    this.code = CODES.BAD_REQUEST;
    this.defaultMessage = "Missing parameter.";
    HttpError.apply(this, arguments);
}; util.inherits(MissingParameterError, HttpError);

var InvalidParameterError = function (message) {
    this.code = CODES.UNPROCESSABLE_ENTITY;
    this.defaultMessage = "Parameter is invalid.";
    HttpError.apply(this, arguments);
}; util.inherits(InvalidParameterError, HttpError);

var ExistsError = function (message) {
    this.code = CODES.CONFLICT;
    this.defaultMessage = "Already exists.";
    HttpError.apply(this, arguments);
}; util.inherits(ExistsError, HttpError);

var InvalidCredentialsError = function (message) {
    this.code = CODES.UNAUTHORIZED;
    this.defaultMessage = "Invalid credentials.";
    HttpError.apply(this, arguments);
}; util.inherits(InvalidCredentialsError, HttpError);

var AccessForbiddenError = function (message) {
    this.code = CODES.FORBIDDEN;
    this.defaultMessage = "You are not allowed to access this resource.";
    HttpError.apply(this, arguments);
}; util.inherits(AccessForbiddenError, HttpError);

module.exports = {
    HttpError: HttpError,
    NotFoundError: NotFoundError,
    BadRequestError: BadRequestError,
    NotAllowedError: NotAllowedError,
    MissingParameterError: MissingParameterError,
    InvalidParameterError: InvalidParameterError,
    ExistsError: ExistsError,
    InvalidCredentialsError: InvalidCredentialsError,
    AccessForbiddenError: AccessForbiddenError,
};
