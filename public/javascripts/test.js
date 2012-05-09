var count = 0;

var receivers = [];
var controllers = [];
var sessionids =[];
var average = 0;
var times = [];
var total = 0;


function createReceivers(){
	var socket = io.connect($('#host').val(), {"force new connection": true});
	receivers.push(socket);
	socket.on("connect",function (command){
		var session = socket.socket.sessionid;
		//console.log(session);
		sessionids.push(session);
		//socket.emit("testTime",new Date().getTime())
	});
	socket.on("testTime",function (command){
		$('#conn').html(command.users);
		var delta = new Date().getTime()-command.time;
		total += delta;
			times.push(delta);
			average = total/times.length; 
			$('#output').append(average + "\n")
	});
	
	socket.on("disconnect",function(){
		console.log(socket.socket.sessionid,"Disonnect");
	})
}

//http://139.6.253.55:3000/socket.io/1/websocket/9095228841969714372
var j = 0;

function createControllers(){
	var socket = io.connect($('#host').val(),{"force new connection":true});
	controllers.push(socket);
}
function start(){
	if($('#clients').val() == parseInt($('#clients').val())){
		count=$('#clients').val();
	}
	
	else {
		alert("That's not an Integer! Don't try to hack me :-(");
		return;
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
}

function stop(){
	//alert("stop");
	for(var i = 0 ;i<controllers.length;i++){
		controllers[i].disconnect();
		receivers[i].disconnect();
	}
}

