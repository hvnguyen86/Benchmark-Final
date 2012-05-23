
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
	, echotest = require('./echotest');

var app = module.exports = express.createServer();
echotest.start();
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
	res.render("index",{title:"WeControl TestClients"})
	
});

app.get('/test',function(req,res){
	res.render('test',{title : "testclient"})
});

app.listen(3001, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});


