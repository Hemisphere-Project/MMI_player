
$(function() {

  var fadeTime = 500;
  var idleTime = 20000;
  var mouse_idleTime = 4000;


  $('#waitScreen').hide();
  $('#player').hide();

  var isPlaying = false;
  var themeSelected = 'none';
  var index = 0;


  // SHOW
  ///////////////////////////////////////////////////////////
  $('.theme').on('click',function(){
    themeSelected = $(this).attr('id');
    index = $(this).attr('index');
    incrementIndex();
    playFilm();

  });


  function playFilm(){
    $("#videoplayer")[0].volume=2;
    $("#videoplayer")[0].setAttribute('src', 'videos/'+themeSelected+'/'+index+'.mp4');
    console.log(index+'.mp4');
    $("#player").fadeIn(fadeTime,function(){
      $("#videoplayer")[0].play();
      isPlaying = true;
    });
  }

  // NEXT PREV
  ///////////////////////////////////////////////////////////
  $('#prev').on('click',function(){
    decrementIndex();
    playFilm(themeSelected);
  });

  $('#next').on('click',function(){
    incrementIndex();
    playFilm(themeSelected);
  });


  function decrementIndex(){
    index --;
    if((themeSelected=='definition')||(themeSelected=='bizarre')||(themeSelected=='carte_blanche')){
      if(index==0) index=9;
    }
    if(themeSelected=='createur'){
      if(index==0) index=8;
    }
    $('#'+themeSelected).attr('index', index);
  }
  function incrementIndex(){

    index ++;
    if((themeSelected=='definition')||(themeSelected=='bizarre')||(themeSelected=='carte_blanche')){
      if(index==10) index=1;
    }
    if(themeSelected=='createur'){
      if(index==9) index=1;
    }
    $('#'+themeSelected).attr('index', index);
  }


  // PLAY PAUSE
  ///////////////////////////////////////////////////////////
  // $('#playpause').on('click',function(){
  //   console.log("playpause");
  //   if(isPlaying==false){
  //     isPlaying = true;
  //     $('#playpause').children('img').attr('src', "img/pause.png");
  //     $("#videoplayer")[0].play();
  //   }else if(isPlaying==true){
  //     isPlaying = false;
  //     $('#playpause').children('img').attr('src', "img/play.png");
  //     $("#videoplayer")[0].pause();
  //   }
  // });


  //SCROLLBAR
  ///////////////////////////////////////////////////////////

//   $('#scrollbarContainer').on('click',function(e){
//     var offset = $(this).offset();
//     var relX = e.pageX - offset.left;
//     var percent = ( relX / $(this).width() )*100;
//     var videoDuration = $("#videoplayer")[0].duration;
//     var time2Seek=percent*videoDuration/100;
//     $('#videoplayer')[0].currentTime = time2Seek;
//     $('#scrollbar').css('margin-left', percent+'%');
//   });
//
//   $('#videoplayer').on('timeupdate', function(e){
//     var currentTime = e.target.currentTime;
//     var videoDuration = $("#videoplayer")[0].duration;
//     var percent = currentTime*100/videoDuration;
//     $('#scrollbar').css('margin-left', percent+'%');
//     $("#timeDisplay").text(secondsToHms(currentTime));
//   });
//
//   function secondsToHms(d) {
//     d = Number(d);
//     var h = Math.floor(d / 3600);
//     var m = Math.floor(d % 3600 / 60);
//     var s = Math.floor(d % 3600 % 60);
//     var hDisplay = h > 0 ? h + (":") : "";
//     var mDisplay = m + (":");
//     var sDisplay = s ;
//     return hDisplay + mDisplay + sDisplay;
// }


  // CLOSE & END
  ///////////////////////////////////////////////////////////
  $('#closer').on('click',function(){
    stopFilm();
  });
  $('#videoplayer').on('ended',function(){
    stopFilm();
  });

  function stopFilm(){
    isPlaying = false;
    $('#player').fadeOut(fadeTime);
    $("#videoplayer")[0].pause();
  }


  // IDLE
  ///////////////////////////////////////////////////////////

  var timeoutHandle;
  resetTimer();
  $(document).on('mousemove', function(){ resetTimer(); });

  // Exit wait screen
  $('#waitScreen').on('mousemove',function (e) {
    $('#waitScreen').fadeOut(fadeTime);
    $(window).scrollTop(0);
    // Randomize index start
    var ranIndex = Math.floor(Math.random()*7);
    $('.theme').each(function(index,div){
      $(div).attr('index',ranIndex);
    });
  });

  // Timer
  function resetTimer(){
    clearTimeout(timeoutHandle);
    timeoutHandle = setTimeout(function(){
      // Go to wait screen
      if (isPlaying==false) {
        $('#waitScreen').fadeIn(fadeTime);
      }
    }, idleTime);
  }

  // MOUSE IDLE
  ///////////////////////////////////////////////////////////

  var timeoutHandle_Mouse;
  var relaxMode = false;
  resetMouseTimer();
  $(document).on('mousemove', function(){
    resetMouseTimer();
    if(relaxMode==true){
      relaxMode=false;
      $("#player").css('cursor','url(img/cursor.png),auto');
      $('#controls').fadeIn(fadeTime);
    }

  });
  // Timer
  function resetMouseTimer(){
    clearTimeout(timeoutHandle_Mouse);
    timeoutHandle_Mouse = setTimeout(function(){
      relaxMode=true;
      $("#player").css('cursor','none');
      $('#controls').fadeOut(fadeTime);
    }, mouse_idleTime);
  }





});
