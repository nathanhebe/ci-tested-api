module.exports = function (app, mongoDB) {
    var authenticated = require('./routes/authenticated')();
	app.use('/authenticated', authenticated);

	// var canvases = require('./routes/canvases.js')(mongoDB);
	// app.use('/api/canvases', canvases);

	// var categories = require('./routes/categories.js')(mongoDB);
	// app.use('/api/categories', categories);

};
