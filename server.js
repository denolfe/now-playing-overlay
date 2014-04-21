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

if (process.platform == 'win32')
{
  console.log('Starting Helper script...');
  winspawn('helper.ahk');  
}
else
{
  console.log('Helper script can only run on Windows machines.');
}


function stateChange () {
  console.log('\nSong State Change.');
  var np = search.getNowPlaying();
  if (typeof socket === 'undefined')
    console.log('No page currently listening...');
  else
    socket.emit('message', {'command': np.command, 'info': np});  
}

watch('./public/NowPlaying.txt', stateChange);