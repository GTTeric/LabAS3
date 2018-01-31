//Start server by typing node index.js in the cmd prompt
//Open browser and navigate to localhost:3000 to launch site



//Import the express module
var express = require('express');
var app = express();

//Block header from containing info about the server
app.disable('x-powered-by');

//Imports and sets up handlebars module
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//Imports File System module
var fs = require('file-system');

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

//Adds a number to each page accessed
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

//Users page should display a JSON database
app.get('/users', function(req, res){
	var text = fs.readFileSync('./users.json','utf8');
	text = JSON.parse(text);
	console.log ("You accessed a(n) " + typeof text + " type");
	res.send(text);
});

app.get('/users/control', function(req, res){
	res.render('control');
});

app.get('/users/:id', function(req, res){
	var reqData = req.params;
	res.send("The ID you entered is " + reqData.id + "!");
});

//RANDOM DATA for REALTIME DATA
app.get('/realtime/show', function(req, res){
	var text = fs.readFileSync('./randomData.json','utf8');
	text = JSON.parse(text);
	console.log ("You accessed a(n) " + typeof text + " type");
	res.send(text);
});

//Function to let app know which port to listen to
app.listen(app.get('port'), function(){
	console.log("Express started on http://localhost:" + app.get('port') + " press Ctrl-C to terminate");
});