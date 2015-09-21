var mongoose = require('mongoose');

var TopicsSchema = new mongoose.Schema({
	title: {type: String, lowercase: true, unique: true},
	message: {type: String, lowercase: true, unique: true},
	created: Date,
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments"}],
	favoritedBy: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
	postedBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
});


mongoose.model('Topics', TopicsSchema);
