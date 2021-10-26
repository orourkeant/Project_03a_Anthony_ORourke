const express = require('express');
const myData = require('./data');
const bodyParser = require("body-parser");
// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const app = express();
const PORT = 3000;
const usrData = myData.users; //Create an array from the 
const schedData = myData.schedules;
const today = new Date();

console.log(typeof usrData);

//Start the server
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT " + PORT + " Time: " + today.getHours() + 
    ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds());
});

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(urlencodedParser);


//Handle / route
app.get('/',function(req,res){
    res.send("Welcome to our schedule website");
});

//Handle /users route
app.route('/users').get(function(req,res)
{
    res.send(usrData);
});

//Handle /schedules route
app.route('/schedules').get(function(req,res)
{
    res.json(schedData);
});

//Handle individual user routes if they exist, send error message if not...
app.get('/users/:userId/', function (req, res){
	// check that the parameter value has a match as an array value in the users
	// section of the JSON file
	const hasValue = usrData.includes(usrData[req.params.userId]);
  	if(hasValue){ // if the match exists, respond with the associated JSON payload
  		res.json(myData.users[req.params.userId]);
  	}else{ // if it doesn't exist then the user doesn't exist, send this message:
  		res.send("No such user!");
  	}
});

//Handle individual user schedules if they exist, otherwise send error message...
app.get('/users/:userId/schedules', function (req, res){	
	let scheduleInfo = schedData.filter(obj => {return req.params.userId == obj.user_id});
	if(scheduleInfo.length === 0){
		res.send("No schedule info for this user!")
	}else{
		res.json(scheduleInfo);
	}
});

//Handle post request on /schedules route, add the body of the post request
//to the array as a schedule
app.post('/schedules', function (req, res) {
	res.send(req.body);
	schedData.push(req.body);	
})

app.post('/users', urlencodedParser, function (req, res){
	let crypto = require('crypto');
	const encryptPassword = crypto.createHash('sha256').update(req.body.password).digest('base64');
	req.body.password = encryptPassword;
	let dupeFlag = false;
	
	for(let i = 0; i < usrData.length; i++){
		if(usrData[i].email === req.body.email){
			dupeFlag = true;
		}
	}
	
	if(dupeFlag){
		res.send("Account with " + req.body.email + " already exists!\n");
	}else{
		usrData.push(req.body);
		res.send(req.body);
	}
});


