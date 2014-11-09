var express = require('express');
var app = express();
var http = require('http').Server(app);
var spark = require('spark');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
//var config = require('/config.json');

// respond with "Hello World!" on the homepage
console.log('working...');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.get('/', function (req, res) {
  console.log('working...');

  res.render('index.jade')
})

app.post('/pay', function (req, res) {
     spark.login({username: 'canzhiye@gmail.com', password: 'BitCoffee'}).then(
    function(token){
        spark.listDevices().then(
            function(success) {
                var device = success[0]
                console.log(device)

                device.callFunction('brew', '9', function(err, data) {
                    if (err) {
                        console.log('An error occurred:', err);
                    } else {
                        console.log('Function called succesfully:', data);
                    }
                });
            },
            function(failure) {
                console.log('failure')
            }
        );
    },
    function(err) {
        console.log('API call completed on promise fail: ', err);
    }
    );
})

var port     = process.env.PORT || 3000;

http.listen(port, function(){
  console.log('listening on ', port);
});

module.exports = app;
