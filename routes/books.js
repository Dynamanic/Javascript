var express = require('express');
var url = require('url');
var router = express.Router();
var bittrex = require('node-bittrex-api');
bittrex.options({
  'apikey' : '40d953b1a9ce4432a269599f8806a3e3',
  'apisecret' : 'PiGF33T$2016'
});



router.get('/', function(req, res, next){
	
var url_parts = url.parse(req.url, true);	
	var query = url_parts.query;
	
	
bittrex.getorderbook({ market : req.query.coin, depth : 10, type : 'both' }, function( data, err ) {
	
  res.send(data);
});

	
	
	
	
});

module.exports = router;


