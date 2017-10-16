var mongoose = require('mongoose');
var Message = mongoose.model('Message')
var User = mongoose.model('User')
var Comment = mongoose.model('Comment')

module.exports =  {

	createMessages: function(req,res){
		console.log("in the messages controller's create method")
		var newMessage = new Message(req.body);
		newMessage.like = 0
		newMessage._user = req.session.userId;
		newMessage.save(function(err, savedMessage){
			if(err){
				console.log("something went wrong");
				res.json(err);
			}else{
				console.log("message saved");
				console.log(newMessage);
				res.json(newMessage);
			}
		})
	},
	index: function(req,res){
		console.log("in the messages controller's index method");
		Message.find({}).populate({path:'_user'}).populate({path:'comments', model:'Comment', populate:{path:'_user', model:'User'}})
		.exec(function(err, messages){
			if(err){
				console.log("something went wrong");
				res.json(err);
			}else{
				console.log("gottem");
				// console.log(messages);
				res.json(messages);
			}
		})
	},
	createComment: function(req,res){
		console.log('Entering the comment')
		Message.findOne({_id: req.params.id}).exec(function(err, message){

			if(err){
				console.log("LOL")
				res.json(err);
			}else{
				console.log("found message, creating comment");
				console.log(message);
				var newComment = new Comment(req.body);
				newComment._user = req.session.userId;
				newComment.save(function(err){
					if(err){
						console.log("something went wrong");
						res.json(err);
					}else{
						console.log("created comment");
						// console.log(message)
						
						message.comments.push(newComment._id);
						message.save(function(err){
							if(err){
								console.log("something went wrong saving the message");
								res.json(err);
							}else{
								console.log("message was saved with the new comment.")
								res.json(message);
							}
						})
					}
				})
			}
		})
	},
	getCurrent: function(req,res){
		console.log("in users controller's getCurrent method");
		User.findOne({_id: req.session.userId}).exec(function(err, foundUser){
			if(err){
				console.log('something went wrong');
				res.json(err);
			}else{
				console.log("found current user");
				console.log(foundUser, '********************************************')
				res.json(foundUser);
			}
		})
	},
	createUser: function(req,res){
		console.log("in users controller's create method");
		console.log(req.body, '*************************************************')
		User.findOne(req.body).exec(function(err, foundUser){

			if(foundUser){
				console.log("user in db")
				req.session.userId = foundUser._id;
				res.json(foundUser);
			}else{
				var newUser = new User(req.body);
				newUser.save(function(err,savedUser){
					if(err){
						console.log("something went wrong");
						res.json(err);
					}else{
						console.log("created user");
						req.session.userId = savedUser._id;
						res.json(savedUser);
					}
				})
			}
		})
	},

	deleteMessage: function(req, res){
		Message.findOne({ _id: req.params.id }, function(err, message) {
    		if(err){
				console.log("couldn't find the message to delete");
				res.json(err);
			}else {
				console.log("found the message to delete");
				if(message._user == req.session.userId){
	    			var commentIds = message.comments;
	    			message.remove(function(err){
	    				if (err) {
			         		console.log('delete did not work');
			         		// res.sendStatus(500);
			         		res.json({content:"delete did not work"});
			    		}else{
			        		console.log('you deleted the message, now deleting comments');
			        		Comment.find({ _id: { "$in" : commentIds}}).remove(function(err){
			        			if(err){
			        				console.log("Couldn't delete the comments");
			        				res.json(err);
			        			}else{
			        				console.log("Comments deleted");
			        				res.json({content: "Comments deleted"});
			        			}
			        		})
			        	}

	    			})
				}else{
					console.log("unauthorized");
					res.json({content: "unauthorized"});
				}
    		}
		})
	},


	likeMessage: function(req, res){
		Message.findOne({ _id: req.params.id}, function(err, message){
			if(err){
				console.log("Couldn't like the message to like");
				res.json(err);
			}else{
				message.like += 1;
				message.save(function(err, savedLike) {
					if(err){
						console.log(err);
						res.json(err);
					}else{
						console.log('like button is working');
						res.json({content: "message was liked"})
						
					}
				})



			}
		})
	},

	showMessage: function(req, res){
		Message.findOne({ _id: req.params.id}, function(err, message){
			if(err){
				console.log("something went wrong trying to show message");
				res.json(err);
			}else{
				console.log("You are showing the message");
				res.json({content: "show current message"})
			}
			
		})
	},

	currentMessage: function(req, res){
		console.log("in users controller's currentMessage method");
		console.log(req.body)
		Message.findOne({_id: req.body.show}).populate({path:'_user'}).populate({path:'comments', model:'Comment', populate:{path:'_user', model:'User'}})
		.exec(function(err, foundCurrent){
			if(err){
				console.log('something went wrong');
				res.json(err);
			}else{
				console.log("found current message");
				console.log(foundCurrent, '********************************************')
				res.json(foundCurrent);
			}
		})

	},


}















