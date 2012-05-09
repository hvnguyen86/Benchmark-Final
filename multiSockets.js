//var client = require("socket.io-client");
var host = "http://localhost:3000";
var max = 10000,
min = 1000
var sockets = [];
var x = (Math.random() * (max - min)) + min;
var count = 1;
var client = require("socket.io-client");
for(var i = 0; i<count;i++){
	
	
	
}


var controller = client.connect(host , {'force new connection' : true});
var controller2 = client.connect(host);
//sockets.push(socket);


var receiver = client.connect(host);
var receiver2 = client.connect(host);
var session;
var session2;

receiver.on("connect",function(){
	session = receiver.socket.sessionid;
});

receiver2.on("connect",function(){
	session2 = receiver2.socket.sessionid;
});

receiver.on("testTime",function(command){
	console.log( new Date().getTime() - command.time + " 1" );
});

receiver2.on("testTime",function(command){
	console.log( new Date().getTime() - command.time + " 2");
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
	controller.emit("testTime",session,new Date().getTime());
	controller2.emit("testTime",session,new Date().getTime());

},1000);




