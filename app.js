
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', function(req,res){
	res.render("index",{title:"WeControl TestClients",clients:clients})
	
});

app.get('/test',function(req,res){
	res.render('test',{title : "testclient"})
});

app.listen(3001, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

var exec = require('child_process').exec;
var sys = require('util');
var clients = parseInt(process.argv[2]) || 0 ;

exec("node echotest.js");

/*if(clients == 0){
	clients = 5;
}

for(var i = 0;i<clients;i++){

	exec("node client.js",function(err,stdout,sterr){
	
	});
	
}*/

//console.log(clients+" websocket-clients started");
