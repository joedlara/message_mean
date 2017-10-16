let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();
let session = require('express-session');
let path = require('path');

let sessionConfig = {
	secret:'SecretKey', // Secret name for decoding secret and such
	resave:false, // Don't resave session if no changes were made
	saveUninitialized: true, // Don't save session if there was nothing initialized
	name:'myCookie', // Sets a custom cookie name
	cookie: {
		secure: false, // This need to be true, but only on HTTPS
		httpOnly: false, // Forces cookies to only be used over http
		maxAge: 3600000
	}
}

app.use(session(sessionConfig));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));

app.use(express.static(path.join(__dirname, 'public', 'dist')));

require('./server/config/mongoose');
require('./server/config/routes')(app);

app.all("*", (req,res,next) => {
    res.sendfile(path.resolve("./public/dist/index.html"));
});

app.listen(8000, () => console.log('Server is listening on port 8000'))