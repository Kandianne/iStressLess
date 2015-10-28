var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');

// var RdioStrategy = require('passport-rdio').Strategy;

//----------------REQUIRE MODELS & PASSPORT HERE-------------------------------------------
require("./Models/TopicsModel");
require("./Models/CommentsModel");
require('./Models/UserModel');
require('./config/passport');

//-----------------------CONNECTION TO MONGOOSE--------------------------------------------------------

mongoose.connect(process.env.MONGOLAB_URI, function(err) {
	if(err) return console.log("No connection");
	else{
		console.log("Success thanks Kareem!")
	}
});

//-----------------------------------------------------------------------------------------
app.set('views', path.join(__dirname, 'views'));
//set the view engine that will render HTML from the server to the client
app.engine('.html', require('ejs').renderFile);
//Allow for these directories to be usable on the client side
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
//we want to render html files
app.set('view engine', 'html');
app.set('view options', {
	layout: false
});

//---------------------------RDIO-----------------------------------------------------


//middleware that allows for us to parse JSON and UTF-8 from the body of an HTTP request
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//---------------DEFINING & REQUIRING ROUTES-------------------------
var userRoutes = require('./Routes/UserRoutes');
var topicsRoutes = require('./Routes/TopicsRoutes');
var commentsRoutes = require('./Routes/CommentsRoutes');

//--------------------------------------------------------------------

//on homepage load, render the index page
app.get('/', function(req, res) {
	res.render('index');
});

//-------------WHICH PATHS TO USE------------------------------
app.use('/api/user', userRoutes);
app.use('/api/topics', topicsRoutes);
app.use('/api/comments', commentsRoutes);

//-------------------------------------------------------------
var server = app.listen(port, function() {
	var host = server.address().address;
	console.log('Example app listening at http://localhost:' + port);
});