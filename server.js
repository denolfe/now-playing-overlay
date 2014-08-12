var winspawn = require('win-spawn');
var search = require('./search.js');

var express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server),
  bodyParser = require('body-parser');

var port = 1337;
server.listen(port);
console.log('Server started at localhost:' + port + '...');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser({
  strict: false
}));
app.set('views', './views');
app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res) {
  res.render('./public/index.html');
});

var clients = [];
var npsock, kbsock, song;
io.sockets.on('connection', function(socket) {

  socket.on('storeClientInfo', function (data) {

      var clientInfo = new Object();
      clientInfo.customId         = data.customId;
      clientInfo.clientId     = socket.id;
      clients.push(clientInfo);
      
      if (clientInfo.customId == 'NowPlaying')
      {
       
        console.log(clientInfo.customId + ' connected.');
        npsock = socket;
        stateChange(song);
      }
      else if (clientInfo.customId == 'Keys')
      {
        console.log(clientInfo.customId + ' connected.');
        kbsock = socket;
      }
  });

  socket.on('disconnect', function (data) {

    for( var i=0, len=clients.length; i<len; ++i ) {
        var c = clients[i];

        if(c.clientId == socket.id) {
            clients.splice(i,1);
            console.log(c.customId + ' disconnected.');
            break;
        }
    }

  });
  
});

if (process.platform == 'win32') {
  console.log('Starting Helper script...');
  winspawn('helper.ahk');
} else {
  console.log('Helper script can only run on Windows machines.');
}

app.get('/np/:song', function(req, res) {
  // res.send(req.params.song);
  song = req.params.song;
  console.log(song);
  stateChange(song);
});

function stateChange(song) {
  console.log('\nSong State Change.');
  var np = search.getNowPlaying(song);
  if (typeof npsock !== 'undefined')
    npsock.emit('message', {
      'command': np.command,
      'info': np
    });
}