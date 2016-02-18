var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require('nconf').argv().env().file({ file: __dirname + '/config/env.json' });

// ====================================================================
// Body Parser
// ====================================================================
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json({
    type: function (req) {
        return true;
    }
}));

// ====================================================================
// CORS
// ====================================================================
var corsOptions = require('./app/cors');
app.use(cors(corsOptions));

// ====================================================================
// APP Version Header
// ====================================================================
app.get('/*', function (req, res, next) {
    res.header(config.get('app:name'), config.get('app:version'));
    next();
});

// ====================================================================
// Authentication
// ====================================================================
var auth0Middleware = require('./app/auth0');
app.use(auth0Middleware.authentication);
app.use(auth0Middleware.currentUser);

// ====================================================================
// Routes
// ====================================================================
require('./app/routes.js')(app);


app.get('/', function (req, res) {
    res.send('Hello World');
});

// =============================================================================
// Go!
// =============================================================================
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
    console.log('Magic is happening on port ' + port);
});
module.exports.closeServer = function () {
    server.close();
};