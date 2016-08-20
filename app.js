var express = require('express');
var path = require('path');
var app = express();
var pizzapi = require('pizzapi');

app.get('/', function(req, res) {
	var view_path = path.join(__dirname, 'views/home.html');
	res.sendFile(view_path);
});

app.post('/order', function(req, res) {	
//code to place order...	
// 860 richmond street west, Toronto, ON M6J 1C9
//send an email
});

app.listen(3000, function() {});
