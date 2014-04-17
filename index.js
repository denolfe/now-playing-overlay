var watch = require('node-watch');

var winspawn = require('win-spawn');

console.log('Starting Helper script...');
winspawn('helper.ahk');

watch('./NowPlaying.txt', function(file) {
  console.log('Song Change.');
  var search = require('./search.js');
  search.getInfo();

});