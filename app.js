var express = require('express');
var path = require('path');
var app = express();
var pizzapi = require('pizzapi');
var nodemailer = require('nodemailer');

app.use(express.static('public'));

app.get('/', function(req, res) {
	var view_path = path.join(__dirname, 'views/home.html');
	res.sendFile(view_path);
});

app.post('/order', function(req, res) {
	var transporter = nodemailer.createTransport('smtps://EXTREMEDEWD%40gmail.com:dothedew@smtp.gmail.com');

	// setup e-mail data with unicode symbols
	var mailOptions = {
		from: '"MR DEW" <EXTREMEDEWD@gmail.com>', // sender address
		to: 'jpk1215@gmail.com', // list of receivers
		subject: "DUDE YOU'RE GETTING A DEW", // Subject line
		text: "AN ICE COLD DEW IS BEING BREWED FOR YOU RIGHT NOW. SIT BACK, RELAX, AND AWAIT THAT ICEY COLD RIVER OF LIQUID GOLD THAT IS THE DEW. CONGRATULATIONS, YOU\'VE EARNED IT." , // plaintext body
		html: '<b>AN ICE COLD DEW IS BEING BREWED FOR YOU RIGHT NOW. SIT BACK, RELAX, AND AWAIT THAT ICEY COLD RIVER OF LIQUID GOLD THAT IS THE DEW. CONGRATULATIONS, YOU\'VE EARNED IT.</b>' // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			return console.log(error);
		}
		console.log('Message sent: ' + info.response);
		res.send(200)
	});

});

app.listen(3000, function() {});


