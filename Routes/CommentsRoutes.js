var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('Comments');
var Topics = mongoose.model('Topics');
var jwt = require('express-jwt');
var auth = jwt({
  secret: "just_breathe",
  userProperty: "payload"
})

//REQUIRED FOR GETTING ONE COMMENT-------------------------------------------------------

// router.param('id', function(req, res, next, id) {
//   console.log("are you running 15 commentsroutes")
//   req._id = id;
//   Comment.findOne({_id:id})
//   .exec(function (err, comment) {
//     if(err) return res.status(500).send({err: "Error inside the server."});
//     if(!comment) return res.status(400).send({err: "That comment does not exist"});
//     req.comment = comment;
//     next();
//   });
// });

router.post('/', auth, function(req, res) {
  var comment = new Comment(req.body);
  comment.created = new Date();
  comment.createdBy = req.payload.id;
  comment.save(function(err, result) {
    if (err) return res.status(500).send({err: "There is a problem"});
    if (!result) return res.status(400).send({err: "Could not create comment"});
    Topics.update({ _id: comment.topic}, {$push: {
      comments: {
        _id: result._id
      }
    }}, function(err, comment) {
      if(err) return res.status(500).send({err: "there was an error"});
      if(!comment) return res.status(400).send({err: "this error should never happen"});
      Comment.findOne({ _id : result._id }).populate({
        path: "createdBy",
        model: "User",
        select: "username image"
      })
      .exec(function(err, comment) {
        res.send(comment);
      })
    })
  });
});

router.post('/replies', function(req, res) {
     Comment.update({_id: req.body.commentId}, {$push: {
      replies: {
        body: req.body.message,
        replyCreatedBy: req.body.replyCreatedBy
      }
    }}, function(err, comment) {
      if(err) return res.status(500).send({err: "there was an error"});
      if(!comment) return res.status(400).send({err: "this error should never happen"});
      console.log(comment)
      Comment.findOne({ _id: req.body.commentId}).populate({
        path: "replies.replyCreatedBy",
        model: "User",
        select: "username image"
      })
      .exec(function(err, comment) {
        console.log(comment);
        res.send(comment);
      })
    })
  });

module.exports = router;