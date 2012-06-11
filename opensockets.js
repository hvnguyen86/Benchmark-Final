var io = require("socket.io-client");

var count = 200;
var sockets = {};

for(var i = 0;i<count;i++){
	var socket = io.connect("http://46.137.112.231:3000",{"force new connection":true});
	
	
}