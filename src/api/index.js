'use strict';

var Router = require('express').Router;

function MainHandler(req, res, next) {
    res.send({
        'name': APP.config.pkg.name,
        'version': APP.config.pkg.version
    });
}

var router = new Router();
router.get('/', MainHandler);

// robots.txt should be banned.
router.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});

router.use('/heroes', require('api/hero'));

module.exports = router;
