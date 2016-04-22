'use strict';

var heroes = require('./hero.controller');

var router = new require('express').Router()
    .get('/', heroes.list)
    .get('/:hero', heroes.get)
    .post('/:hero', heroes.save);

module.exports = router;
