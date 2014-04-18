 $(document).ready(function() {

    startSong();
      
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

        function endSong () {
              $('#album-overlay').transition({'left': '-100px'}, 2000,'cubic-bezier(0,0.9,0.3,1)').transition({opacity: 0})
              $('#album-art').transition({'left': '-100px'}, 2000,'cubic-bezier(0,0.9,0.3,1)').removeClass('shadow');
              $('#disc').css({'left': '-100px'}).removeClass('spin').transition({ x: 600, rotate: 1080}, 1000).transition({ x: -150, rotate: 0}, 2000);
              $('#song-info').transition({opacity: 0});

              setTimeout(function () {
                reset();
                startSong();
              }, 3000);

        }

        function startSong () {
                $("#disc").css({opacity: 0})
                .transition({ x: 150, opacity: 100, rotate: 180}, 2500,
          'cubic-bezier(0,0.9,0.3,1)');
                $('#album-overlay').css({opacity: 0, 'left': '8px'});
                $("#song-info").css({opacity: 0});

                setTimeout(function () {
                  $('#album-art').transition({'left': '8px'}, 1000,'cubic-bezier(0,0.9,0.3,1)');
                  $("#song-info").transition({ opacity: 100}, 3000)}, 2000);

                
                // $("#song-info").transition({ opacity: 100})
                setTimeout(function () {
                  $("#song-info").transition({ opacity: 100})
                  // $("#disc").css({'left': '50px', '-webkit-animation-name': 'spin', '-webkit-animation-duration': '4000ms', '-webkit-animation-iteration-count': 'infinite', '-webkit-animation-timing-function': 'linear'});
                  $('#album-overlay').transition({opacity: 100}, 3000)
                  // $("#disc").css({'left': '50px'}).addClass('spin', 2000)
                  $('#album-art').transition({'-webkit-filter': 'drop-shadow(3px 0px 1px rgba(0,0,0,0.5)'}); //.addClass('shadow');
                }, 3000);

                setTimeout(function () {
                  $("#disc").css({'left': '50px'}).addClass('spin');
                }, 4000)

        }
        function reset () {
          // alert("I am an alert box!");
          $('#song-info').css({opacity: 0});
          $('#disc').css({'left': '-100px', opacity: 0});
          $('#album-art').css({'left': '-100px', '-webkit-filter': 'none'});
          $('album-overlay').css({'left': '8px'});
        }


});