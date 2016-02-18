var router = require('express').Router();
var authenticateEndpoint = require('./../auth0').authenticateEndpoint;

module.exports = function () {

    router.get('/',authenticateEndpoint, function (req, res) {
        return res.json({ message: 'You are authenticated.' });
    });

    return router;
};