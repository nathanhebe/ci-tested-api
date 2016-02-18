var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require('nconf').argv().env().file({ file:  __dirname + '/config/env.json' });
var JSONWebTokenMiddleware = require('express-jwt');
var Auth0Client = require('auth0').ManagementClient;
var nconf = require('nconf');

// ====================================================================
// Load Configs
// ====================================================================
nconf.argv()
   .env()
   .file({ file: 'configs/app_config.json' });

// ====================================================================
// Body Parser
// ====================================================================
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json({
  type: function(req){
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
app.get('/*',function(req,res,next){
    res.header(nconf.get('app:name') , nconf.get('app:version'));
    next();
});





app.get('/', function(req, res){
  res.send('Hello World');
});

var server = app.listen(3000, function(){
  console.log('Magic is happening on port 3000');
});

module.exports.closeServer = function(){
  server.close();
};