var corsOptions = {};
var config = require('nconf')
                .argv()
                .env()
                .file('corsWhitelist', __dirname + '/../config/cors_whitelist.json' );

  
var corsOrigins = config.get('cors_rules');
for (var i = 0; i < corsOrigins.length; i++) {
  var element = corsOrigins[i];
  if(element.indexOf('REGEX') == 0) {
    element = element.substr(5,element.length - 5);
    corsOrigins[i] = new RegExp(element, 'i');
  }
}

corsOptions.origin = corsOrigins;

module.exports = corsOptions;