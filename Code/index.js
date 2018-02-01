//Start server by typing node index.js in the cmd prompt
//Open browser and navigate to localhost:3000 to launch site

//Import the express module
var express = require('express');
var router = express.Router();

var app = express();
//Imports File System module which comes pre-installed with Express
var fs = require('fs');

//Block header from containing info about the server
app.disable('x-powered-by');

//Imports and sets up Handlebars module, named for its use of curly brackets {{}}
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//Imports bodyParser
var bodyParser = require('body-parser');
app.use(bodyParser.json());

//Sets port to 3000
app.set('port', process.env.PORT || 3000);

//Shortens file paths when calling on directories
//EX: can now just do /img/xxx or /css/ccc and take directly from public folder
app.use(express.static(__dirname + '/public'));

/* Conventional Design
• POST /user/add?username=weicai
• GET /user/remove?username=weicai
• POST /user/update?username=weicai
• GET /user/get?username=weicai

RESTful Design
• POST /user/weicai
• DELETE /user/weicai
• PUT /user/weicai
• GET /user/weicai */

//Adds a number to each page accessed console log
var consoleNum = 0;
//Add Console Log Msgs for each page accessed
app.use(function (req, res, next) {
	consoleNum += 1;
	console.log(consoleNum + "- Looking for URL : " + req.url);
	next();
});

//ROOT, renders home.handlebars
app.get('/', function(req, res){
	res.render('home');
});

//Load and Parse the JSON 'Databases' and assign them to a variable
var usersJSON = fs.readFileSync('./users.json','utf8');
usersJSON = JSON.parse(usersJSON);
var randomJSON = fs.readFileSync('./randomData.json','utf8');
randomJSON = JSON.parse(randomJSON);

//Users page should display a JSON database
app.get('/users', function(req, res){
	console.log ("You accessed a(n) " + typeof usersJSON + " type");
	res.send(usersJSON);
});

app.get('/users/control', function(req, res){
	res.render('control');
});

//#1 - GET aka get
app.get('/users', function(req, res){
	console.log ("GET: You accessed a(n) " + typeof usersJSON + " type");
	res.send(usersJSON);
});

//#1 - POST aka create
app.post('/users', function(req, res){
	console.log ("POST: You accessed a(n) " + typeof usersJSON + " type");
	res.send(usersJSON);
});

//#1 - PUT aka update
app.put('/users', function(req, res){
	console.log ("PUT: You accessed a(n) " + typeof usersJSON + " type");
	res.send(usersJSON);
});

//#1 - DELETE aka remove/delete
app.delete('/users/:id', function(req, res){
	console.log ("DELETE: You accessed a(n) " + typeof usersJSON + " type");
	res.send(usersJSON);
});

/*
// Update json using the form from /users/control
app.post('/users/submit', function(req, res){
	var newid = req.param.id;
	newid2 = JSON.stringify(newid);
	var newFname = req.params.fname;
	newFname2 = JSON.stringify(newFname);
	var newLname = req.body.lname;
	newLname2 = JSON.stringify(newLname);
	newData = JSON.stringify(newData);
	
	fs.appendFile('./users.json', newData, function (err) {
		if (err) throw err;
		console.log('Updated!');
		res.send("Your user with id of " + id + " has been added!");
	  });
	  
	console.log("post received: %s %s" + newid2 + newFname2 + newLname2);
});*/

app.get('/users/:id', function(req, res){
	var reqData = req.params;
	res.send("The ID you entered is " + reqData.id + "!");
});

//RANDOM DATA for REALTIME DATA
app.get('/realtime/show', function(req, res){
	console.log ("You accessed a(n) " + typeof randomJSON + " type");
	res.send(randomJSON);
});

//Function to let app know which port to listen to
app.listen(app.get('port'), function(){
	console.log("0- Express started on http://localhost:" + app.get('port') + " press Ctrl-C to terminate");
});