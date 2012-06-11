var fs = require('fs');
var io = require("socket.io-client");
var host = "http://localhost:3000";
var timeLog = fs.createWriteStream(__dirname+'/public/time.log',{flags:'a',mode:0666, encoding:'encoding'});
var count = 200;
var sockets = [];
var total = 0;
var countTime = 0; 
var echo = exports;
echo.start = function(){
		fs.writeFile('public/time.log',"",function(err){
			if(err) throw err;
		});
		
		for(var i=0;i<count;i++){
		var socket = io.connect(host,{"force new connection":true});
		sockets.push(socket);
		//console.log(i);
		socket.on("message",function(message){
			countTime++;
			time = new Date().getTime()-message;
			total+=time;
			timeLog.write(time+"\n");
			socket.send(new Date().getTime());
		});
		socket.on("disconnect",function(){
			console.log("disconnect");
		});
	
	}

 parallelSockets();
	var j = 0;
}

function parallelSockets(){
	for(var i = 0 ;i<count;i++){
		sockets[i].send(new Date().getTime());
	}
}

