exports.getArt = function(query) {
  /**
   * Example that executes a Spotify "Search" and parses the XML results using
   * node-xml2js.
   */

  var xml2js = require('xml2js');
  var Spotify = require('spotify-web');
  var superagent = require('superagent');

  // Spotify credentials...
  var username = process.env.SPOTIFY_USERNAME;
  var password = process.env.SPOTIFY_PASSWORD;

  Spotify.login(username, password, function(err, spotify) {
    if (err) throw err;

    spotify.search(query, function(err, xml) {
      if (err) throw err;
      spotify.disconnect();

      var parser = new xml2js.Parser();
      parser.on('end', function(data) {
        var album_uri;
        var open = require('open');
        try {
          // Check Album for Art
          album_uri = data.result.albums[0].album[0].cover[0];
          console.log(spotify.sourceUrls.small + album_uri);
          // open(spotify.sourceUrls.small + album_uri);

          download(spotify.sourceUrls.small + album_uri, 'public/img/Cover.png', function() {
            console.log('Art downloaded successfully.');
          });
        } catch (ignore) {
          console.log("Album art not found. Checking song art...");
          try {
            // Check Song for Art
            album_uri = data.result.tracks[0].track[0].cover[0];
            console.log(spotify.sourceUrls.small + album_uri);
            // open(spotify.sourceUrls.small + album_uri);

            download(spotify.sourceUrls.small + album_uri, 'public/img/Cover.png', function() {
              console.log('Art downloaded successfully.');
            });
          } catch (ignore2) {
            console.log("Can't find any art... Using unknown cover art.");
            try {
              fs.writeFileSync('public/img/Cover.png', fs.readFileSync('public/img/no-cover.png'));
            } catch (err) {
              console.log(err);
            }
          }

        }
      });
      parser.parseString(xml);
    });

  });
}

var lastCommand;
exports.getNowPlaying = function() {
  var out = {};
  var path = require('path');
  var filePath = path.join(__dirname + '/public/Snip.txt');

  var nowPlaying = fs.readFileSync(filePath, 'utf8').replace(/^\s+|\s+$/g, '');
  console.log('Last Command: ' + lastCommand);
  if (nowPlaying == '') {
    console.log('Music is paused.');
    out.command = 'pauseSong';
    out.nowPlaying = '';
  } else {
    console.log('Now Playing: ' + nowPlaying);
    if (lastCommand == 'pauseSong') {
      out.command = 'startSong'
    } else {
      out.command = 'nextSong';
    }
    out.nowPlaying = nowPlaying;
    // this.getArt(nowPlaying);
  }
  lastCommand = out.command;
  return out;
}


// http://stackoverflow.com/questions/12828187/saving-an-image-file-with-node-js-request-library-causes-exception
var fs = require('fs'),
  request = require('request');

var download = function(uri, filename, callback) {
  request.head(uri, function(err, res, body) {
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};


function getInfo() {
  var LastfmAPI = require('lastfmAPI');

  var lfm = new LastfmAPI({
    'api_key': process.env.LASTFM_API_KEY,
    'secret': process.env.LASTFM_SECRET
  });

  var artist = "";
  var track = "";
  lfm.user.getRecentTracks({
    'user': process.env.LASTFM_USERNAME
  }, function(err, track) {
    if (err) {
      console.log(err);
      throw err;
    }
    // console.log(track.track[0]);
    artist = track.track[0].artist["#text"];
    track = track.track[0].name;
    // console.log(artist);
    // console.log(track);
    // console.log(track.track[0].image[3]["#text"])
    getArt(artist, track);
  });

}