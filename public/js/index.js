 $(document).ready(function() {

  // Music Animations
  d = new Date();
  reset();
    
  // $('#disc').addClass('spin');
  // setTimeout(function () {
  //   $('#disc').transition({ x: 600, rotate: 1080}, 1000).transition({ x: 150, rotate: 0}, 1500)
  // }, 1000);
  $('#disc').click(function() {
    endSong();
  });

  $('#song-info').click(function() {
    startSong();
  });

  function nextSong (songInfo) {
    endSong();
    setTimeout(function () {
      reset();
      startSong(songInfo);
    }, 3000);
  }

  function endSong () {
    $('#album-overlay').transition({'left': '-100px'}, 2000,'cubic-bezier(0,0.9,0.3,1)').transition({opacity: 0})
    $('#album-art').css({'-webkit-filter': 'none'}).transition({'left': '-100px'}, 2000,'cubic-bezier(0,0.9,0.3,1)');
    $('#disc').css({'left': '-100px'}).removeClass('spin').transition({ x: 600, rotate: 1080}, 1000).transition({ x: -150, rotate: 0}, 2000);
    $('#song-info').transition({opacity: 0});

    setTimeout( function () {
      $('#song-info').marquee('destroy');
    }, 2500);

  }

  function startSong (songInfo) {
    $('#album-art').css('background-image', "url('/img/Cover.png?"+d.getTime()+"')");
    $("#disc").css({opacity: 0})
    .transition({ x: 150, opacity: 100, rotate: 180}, 2500, 'cubic-bezier(0,0.9,0.3,1)');
    $('#album-overlay').css({opacity: 0, 'left': '8px'});
    $('#song-info p').text(songInfo);

    setTimeout(function () {
      $('#album-art').transition({'left': '8px'}, 1000,'cubic-bezier(0,0.9,0.3,1)');
    }, 1500);

    setTimeout(function () {
      $("#song-info").transition({ opacity: 100}).marquee();
      $('#album-overlay').transition({opacity: 100}, 2000)
      $('#album-art').transition({'-webkit-filter': 'drop-shadow(3px 0px 1px rgba(0,0,0,0.5)'}); //.addClass('shadow');
    }, 2000);

    setTimeout(function () {
      $("#disc").css({'left': '50px'}).addClass('spin');
    }, 3000)

  }

  function reset () {
    $('#song-info').css({opacity: 0});
    $('#disc').css({'left': '-100px', opacity: 0});
    $('#album-art').css({'left': '-100px', '-webkit-filter': 'none'});
    $('album-overlay').css({'left': '-100px', opacity: 0});
  }

  // Socket Stuff
  var messages = [];
  var dashHostname = 'http://' + document.location.hostname + ':1337';
  var dashSocket = io.connect(dashHostname);

  dashSocket.on('message', function (data) {
    switch (data.command) {
      case 'pauseSong':
        endSong();
        break;
      case 'nextSong':
        // alert(data.info.nowPlaying);
        nextSong(data.info.nowPlaying);
        break;
      case 'startSong':
        reset();
        startSong(data.info.nowPlaying);
        break;
    }
  });



});