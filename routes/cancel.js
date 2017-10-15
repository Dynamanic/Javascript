var express = require('express');
var url = require('url');
var router = express.Router();
var bittrex = require('node-bittrex-api');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const crypto = require("crypto");



bittrex.options({
  'apikey' : 'e8a1382052354faaa2d4e281c85c9664',
  'apisecret' : 'bc674979177f4ac5ad97816be00a9220',
   'baseUrl': 'https://bittrex.com/api/v1.1'
});

var CryptoJS = require("crypto-js");



router.get('/', function(req, res, next){
	
		var url_parts = url.parse(req.url, true);	
		var query = url_parts.query;
	    var milliseconds = (new Date).getTime();
		var urla = 'https://bittrex.com/Api/v1.1/market/getopenorders?apikey=e8a1382052354faaa2d4e281c85c9664&nonce=' + milliseconds;
		var apisign = CryptoJS.HmacSHA512(CryptoJS.enc.Utf8.parse(urla),CryptoJS.enc.Utf8.parse('bc674979177f4ac5ad97816be00a9220')).toString(CryptoJS.enc.Hex);
		
		var xhttp = new XMLHttpRequest();
        xhttp.open("GET", urla, false);
        xhttp.setRequestHeader("apisign", apisign);
		
        xhttp.send();
				

		
        var response = JSON.parse(xhttp.responseText);
		
		var urlb = 'https://bittrex.com/api/v1.1/market/cancel?apikey=e8a1382052354faaa2d4e281c85c9664&uuid=' + response.result[0].OrderUuid + '&nonce=' + milliseconds;
		
		var apisignb = CryptoJS.HmacSHA512(CryptoJS.enc.Utf8.parse(urlb),CryptoJS.enc.Utf8.parse('bc674979177f4ac5ad97816be00a9220')).toString(CryptoJS.enc.Hex);
		
		var xhttpb = new XMLHttpRequest();
        xhttpb.open("GET", urlb, false);
        xhttpb.setRequestHeader("apisign", apisignb);
		
        xhttpb.send();
		console.log(xhttpb.responseText);
		var responseb = JSON.parse(xhttpb.responseText);
		var oldOrder = {"Quantity": response.result[0].Quantity,"Limit": response.result[0].Limit};
		
		res.send(oldOrder);
	
	
	
});

module.exports = router;


