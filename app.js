var express = require('express');
var routes = require('./routes/index');
var path = require('path');
var config =require('./config.js');
var youtube = require('./youtube');
var youTubeclient = new youtube.Client(config.youTube);

var app = express();

app.set('port', process.env.PORT || 6500);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower',express.static(path.join(__dirname, 'bower_components')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/',routes);
app.get("/search",function(req,res){
	var term = req.query['q'];
	youTubeclient.search(term,function(data){
		res.json(data);
		res.end();
	});
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