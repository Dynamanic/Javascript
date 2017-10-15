var express = require('express');
var url = require('url');
var router = express.Router();
var bittrex = require('node-bittrex-api');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const crypto = require("crypto");

bittrex.options({
  'apikey' : '40d953b1a9ce4432a269599f8806a3e3',
  'apisecret' : 'bc674979177f4ac5ad97816be00a9220'
});
var CryptoJS = require("crypto-js");
router.get('/', function(req, res, next){
	
	
	var url_parts = url.parse(req.url, true);	
		var query = url_parts.query;
	    var milliseconds = (new Date).getTime();
		
		var urla = 'https://bittrex.com/Api/v1.1/market/' + req.query.type + '?apikey=e8a1382052354faaa2d4e281c85c9664&market='+ req.query.coin + '&quantity=' + req.query.quantity + '&rate=' + req.query.limit +'&nonce=' + milliseconds;
		var apisign = CryptoJS.HmacSHA512(CryptoJS.enc.Utf8.parse(urla),CryptoJS.enc.Utf8.parse('bc674979177f4ac5ad97816be00a9220')).toString(CryptoJS.enc.Hex);
		
		var xhttp = new XMLHttpRequest();
        xhttp.open("GET", urla, false);
        xhttp.setRequestHeader("apisign", apisign);
		
        xhttp.send();
				

		console.log(xhttp.responseText);
        var response = JSON.parse(xhttp.responseText);

		res.send(response.result);
	
	
	
	
});

module.exports = router;


