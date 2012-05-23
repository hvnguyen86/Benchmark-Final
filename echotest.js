var fs = require('fs');
var io = require("socket.io-client");
var host = "http://176.34.100.20";
var timeLog = fs.createWriteStream(__dirname+'/public/time.log',{flags:'a',mode:0666, encoding:'encoding'});
var count = 200;
var sockets = [];
var total = 0;
var countTime = 0; 
var echo = exports;
echo.start = function(){
	  
		//clear logs before start
		fs.writeFile('public/time.log',"",function(err){
			if(err) throw err;
		});
		
		fs.writeFile('public/average.txt',"",function(err){
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
			fs.writeFile('public/average.txt',total/countTime,function(err){
				if(err) throw err;
			});
		})
	
		socket.on("disconnect",function(){
			console.log("disconnect");
		});
	
	}

	//console.log(sockets);

	var j = 0;
	setInterval(function(){
		if(j==sockets.length){
			j=0;
		}
	
		sockets[j].send(new Date().getTime());
		j++;
	},1000);
}


