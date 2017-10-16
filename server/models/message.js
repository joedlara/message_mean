let mongoose = require('mongoose');

let schema = mongoose.Schema;



let MessageSchema = mongoose.Schema({
	_user: {type: schema.Types.ObjectId, ref: 'User'},
	content: {type: String, minlength: 8},
	comments: [{type: schema.Types.ObjectId, ref: 'Comment'}],
	like: {type: Number, required: true},
}, {timestamps: true})

mongoose.model('Message', MessageSchema);


