//var client = require("socket.io-client");
var host = "http://localhost:3000";
var max = 10000,
min = 1000
var sockets = [];
var x = (Math.random() * (max - min)) + min;
var count = 1;

for(var i = 0; i<count;i++){
	var client = require("socket.io-client");
	var socket = client.connect(host, {'connect timeout' : 10000});
	sockets.push(socket);
	
}


var socket = client.connect(host,{'connect timeout' : 10000});
var session;
socket.on("connect",function(){
	session = socket.socket.sessionid;
});

socket.on("testTime",function(command){
	console.log( new Date().getTime() - command.time);
});


var j = 0;
setInterval(function(){
	j++;
	if(j>count-1){
		j=0;
	}
	
	x = (Math.random() * (max - min)) + min;
	//sockets[j].emit("testTime",session,new Date().getTime());
	/*sockets[j].on("testTime",function(command){
		console.log(command.id +" "+ j);
	});*/
	socket.emit("testTime",session,new Date().getTime());

},1000);




