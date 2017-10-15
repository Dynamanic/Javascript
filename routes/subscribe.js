

var express = require('express');
var url = require('url');
var router = express.Router();
var bittrex = require('node-bittrex-api');
var ticker = "";
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var sock;
server.listen(8080);

bittrex.options({
  'apikey' : '40d953b1a9ce4432a269599f8806a3e3',
  'apisecret' : 'PiGF33T$2016'
});

io.on('connection', function (socket) {
	sock=socket;
	
var url = 'https://bittrex.com/api/v1.1/public/getcurrencies';
bittrex.sendCustomRequest( url, function( data, err ) {
	
	 socket.emit('currencies', data.result);
 
});
 
 
});




	router.get('/', function(req, res, next){
	var url_parts = url.parse(req.url, true);	
var query = url_parts.query;
bittrex.websockets.client(function() {
  console.log('Websocket connected');
 

  

    bittrex.websockets.subscribe([req.query.coin], function(data) {
	

var url = 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=' + req.query.coin;
bittrex.sendCustomRequest( url, function( data, err ) {
if(data)
	 sock.emit('ticker', data.result);
 
});
	
	
	//bittrex.getticker( { market : req.query.coin },function( ticker ) {
	//	 sock.emit('ticker', ticker);
		 
	//	 console.log(ticker);
	
   // });
	
  });
  
});

  
	
});

module.exports = router;
