var express = require('express');
var path = require('path');
var app = express();
var pizzapi = require('pizzapi');
var nodemailer = require('nodemailer');
var NodeGeocoder = require('node-geocoder');

var geocoder = NodeGeocoder({provider:'google'});

app.use(express.static('public'));

app.get('/', function(req, res) {
	var view_path = path.join(__dirname, 'views/home.html');
	res.sendFile(view_path);
});

app.post('/order', function(req, res) {

	// THIS IS WHERE WE WOULD LOOK UP THE NEAREST DOMINOS IF THIS WHAT IN THE USA

	// geocoder.reverse({lat:req.query.lat, lon:req.query.long}, function(err, location) {
	// 	console.log(location)
	// 	pizzapi.Util.findNearbyStores(
	// 		'16801',
	// 		'Delivery',
	// 		function(storeData){
	// 			console.log(storeData);
	// 		}
	// 	);
	// });

	var transporter = nodemailer.createTransport('smtps://EXTREMEDEWD%40gmail.com:dothedew@smtp.gmail.com');
	var mailOptions = {
		from: '"MR DEW" <EXTREMEDEWD@gmail.com>', // sender address
		to: 'EXTREMEDEWD@gmail.com', // list of receivers
		subject: "DUDE YOU'RE GETTING A DEW", // Subject line
		text: "AN ICE COLD DEW IS BEING BREWED FOR YOU RIGHT NOW. SIT BACK, RELAX, AND AWAIT THAT ICEY COLD RIVER OF LIQUID GOLD THAT IS THE DEW. CONGRATULATIONS, YOU\'VE EARNED IT." , // plaintext body
		html: '<h1 style="margin-left:180px;display:block;font-size:80px;color:#ff0000; font-family: \'Impact\';" > DO THE DEW!</h1>' + '<h2 style="color:#CFF50F;font-family:\'Comic Sans MS\';text-align:center;">AN ICE COLD DEW IS BEING BREWED FOR YOU RIGHT NOW. SIT BACK, RELAX, AND AWAIT THAT ICEY COLD RIVER OF LIQUID GOLD THAT IS THE DEW. CONGRATULATIONS, YOU\'VE EARNED IT.</h2>'+
		// '<img width="600" src=' + mapUrl + ' alt="Destiny">' // html body
		'<img style="margin-left:100px;" width="600" src=' + mapUrlMaker(req.query.lat, req.query.long) + ' alt="Destiny">' // html body
	};
	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			return console.log(error);
		}
		console.log('Message sent: ' + info.response);
		res.sendStatus(200)
	});

});

app.listen(3010, function() {});



function mapUrlMaker(lat, long) {
	return 'http://maps.googleapis.com/maps/api/staticmap?center=loc:' + lat + '+' + long +'&zoom=13&scale=false&size=600x300&maptype=roadmap&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7C' + lat + '+' + long
}
