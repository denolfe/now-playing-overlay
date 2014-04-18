var watch = require('node-watch');

var winspawn = require('win-spawn');

var search = require('./search.js');



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
  res.render('./public/index.html');
});

var socket;
io.sockets.on('connection', function (sock) {
    socket = sock;
    stateChange();
});


console.log('Starting Helper script...');
winspawn('helper.ahk');


function stateChange () {
  console.log('\nSong State Change.');
  try {
  	var np = search.getNowPlaying();
  	socket.emit('message', {'command': np.command, 'info': np});	
  }
  catch (err)
  {
  	console.log(err.message);
  }
}

watch('./public/NowPlaying.txt', stateChange);