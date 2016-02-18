var router = require('express').Router();
var authenticateEndpoint = require('./../auth0').authenticateEndpoint;

module.exports = function (connections) {

    router.get('/', function (req, res) {
        
    });

    return router;
};