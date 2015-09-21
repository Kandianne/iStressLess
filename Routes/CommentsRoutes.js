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

router.post('/', auth, function(req, res) {
  console.log(req.body + "commentsroutes 13");
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
    }}, function(err, movie) {
      if(err) return res.status(500).send({err: "there was an error"});
      if(!movie) return res.status(400).send({err: "this error should never happen"});
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

module.exports = router;