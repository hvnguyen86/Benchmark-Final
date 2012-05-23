var io = require("socket.io-client");
var host = "http://176.34.100.20";
var count = 200;
var sockets = [];
for(var i=0;i<count;i++){
	var socket = io.connect(host,{"force new connection":true});
	sockets.push(socket);
	socket.on("message",function(message){
		console.log(new Date().getTime()-message)
	})
	
	socket.on("disconnect",function(){
		console.log("disconnect");
	});
	
}

var j = 0;
setInterval(function(){
	if(j==socket.length){
		j=0;
	}
	
	sockets[j++].send(new Date().getTime());
},1000)