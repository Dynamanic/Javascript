var express = require('express');
var url = require('url');
var router = express.Router();		
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;	

router.get('/', function(req, res, next){
	
var url_parts = url.parse(req.url, true);	
	var query = url_parts.query;
	
	var coin=req.query.coin;
	var fixedcoin = coin.replace("-","_");
	

		var gettopbidaskURL = 'https://poloniex.com/public?command=returnOrderBook&currencyPair='+ fixedcoin +'&depth=1';
		var xhttp = new XMLHttpRequest();
        xhttp.open("GET", gettopbidaskURL, false);
		xhttp.send();
		//console.log(xhttp.responseText);
		var response = JSON.parse(xhttp.responseText);
		
		//console.log(response);
		var topbidask = {
			"bid": response.bids[0][0],
			"bidqty": response.bids[0][1],
			"ask": response.asks[0][0],
			"askqty": response.asks[0][1]
			};
		
		res.send(topbidask);
	
	
});




router.get('/buy', function(req, res, next){
	var url = require('url');
	var url_parts = url.parse(req.url, true);	
	var query = url_parts.query;
	
	var coin=req.query.coin;
	var rate=req.query.rate;
	var amount=req.query.amount;

	buy(coin, rate, amount);
	res.send("Buying " + amount + " " + coin + " on Polo for " + rate);
	
	
});

router.get('/sell', function(req, res, next){
	var url = require('url');
	var url_parts = url.parse(req.url, true);	
	var query = url_parts.query;
	
	var coin=req.query.coin;
	var rate=req.query.rate;
	var amount=req.query.amount;

	sell(coin, rate, amount);
	res.send("Selling " + amount + " " + coin + " on Polo for " + rate);
	
	
});



function buy(coin, rate, amount){
var CryptoJS = require("crypto-js");
		
	    var milliseconds = (new Date).getTime();
		
		
		var fixedcoin = coin.replace("-","_");
		
		var url = 'https://poloniex.com/tradingApi'; 

		var params = "command=buy&currencyPair="+fixedcoin+"&rate="+rate+"&amount="+amount+"&immediateOrCancel=1&nonce="+milliseconds;
		
		var apisign = CryptoJS.HmacSHA512(CryptoJS.enc.Utf8.parse(params),CryptoJS.enc.Utf8.parse('bdd8643a65817188dd5068d1925c5ddcd732cc9a1f6c93d4000c561343e42fb54cf201d5a9b6351ff57519d23658134410ce426321842d3335a7bb5df7022447')).toString(CryptoJS.enc.Hex);
		
		var xhttp = new XMLHttpRequest();
		xhttp.open("POST", url, false);
		xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhttp.setRequestHeader("Key", "TJU6REGP-LS1JE9N3-N4DC5HWW-1ACMDBEW");
		xhttp.setRequestHeader("Sign", apisign);
		
		
        xhttp.send(params);
		console.log(xhttp.responseText);
		
		
       // var response = JSON.parse(xhttp.responseText);

		//console.log(response.result);
	
}



function sell(coin, rate, amount){

var CryptoJS = require("crypto-js");
	    var milliseconds = (new Date).getTime();
		
		
		var fixedcoin = coin.replace("-","_");
		
		var url = 'https://poloniex.com/tradingApi'; 

		var params = "command=sell&currencyPair="+fixedcoin+"&rate="+rate+"&amount="+amount+"&immediateOrCancel=1&nonce="+milliseconds;
			
		var apisign = CryptoJS.HmacSHA512(CryptoJS.enc.Utf8.parse(params),CryptoJS.enc.Utf8.parse('bdd8643a65817188dd5068d1925c5ddcd732cc9a1f6c93d4000c561343e42fb54cf201d5a9b6351ff57519d23658134410ce426321842d3335a7bb5df7022447')).toString(CryptoJS.enc.Hex);
		
		var xhttp = new XMLHttpRequest();
        xhttp.open("POST", url, false);
		xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhttp.setRequestHeader("Key", "TJU6REGP-LS1JE9N3-N4DC5HWW-1ACMDBEW");
		xhttp.setRequestHeader("Sign", apisign);
		
        xhttp.send(params);
				

		console.log(xhttp.responseText);
       // var response = JSON.parse(xhttp.responseText);

		//console.log(response.result);
	
}



module.exports = router;