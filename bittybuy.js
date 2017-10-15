

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var subscribe = require('./routes/subscribe.js')
var books = require('./routes/books.js')
var trade = require('./routes/trade.js')
var polo = require('./routes/polo.js')
var up = require('./routes/up.js')
var down = require('./routes/down.js')
var cancel = require('./routes/cancel.js')
var index = require('./routes/index.js')
var port = 80;
var app = express();


//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set static folder
app.use(express.static(path.join(__dirname, 'client')));

//Body Parser
app.use(bodyParser.json());
app.use (bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/subscribe', subscribe);
app.use('/books', books);
app.use('/up', up);
app.use('/down', down);
app.use('/cancel', cancel);
app.use('/polo', polo);
app.use('/trade', trade);



app.listen(port,function(){
	console.log('server started');
});
