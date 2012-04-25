var exec = require('child_process').exec;
var sys = require('util');
var clients = parseInt(process.argv[2]) || 0 ;

if(clients == 0){
	clients = 5;
}

for(var i = 0;i<clients;i++){

	exec("node client.js",function(err,stdout,sterr){
	
	});
	
}

console.log(clients+" websocket-clients started");

