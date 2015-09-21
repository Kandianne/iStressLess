var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Topics = mongoose.model('Topics');
var jwt = require("express-jwt");
var auth = jwt({
	secret: "just_breathe",
	userProperty: "payload"
})
//REQUIRED FOR GETTING ONE TOPIC & POPULATING COMMENTS-------------------------------------------------------

router.param('id', function(req, res, next, id) {
	req._id = id;
	next();
});

router.param('topicId', function(req, res, next, id) {
	req._id = id;
	Topics.findOne({_id:id})
	.populate({ path: "comments"})
	.exec(function(err, comments) {
		Topics.populate(comments, {
			path: 'comments.createdBy', 
			model: 'User',
			select: "username image"
		}, function (err, topic) {
			if(err) return res.status(500).send({err: "Error inside the server."});
			if(!topic) return res.status(400).send({err: "That topic does not exist"});
			req.Topic = topic;
			next();
		});

	});
});


//--------------------GETTING USER ID TO PUSH INTO TOPIC POSTEDBY PROPERTY--------------------------------------------

router.param('user', function(req, res, next, user) {
	req._id = user;
	next();
});

//--------------------------------CREATING NEW TOPIC with POSTED BY USER ID--------------------------------------------------

router.post('/:user', function(req, res) {
	req.body.postedBy = req._id;
	var newTopic = new Topics(req.body);
	newTopic.created = new Date();
	newTopic.save(function(err, result) {
		if(err) return res.status(500).send({err: "The server is having issues."});
		if(!result) return res.status(400).send({err: "Sorry! Could not create that topic."});
		res.send();
	});
});

//--------------------------------GETTING TOPICS----------------------------------------------

router.get('/', function(req, res) {
	Topics.find({})
	.populate({
		path: "postedBy",
		model: "User",
		select: "username"
	})
	.exec(function(err, topics) {
		if(err) return res.status(500).send({err: "error getting all topics"});
		if(!topics) return res.status(400).send({err: "topics do not exist"});
		res.send(topics);
	});
});

router.get('/:topicId', function(req, res) {
	res.send(req.Topic);

});

router.put('/:id', function(req, res) {
	console.log(req.body + "   topicroutes 79")
	Topics.update({_id:req._id}, req.body)
	.exec(function(err, topics){
		if(err) return res.status(500).send({err: "error getting topic to edit"});
		if(!topics) return res.status(400).send({err: "Topic to edit aren't existing"});
		res.send(topics);
	});
})

router.delete('/:topicId', function(req, res) {
	Topics.remove({_id:req._id})
	.exec(function(err, topics){
		if(err) return res.status(500).send({err: "error getting topic to delete"});
		if(!topics) return res.status(400).send({err: "topics aren't existing"});
		res.send(topics);
	});
});

//-------------------POSTING FOR LIKES---------------------------------------------------
router.post("/likes", function(req, res) {
	topic.update({_id: req.body._id}, {$push: {
		likedBy: {username: req.body.user}
	}}, function(err, result){
		if(err) return res.status(500).send({err: "error getting topic to delete"});
		if(!result) return res.status(400).send({err: "topics aren't existing"});
		res.send();
	});
});

//------------------------------------------------------------------------------------

module.exports = router;
