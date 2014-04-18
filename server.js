var watch = require('node-watch');

var winspawn = require('win-spawn');

var search = require('./search.js');

console.log('Starting Helper script...');
winspawn('helper.ahk');

watch('./NowPlaying.txt', function(file) {
  console.log('\nSong State Change.');
  search.getNowPlaying();
});

var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , bodyParser = require('body-parser');

var port = 1337;
server.listen(port);
console.log('Server started at localhost:' + port + '...');

app.use(express.static(__dirname+'/public'));
app.use(bodyParser({strict: false}));
app.set('views', './views');
app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res) {
  res.render('index.html');
});