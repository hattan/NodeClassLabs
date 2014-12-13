var express = require('express');
var path = require('path');
var app = express();

app.set('port', process.env.PORT || 6500);

app.get('/',function(req,res){
	res.send("hello world");
});

app.get('/users',function(req,res){
  var users = [
  	{name : 'bob smith', age : 35},
  	{name : 'mike jones', age : 35},
  	{name : 'tony stark', age : 35},
  	{name : 'sally ride', age : 35}
  ];
  
	res.json(users);
});

var server = app.listen(app.get('port'),function(){
	console.log("Server started on port " +server.address().port);
})