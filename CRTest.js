var client = require('socket.io-client');
var host ="http://localhost:3000";

var count=10;

var receivers = [];
var controllers = [];
var sessionids =[];
var average = 0;
var times = [];
var total = 0;

function createReceivers(){
	var socket = client.connect(host, {"force new connection": true});
	receivers.push(socket);
	socket.on("connect",function (command){
		var session = socket.socket.sessionid;
		//console.log(session);
		sessionids.push(session);
		//socket.emit("testTime",new Date().getTime())
	});
	socket.on("testTime",function (command){
		var delta = new Date().getTime()-command.time;
		total += delta;
		if(delta < average * 10 || average == 0 )
		{
			times.push(delta);
			average = total/times.length; 
			console.log(average + " " + delta);
	  }
		else 
			console.log(delta);
		
		//console.log(socket.socket.sessionid);
	});
}

//http://139.6.253.55:3000/socket.io/1/websocket/9095228841969714372
var j = 0;
function sendCommands(){
	
}


function createControllers(){
	var socket = client.connect(host,{"force new connection":true});
	controllers.push(socket);
}

for(var i=0;i<count;i++){
	createReceivers();
	createControllers();
}


setInterval(function(){
	if(j>=controllers.length){
		j=0;
	}
	
	
	controllers[j].emit("testTime",sessionids[j],new Date().getTime());
	
	j++;
},1000);
console.log("start with" + count*2 + "clients");

