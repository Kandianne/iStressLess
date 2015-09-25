var mongoose = require("mongoose");

var CommentsSchema = new mongoose.Schema({
	created: Date,
	body: String,
	topic: {type: mongoose.Schema.Types.ObjectId, ref:"Topics"},
	createdBy : {type: mongoose.Schema.Types.ObjectId, ref: "User"},
	replies : [{
		created: Date, 
		body: String, 
		replyCreatedBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"} 
	}]
});

mongoose.model("Comments", CommentsSchema);