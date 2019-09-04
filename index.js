
var PORT = 4242;
var HOST = '0.0.0.0';
var dgram = require('dgram');
const path = require('path');
var server1 = dgram.createSocket('udp4');
var express	= require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/static', express.static('public'));

app.get('/',function(req, res){
	res.sendFile(path.join(__dirname,'/index.html'));
});

server1.on('listening',function(){
	var address = server1.address();
	console.log('UDP Server listening on ' +address.address + ':' + address.port);
});



io.on('connection',function(socket){
		console.log('connected');
		server1.on('message',function(message, remote){
			var data1 = message;
			console.log(message);
			if(message == 1)
				socket.emit('llz-p', { description: '/static/green.png' });
			else if(message == 2)
				socket.emit('llz-p', { description: 'static/red.png' });
			else if(message == 3)
				socket.emit('dvor-p', { description: 'static/green.png' });
			else if(message == 4)
				socket.emit('dvor-p', { description: 'static/red.png' });
			//console.log('Message = ' + message + ' = ' + data1);//
			//socket.emit('data2', { description: message.toString() });//
			console.log('Sent')
		});
		
		socket.on('disconnect',function(){
			console.log('disconnected');
		});
});	

http.listen(8000, function () {
	console.log('Listening on *:8000');
});
server1.bind(PORT, HOST);