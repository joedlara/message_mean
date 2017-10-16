let mongoose = require('mongoose');
let schema = mongoose.Schema;


let CommentSchema = mongoose.Schema({
	_user: {type: schema.Types.ObjectId, ref: 'User'},
	content: {type: String, minlength: 8},
}, {timestamps: true})


mongoose.model('Comment', CommentSchema)