var JSONWebTokenMiddleware = require('express-jwt');
var Auth0Client = require('auth0').ManagementClient;
var config = require('nconf').argv().env().file('corsWhitelist', __dirname + '/../config/env.json');

var auth = new Auth0Client({
    token: config.get('AUTH0_TOKEN'),
    domain: config.get('AUTH0_DOMAIN')
});

module.exports.authentication = JSONWebTokenMiddleware({
    secret: new Buffer(config.get('AUTH0_CLIENT_SECRET'), 'base64'),
    audience: config.get("AUTH0_CLIENT_ID"),
    credentialsRequired: false
});

module.exports.currentUser = function (req, res, next) {
    if (req.user) {
        var id = req.user.sub;

        auth.users.get({ id: id }, function (err, user) {
            if (err) {
                console.error(err);
            }
            else {
                req.currentUser = user;
                req.currentUser.id = user.user_id;
            }

            return next();
        });
    }
    else {
        return next();
    }
};

module.exports.authenticateEndpoint = function (req, res, next) {
    if (!req.currentUser) {
        return res.json(401, {
            message: 'You must be signed in to continue.'
        });
    }
};

