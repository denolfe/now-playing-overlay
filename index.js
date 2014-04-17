var watch = require('node-watch');

var winspawn = require('win-spawn');

console.log('Starting Helper script...');
winspawn('helper.ahk');

watch('./NowPlaying.txt', function(file) {
  console.log('Song Change.');
  var search = require('./search.js');
  search.getInfo();

});

var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , bodyParser = require('body-parser');

var port = 1337;
server.listen(port);
console.log('Server started at localhost:' + port)

app.use(express.static(__dirname+'/public'));
app.use(bodyParser({strict: false}));
app.set('views', './views');
app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res) {
  res.render('index.html');
});