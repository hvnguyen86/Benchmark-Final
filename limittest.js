var fs = require('fs');
var io = require("socket.io-client");
var host = "http://46.137.112.231:3000";
var count = 10;
var sockets = [];
var connections=0;
(function(){
		//clear measuersments of the last test
		fs.writeFile('public/client.log',"",function(err){
			if(err) throw err;
		});
		for(var i=0;i<count;i++){
			var socket = io.connect(host,{"force new connection":true});
			sockets.push(socket);
			//console.log(i);
			socket.send("hello");
			socket.on("message",function(message){
			connections++;
			console.log(connections);
			});
			
			socket.on('disconnect',function(){
				connections--;
				console.log(connections);
			})
		}
})();