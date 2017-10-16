let mongoose = require('mongoose');

let schema = mongoose.Schema;

let UserSchema = mongoose.Schema({
	name: {type: String, minLength: 3},
	
}, {timestamps: true})

mongoose.model('User', UserSchema)
