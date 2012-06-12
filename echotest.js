var fs = require('fs');
var io = require("socket.io-client");
var host = "http://localhost:3000";
var timeLog = fs.createWriteStream(__dirname+'/public/time.log',{flags:'a',mode:0666, encoding:'encoding'});
var count = 10;
var sockets = [];
var total = 0;
var countTime = 0; 
var echo = exports;
echo.start = function(){
		/*fs.writeFile('public/time.log',"",function(err){
			if(err) throw err;
		});*/
		
		/*sockets.push(io.connect(host,{"force new connection":true}));
		
		sockets[0].on("message",function(message){
			timeLog.write(new Date().getTime()-message+"\n");
			sockets[0].send(new Date().getTime());
		});*/
		
		for(var i=0;i<count;i++){
			var socket = io.connect(host,{"force new connection":true});
			sockets.push(socket);
			//console.log(i);
			socket.on("message",function(message){
				console.log(new Date().getTime()-message);
				socket.send(new Date().getTime());
				
		})
	
	}
	parallelSockets();
}

function parallelSockets(){
	for(var i = 0 ;i<count;i++){
		sockets[i].send(new Date().getTime());
	}
}

