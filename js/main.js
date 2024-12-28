let player = {
    element: $("#audio1")[0],
    play_mode: null,
    mediaPath: 'audio/',
    tracks: {
      "maher": "maher",
      "shateri": "036042",
      "sherim" : "036043",
    },
    translation_tracks: {
      "fa": "fa",
      "en": "en",
    },
    get_settings: function() {
      return {
        ghari: $("#ghari option:selected").val(),
        language: $("#langueg option:selected").val(),
        must_play_translation: $("#myCheck").prop('checked'),
      };
    },
    is_playing: function() {
      return (player.element.duration > 0 && !player.element.paused)
    },
    play: function() {
      player.element.play(); // Start playing
      $("#playButton").hide();
      $("#pauseButton").show();
    },
    pause: function() {
      player.element.pause(); // Stop playing
      $("#playButton").show();
      $("#pauseButton").hide();
    },
    stop: function() {
      player.pause(); // Stop playing
      player.element.currentTime = 0; // Reset time
    },
    load_ghari: function(ghari) {
      player.element.src = player.mediaPath + player.tracks[ghari] + ".mp3"; 
    },
    load_translation: function(lang) {
      player.element.src = player.mediaPath + player.translation_tracks[lang] + ".mp3";
    }
  };
  $("#ghari").on('change', function(e) {
    player.stop();
  });
  $("#langueg").on('change', function(e) {
    let settings = player.get_settings();
    if(settings.language == "en"){
      $("#txtCenter").html("It is not allowable for the sun to reach the moon, nor does the night overtake the day, but each, in an orbit, is swimming");   
    }else if(settings.language == "fa"){
      $("#txtCenter").html(" نه خورشید را سزا است که به ماه رسد، و نه شب بر روز پیشی می‌گیرد؛ و هر کدام در مسیر خود شناورند.");   
    }
  });
  $("#myCheck").on('change', function(e) {
  });
  $("#playButton").on('click', function(e) {
    if (player.play_mode == null) {
      player.play_mode = "ghari";
      let settings = player.get_settings();
      player.load_ghari(settings.ghari);
      player.play();
    } else if (player.element.currentTime > 0) {
      player.play();
    }
    else{
      let settings = player.get_settings();
      player.load_ghari(settings.ghari);
      player.play();
    }
  });
  $("#pauseButton").on('click', function(e) {
    player.pause();
  });
  $('#audio1').on('ended', function() {
    if (player.play_mode == 'ghari') {
      let settings = player.get_settings();
      if (settings.must_play_translation ) {
        player.stop();
        player.play_mode = "translation";
        player.load_translation(settings.language);
        player.play();
      }else{
        $("#playButton").show();
        $("#pauseButton").hide();
        player.play_mode = null;
      }
    } else if (player.play_mode == 'translation') {
      $("#playButton").show();
      $("#pauseButton").hide();
      player.play_mode = null;
    }
  });