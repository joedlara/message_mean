var controller = require('./../controllers/controller');
var path = require('path');
var app = require('express')

function authenticate(req, res, next){
	if(req.session.userId){
		next();
	}else{
		res.sendStatus(401);
	}
}

module.exports = function(app){

	app.post('/api/users', controller.createUser)

	app.get('/wall', function(req,res, next){
		res.sendFile(path.resolve('./public/dist/index.html'))
	})
	app.get('/login', function(req,res, next){
		res.sendFile(path.resolve('./public/dist/index.html'))
	})

	app.use(authenticate);
	app.post('/api/currentMessage', controller.currentMessage)
	app.get('/api/show/:id', controller.showMessage)
	app.get('/api/like/:id', controller.likeMessage)
	app.get('/api/delete/:id', controller.deleteMessage)
	app.get('/api/current_user', controller.getCurrent)
	
	app.get('/api/messages', controller.index)

	app.post('/api/messages', controller.createMessages)
	app.post('/api/comments/:id', controller.createComment)

}







