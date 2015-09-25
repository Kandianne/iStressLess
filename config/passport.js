var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy; //It's requiring the passport for our local database authentication.
var mongoose = require('mongoose');
var User = mongoose.model('User');
//---------------RDIO REQUIREMENTS---------------------------------------
// var express = require('express')
// var util = require('util')
// var RdioStrategy = require('passport-rdio').Strategy;
// var rdioApiKey = "qwgofnnyabdtrcxecz56fqhtve"
// var rdioSharedSecret = "9_gJSYp70f-AP0quWlDCQw";
//------------------------------------------------------------------------

passport.use(new LocalStrategy(function(username, password, done) { //This password is called from password.authenticate, from user routes.
  User.findOne({username: username}) //find the username in the model from where it's being called. 
  .exec(function(err, user) {  
  	if(err) return done({err: "Server has issues."});
  	if(!user) return done({err: "User does not exist"});
  	if(!user.checkPassword(password)) return done({err: "Invalid username and password combination."});
  	return done(null, user);
  });
}));








