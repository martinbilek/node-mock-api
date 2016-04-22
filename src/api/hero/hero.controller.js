'use strict';

var httpErrors = require('server/http.errors');

var _HEROES = [
    {"id": 11, "name": "Mr. Nice"},
    {"id": 12, "name": "Narco"},
    {"id": 13, "name": "Bombasto"},
    {"id": 14, "name": "Celeritas"},
    {"id": 15, "name": "Magneta"},
    {"id": 16, "name": "RubberMan"},
    {"id": 17, "name": "Dynama"},
    {"id": 18, "name": "Dr IQ"},
    {"id": 19, "name": "Magma"},
    {"id": 20, "name": "Tornado"}
];

module.exports.list = function(req, res, next) {
    res.json(_HEROES);
};

module.exports.get = function(req, res, next) {

    var hero_id = req.params.hero;

    for (let hero of _HEROES) {
        if (hero.id == hero_id) {
            return res.json(hero);
        }
    }

    throw new httpErrors.NotFoundError('Hero with id ' + hero_id + ' was not found.');
};

module.exports.save = function(req, res, next) {

    var data = req.body;

    for (var i=0; i<=_HEROES.length; i++) {
        if (_HEROES[i].id == data.id) {
            _HEROES[i].name = data.name;
            return res.json(_HEROES[i]);
        }
    }

    throw new httpErrors.NotFoundError('Hero with id ' + hero_id + ' was not found.');
};
