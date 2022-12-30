let thumbnail = video_player.querySelector(".thumbnail");
let thumb = false


document.addEventListener("keydown", (e) => {
  document.removeEventListener("keyup", e);

  if (controls.classList.contains("active")) {
  } else {
    controls.classList.add("active");
  }
  const tagName = document.activeElement.tagName.toLowerCase();
  if (tagName === "input") return;
  switch (e.key.toLowerCase()) {
    case "f":
      toggleFullScreenMode();
      break;
    case " ":
      e.preventDefault();
    case "k":
      var isVideoPaused = video_player.classList.contains("paused");
      isVideoPaused ? pauseVideo() : playVideo();
      break;

    case "m":
      if (volume_range.value != 0) {
        var VolumeRangeValue = volume_range.value / 100;
        let setVolume = localStorage.setItem("volume", VolumeRangeValue);
      }
      muteVolume();
      break;
    case "arrowup":
      e.preventDefault();
      if (numRoundMultiple(mainVideo.volume, 0.05)) {
        let volValue = numRoundMultiple(mainVideo.volume, 0.05);
        mainVideo.volume = volValue + 0.05;
        volume_range.value = volValue * 100 + 5;
        document.getElementById("vol-value").innerHTML =
          volume_range.value + "%";
      }
      break;
    case "arrowdown":
      e.preventDefault();
      if (mainVideo.volume > 0.06) {
        if (numRoundMultiple(mainVideo.volume, 0.05)) {
          let volValue = numRoundMultiple(mainVideo.volume, 0.05);
          mainVideo.volume = volValue - 0.05;
          volume_range.value = volValue * 100 - 5;
          document.getElementById("vol-value").innerHTML =
            volume_range.value + "%";
        }
      }
      break;
    case "arrowleft":
    case "j":
      mainVideo.currentTime -= 5;
      break;
    case "arrowright":
    case "l":
      mainVideo.currentTime += 5;
      break;
    case "c":
      closed_caption.click()
      break;
    case "i":
      if (settings.classList.contains("active")) {
        settings.classList.remove("active");
        settingsBtn.classList.remove("active");
      }
      mainVideo.requestPictureInPicture();
      break;
  }
});
document.addEventListener("keyup", (e) => {
  document.removeEventListener("keydown", e);
  if (settings.classList.contains("active")) {
  } else {
    if (mainVideo.paused) {
    } else {
      let count = 1;
      setInterval(() => {
        count--;
        if (count == 0) {
          controls.classList.remove("active");
        }
      }, 1000);
    }
  }
});

mainVideo.addEventListener("waiting", () => {
  loader.style.display = "block";
  controls.classList.add("active");
});
mainVideo.addEventListener("canplay", () => {
  loader.style.display = "none";
});

// Fonction d'arrondissement
function numRoundMultiple(x, y) {
  return Math.round(x / y) * y;
}
// Fonction pour lire
function playVideo() {
  play.style.display = "none";
  pause.style.display = "block";
  video_player.classList.add("paused");
  mainVideo.play();
}
fast_rewind.addEventListener('click', ()=>{
    mainVideo.currentTime -= 10
})
fast_forward.addEventListener('click', ()=>{
    mainVideo.currentTime += 10
})
mainVideo.addEventListener("click", () => {
  if (settingsBtn.classList.contains("active")) {
    settings.classList.remove("active");
    settingsBtn.classList.remove("active");
    let drop = document.querySelectorAll('.drop')
    if (!settings.classList.contains("active")) {
      drop.forEach((event)=>{
        if (event.classList.contains('active')) {
          event.classList.remove('active')
          menu_bar.style.marginLeft = "0";
        }
      })
    }
  } else {
    const isVideoPaused = video_player.classList.contains("paused");
    isVideoPaused ? pauseVideo() : playVideo();
  }
});

// Fonction pause
function pauseVideo() {
  play.style.display = "block";
  pause.style.display = "none";
  video_player.classList.remove("paused");
  mainVideo.pause();
}

play_pause.addEventListener("click", () => {
  const isVideoPaused = video_player.classList.contains("paused");

  isVideoPaused ? pauseVideo() : playVideo();
  if (settingsBtn.classList.contains("active")) {
    settings.classList.remove("active");
    settingsBtn.classList.remove("active");
    let drop = document.querySelectorAll('.drop')
    if (!settings.classList.contains("active")) {
      drop.forEach((event)=>{
        if (event.classList.contains('active')) {
          event.classList.remove('active')
          menu_bar.style.marginLeft = "0";
        }
      })
    }
  }
});

mainVideo.addEventListener("play", () => {
  playVideo();
});

mainVideo.addEventListener("pause", () => {
  pauseVideo();
});


// La durée totale de la vidéo
mainVideo.addEventListener("loadeddata", () => {
  totalDuration.innerHTML = formatDuration(mainVideo.duration);
});

// Le temps de lecture
mainVideo.addEventListener("timeupdate", (e) => {
  current.innerHTML = formatDuration(mainVideo.currentTime);
  let currentVideoTime = e.target.currentTime;
  let videoDuration = e.target.duration;
  // La barre de progression
  let progressWidth = (currentVideoTime / videoDuration) * 100;
  progressBar.style.width = `${progressWidth}%`;
});
const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});

function formatDuration(time) {
  const seconds = Math.floor(time % 60);
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600);
  if (hours === 0) {
    return `${minutes}:${leadingZeroFormatter.format(seconds)}`;
  } else {
    return `${hours}:${leadingZeroFormatter.format(
      minutes
    )}:${leadingZeroFormatter.format(seconds)}`;
  }
}
// Mettre à jour la durée de la vidéo en fonction de la longueur de la barre de progression
function scrub(e) {
  let videoDuration = mainVideo.duration;
  let progressWidthVal = progressArea.clientWidth;
  let ClickOffsetX = e.offsetX;

  mainVideo.currentTime = (ClickOffsetX / progressWidthVal) * videoDuration;
}

progressArea.addEventListener("pointerdown", () => {
  progressArea.addEventListener("click", scrub);
  progressArea.addEventListener("mousemove", scrub);
  progressArea.addEventListener("pointerup", () => {
    progressArea.removeEventListener("mousemove", scrub);
  });
  video_player.addEventListener("pointerup", () => {
    progressArea.removeEventListener("mousemove", scrub);
  });
});

// Le changement de volume
mainVideo.addEventListener("volumechange", () => {
  volume_range.value = mainVideo.volume * 100;
  volumechange();
});
function volumechange() {
  if (mainVideo.muted || mainVideo.volume === 0) {
    volume_range.value = 0;
    volumeMuted.style.display = "block";
    volumeLow.style.display = "none";
    volumeHigh.style.display = "none";
  } else if (mainVideo.volume >= 0.5) {
    volume_range.value = mainVideo.volume * 100;
    volumeMuted.style.display = "none";
    volumeLow.style.display = "none";
    volumeHigh.style.display = "block";
  } else {
    volume_range.value = mainVideo.volume * 100;
    volumeMuted.style.display = "none";
    volumeLow.style.display = "block";
    volumeHigh.style.display = "none";
  }
}

function muteVolume() {
  if (volume_range.value == 0) {
    let getVolume = localStorage.getItem("volume", `${mainVideo.volume}`);
    if (getVolume) {
      volume_range.value = getVolume * 100;
      mainVideo.volume = getVolume;
    } else {
      mainVideo.volume = 0.5;
      volume_range.value = 50;
    }
  } else {
    volume_range.value = 0;
    mainVideo.volume = 0;
  }
  document.getElementById("vol-value").value = volume_range.value;
  document.getElementById("vol-value").innerHTML =
    document.getElementById("vol-value").value + "%";
}
function rangeSlide(value) {
  document.getElementById("vol-value").innerHTML = value + "%";
}
volume_range.addEventListener("mousemove", () => {
  mainVideo.volume = volume_range.value / 100;
});
volume_range.addEventListener("click", () => {
  mainVideo.volume = volume_range.value / 100;
});
volume.addEventListener("click", () => {
  if (volume_range.value != 0) {
    var VolumeRangeValue = volume_range.value / 100;
    let setVolume = localStorage.setItem("volume", VolumeRangeValue);
  }
  muteVolume();
});

// Le survol de la souris
play_pause.addEventListener("mousemove", (e) => {
  playingAction.style.display = "block";

  if (mainVideo.paused) {
    playingAction.innerHTML = `Lire (k)`;
  } else {
    playingAction.innerHTML = `Pause (k)`;
  }
});
play_pause.addEventListener("mouseleave", () => {
  playingAction.style.display = "none";
});

fast_rewind.addEventListener("mousemove", (e) => {
  nextAction.classList.add('ten')
  nextAction.style.display = "block";

  nextAction.innerHTML = `Relire 10s`;
});
fast_rewind.addEventListener("mouseleave", () => {
  nextAction.style.display = "none";
  nextAction.classList.remove('ten')
});
fast_forward.addEventListener("mousemove", (e) => {
  nextAction.style.display = "block";

  nextAction.innerHTML = `Sauter 10s`;
});
fast_forward.addEventListener("mouseleave", () => {
  nextAction.style.display = "none";
});

volume.addEventListener("mousemove", (e) => {
  muteAction.style.display = "block";

  if (mainVideo.volume == 0) {
    muteAction.innerHTML = `Activer le son (m)`;
  } else {
    muteAction.innerHTML = `Couper le son (m)`;
  }
});
volume.addEventListener("mouseleave", () => {
  muteAction.style.display = "none";
});

closed_caption.addEventListener("mousemove", (e) => {
  ccAction.style.display = "block";

  ccAction.innerHTML = `Sous-titres (c)`;
});
closed_caption.addEventListener("mouseleave", () => {
  ccAction.style.display = "none";
});
closed_caption.addEventListener("click", () => {
  ccAction.style.display = "none";
});
settingsBtn.addEventListener("mousemove", (e) => {
  speedAction.style.display = "block";

  speedAction.innerHTML = `Reglages`;
});
settingsBtn.addEventListener("mouseleave", () => {
  speedAction.style.display = "none";
});
settingsBtn.addEventListener("click", () => {
  speedAction.style.display = "none";
});

picture_in_picture.addEventListener("mousemove", (e) => {
  pipAction.style.display = "block";

  pipAction.innerHTML = `Incrustation (i)`;
});
picture_in_picture.addEventListener("mouseleave", () => {
  pipAction.style.display = "none";
});

fullscreen.addEventListener("mousemove", (e) => {
  fullscreenAction.style.display = "block";

  fullscreenAction.innerHTML = `Plein écran (f)`;
});
fullscreen.addEventListener("mouseleave", () => {
  fullscreenAction.style.display = "none";
});

exitFullscreen.addEventListener("mousemove", (e) => {
  fullscreenAction.style.display = "block";

  fullscreenAction.innerHTML = `Quitter le plein écran (f)`;
});
exitFullscreen.addEventListener("mouseleave", () => {
  fullscreenAction.style.display = "none";
});

// Le temps au survol de la souris
progressArea.addEventListener("mousemove", (e) => {
  var progressWidthVal = progressArea.clientWidth;
  let x = e.offsetX;
  let videoDuration = mainVideo.duration;
  let progressTime = Math.floor((x / progressWidthVal) * videoDuration);
  let progressWidthValue = progressArea.clientWidth;
  if (thumb) {
    if (x >= progressWidthValue - 22) {
      x = progressWidthValue - 22;
    } else if (x <= 18) {
      x = 18;
    } else {
      x = e.offsetX;
    }
  }else{
    if (x >= progressWidthValue - 25) {
      x = progressWidthValue - 25;
    } else if (x <= 21) {
      x = 21;
    } else {
      x = e.offsetX;
    }
  }
  
  progressAreaTime.style.setProperty("--x", `${x}px`);
  progressAreaTime.style.display = "block";
  if (x >= progressWidthValue - 95) {
    x = progressWidthValue - 95;
  } else if (x <= 74) {
    x = 74;
  } else {
    x = e.offsetX;
  }

  progressAreaTime.innerHTML = `${formatDuration(progressTime)}`;

  thumbnail.style.setProperty("--x", `${x}px`);
  if (thumb) {
    thumbnail.style.display = "block";
    progressAreaTime.classList.add('thumb')
  }
  

  for (var item of thumbnails) {
    //
    var data = item.sec.find((x1) => x1.index === Math.floor(progressTime));

    // thumbnail found
    if (data) {
      if (item.data != undefined) {
        thumbnail.setAttribute(
          "style",
          `background-image: url(${item.data});background-position-x: ${data.backgroundPositionX}px;background-position-y: ${data.backgroundPositionY}px;--x: ${x}px;display: block;`
        );
        return;
      }
    }
  }
});
progressArea.addEventListener("mouseleave", () => {

  thumbnail.style.display = "none";
  progressAreaTime.style.display = "none";
});

// La lecture automatique
auto_play.addEventListener("click", () => {
  auto_play.classList.toggle("active");
  if (auto_play.classList.contains("active")) {
    auto_play.title = "La lecture automatique est activée";
  } else {
    auto_play.title = "La lecture automatique est desactivée";
  }
});
mainVideo.addEventListener("ended", () => {
    localStorage.setItem('duration<?= $getid; ', '0')
    if (auto_play.classList.contains('active')) {
        mainVideo.play()
    } else {
        replay()
    }
})
function replay() {
    controls.classList.add('active')
    if (track.length != 0) {
      caption_text.classList.remove("active")
    }    rePlay.style.display = "block";
    play.style.display = "none";
    pause.style.display = "none";
}
// Image en incrustation
picture_in_picture.addEventListener("click", () => {
  settings.classList.remove("active");
  settingsBtn.classList.remove("active");
  mainVideo.requestPictureInPicture();
});
// Plein écran
function toggleFullScreenMode() {
  if (document.fullscreenElement == null) {
    video_player.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}
function countCont() {
  let count = 2;
  count--;
  if (count <= 0 && video_player.classList.contains("openFullScreen")) {
    controls.classList.remove("active");
    video_player.style.cursor ='none'
  }  
}
document.addEventListener('fullscreenchange', fullscreenChange)
function fullscreenChange() {
  if (document.fullscreenElement == null) {
    if (video_player.classList.contains("openFullScreen")) {
      video_player.classList.remove("openFullScreen");
      fullscreen.style.display = "block";
      exitFullscreen.style.display = "none";
      controls.classList.add("active");
    }
  } else {
    if (!video_player.classList.contains("openFullScreen") && !settings.classList.contains("active") && !mainVideo.paused) {
      video_player.classList.add("openFullScreen");
      fullscreen.style.display = "none";
      exitFullscreen.style.display = "block";
       let int = setInterval(countCont, 1000);
      controls.addEventListener('mouseover', ()=>{
        clearInterval(int)
      })
      video_player.addEventListener('mousemove', ()=>{
        video_player.style.cursor ='default'
      })
    }
        
  }
}
video_player.addEventListener("dblclick", () => {
  settings.classList.remove("active");
  settingsBtn.classList.remove("active");

  let drop = document.querySelectorAll('.drop')
  if (!settings.classList.contains("active")) {
     drop.forEach((event)=>{
      if (event.classList.contains('active')) {
        event.classList.remove('active')
        menu_bar.style.marginLeft = "0";
      }
    })
  }
  toggleFullScreenMode();
});
fullscreen.addEventListener("click", () => {
  settings.classList.remove("active");
  settingsBtn.classList.remove("active");

  let drop = document.querySelectorAll('.drop')
  if (!settings.classList.contains("active")) {
     drop.forEach((event)=>{
      if (event.classList.contains('active')) {
        event.classList.remove('active')
        menu_bar.style.marginLeft = "0";
      }
    })
  }
  toggleFullScreenMode();
});
exitFullscreen.addEventListener("click", toggleFullScreenMode);

// Vitesse de lecture
settingsBtn.onclick = () => {
  settings.classList.toggle("active");
  settingsBtn.classList.toggle("active");
  let drop = document.querySelectorAll('.drop')
  if (!settings.classList.contains("active")) {
     drop.forEach((event)=>{
      if (event.classList.contains('active')) {
        event.classList.remove('active')
        menu_bar.style.marginLeft = "0";
      }
    })
  }
 
};
settings_item.forEach(function (btn) {
  btn.onclick = () => {
    menu_bar.style.marginLeft = "-220px";
    var drop = btn.getAttribute("data-drop");
    var sets_items = document.getElementById(drop);
    sets_items.classList.add("active");
  };
});
back_icon.forEach(function (btn) {
  btn.onclick = () => {
    let bk = btn.parentNode;
    let sets_items = bk.parentNode;
    menu_bar.style.marginLeft = "0";
    sets_items.classList.remove("active");
  };
});
playback.forEach((event) => {
  event.addEventListener("click", () => {
    if (removeActiveClasses(playback)) {
      event.classList.add("active");
    } else {
      event.classList.add("active");
      let speed = event.getAttribute("data-speed");
      mainVideo.playbackRate = speed;
    }
  });
});

qualities.forEach(event=>{
  let qualitie_html = `<li data-quality="${event.getAttribute('sizes')}"> <div class="icon check"></div> ${event.getAttribute('sizes')}p </li>`;
  if (event.getAttribute('sizes') >= 720) {
    qualitie_html = `<li data-quality="${event.getAttribute('sizes')}"> <div class="icon check"></div> ${event.getAttribute('sizes')}p HD </li>`;
  }
  quality_ul.insertAdjacentHTML("afterbegin", qualitie_html)
})

const quality = video_player.querySelectorAll("#quality-drop li");

quality.forEach((event) => {
  event.addEventListener("click", () => {
    let size = event.getAttribute("data-quality")
    removeActiveClasses(quality)
    event.classList.add("active");
    qualities.forEach(event =>{
      if (event.getAttribute('sizes') == size) {
        let video_current_time = mainVideo.currentTime;
        let video_source = event.src;

        mainVideo.src = video_source;
        mainVideo.currentTime = video_current_time;
        playVideo()
      }
    })
  });
});
if (tracks.length != 0) {
  captions_labels.insertAdjacentHTML("afterbegin", `<li class="active" data-track="Off"><div class="icon check"></div> Off </li>`)
  for (let i = 0; i < tracks.length; i++) {
    trackLi = `<li class="" data-track="${tracks[i].label}"><div class="icon check"></div>${tracks[i].label}</li>`;
    captions_labels.insertAdjacentHTML("beforeend", trackLi) 
  }
}
const caption = captions.querySelectorAll("ul li");
mainVideo.addEventListener("loadeddata", () => {
  setInterval(() => {
    let bufferedTime = mainVideo.buffered.end(0);
    let duration = mainVideo.duration;
    let width = (bufferedTime / duration) * 100;
    bufferedBar.style.width = `${width}%`;
  }, 500);
});
closed_caption.onclick = ()=>{
  closed_caption.classList.toggle('active')
  if (closed_caption.classList.contains('active')) {
    caption[1].click()
  }else{
    caption[0].click()
  }
  
}
caption.forEach((event) => {
  event.addEventListener("click", () => {
    removeActiveClasses(caption)
    event.classList.add("active")
    closed_caption.classList.add('active')
    changeCaption(event)
  });
});
let track = mainVideo.textTracks;

function changeCaption(lable) {
  let trackLable = lable.getAttribute("data-track");
  for (let i = 0; i < track.length; i++) {
    track[i].mode = "disabled";
    if (track[i].label == trackLable) {
      track[i].mode = "showing";
    }
    
  }
}
function removeActiveClasses(e) {
  e.forEach((event) => {
    event.classList.remove("active");
  });
}
let caption_text = video_player.querySelector(".caption_text")

for (let i = 0; i < track.length; i++) {
  track[i].addEventListener('cuechange', ()=>{
    if (track[i].mode = "showing") {
      if (track[i].activeCues[0]) {
        let span = `<span><mark>${track[i].activeCues[0].text}</mark></span>`
        caption_text.innerHTML = span;
      } else {
        caption_text.innerHTML = "";
      }
    }
  })
}
caption[0].onclick = ()=>{
  closed_caption.classList.remove('active')
  caption_text.innerHTML = "";
}
loopToggle.addEventListener("click", () => {
  loopToggle.classList.toggle("active");
  if (loopToggle.classList.contains("active")) {
    document.getElementById("loopOn").style.display = "block";
    document.getElementById("loopOff").style.display = "none";
    mainVideo.setAttribute("loop", "");
  } else {
    document.getElementById("loopOn").style.display = "none";
    document.getElementById("loopOff").style.display = "block";
    mainVideo.removeAttribute("loop");
  }
});
mainVideo.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
// Survol de la souris
if (!video_player.classList.contains("openFullScreen")) {
  video_player.addEventListener("mouseover", () => {
    controls.classList.add("active");
    if (track.length != 0) {
      caption_text.classList.remove("active")
    }
  });
  video_player.addEventListener("mouseleave", () => {
    if (video_player.classList.contains("paused")) {
      if (settingsBtn.classList.contains("active")) {
        controls.classList.add("active");
        if (track.length != 0) {
      caption_text.classList.remove("active")
    }
      } else {
        controls.classList.remove("active");
        if (track.length != 0) {
          caption_text.classList.add("active")
        }
      }
    } else {
      controls.classList.add("active");
      if (track.length != 0) {
      caption_text.classList.remove("active")
    }
    }
  });
} else {
  if (video_player.classList.contains("paused")) {
    if (settingsBtn.classList.contains("active")) {
      controls.classList.add("active");
      if (track.length != 0) {
      caption_text.classList.remove("active")
    }
    } else {
      controls.classList.remove("active");
      if (track.length != 0) {
        caption_text.classList.add("active")
      }
    }
  } else {
    controls.classList.add("active");
    if (track.length != 0) {
      caption_text.classList.remove("active")
    }
  }
}
// Pour les ecrans tectiles
video_player.addEventListener("touchstart", () => {
  controls.classList.add("active");
  if (track.length != 0) {
      caption_text.classList.remove("active")
    }
  setTimeout(() => {
    controls.classList.remove("active");
    if (track.length != 0) {
      caption_text.classList.add("active")
    }
  }, 8000);
});

video_player.addEventListener("touchmove", () => {
  if (video_player.classList.contains("paused")) {
    controls.classList.remove("active");
    if (track.length != 0) {
      caption_text.classList.add("active")
    }
  } else {
    controls.classList.add("active");
    if (track.length != 0) {
      caption_text.classList.remove("active")
    }
  }
});
window.addEventListener('unload', () => {
    mainVideo.play();
    var VolumeRangeValue = volume_range.value / 100;
    if (VolumeRangeValue != 0) {
        localStorage.setItem('volume', VolumeRangeValue);
    } else {
        localStorage.setItem('volume', 0.5);
    }
    localStorage.setItem('duration', `${mainVideo.currentTime}`);

    if (auto_play.classList.contains('active')) {
        localStorage.setItem('autoplay', 'active');
        auto_play.title = "La lecture automatique est activée";
    } else {
        auto_play.title = "La lecture automatique est desactivée";
        localStorage.setItem('autoplay', 'off');
    }



})
window.addEventListener('load', () => {
    let getVolume = localStorage.getItem('volume', `${mainVideo.volume}`);
    let getDuration = localStorage.getItem('duration', `${mainVideo.currentTime}`);
    let autoplay = localStorage.getItem('autoplay');
    
    if (autoplay) {
        auto_play.classList.replace('active', autoplay);
        if (auto_play.classList.contains('active')) {
            mainVideo.setAttribute('autoplay', '');
            auto_play.title = "La lecture automatique est activée";
        } else {
            controls.classList.add('active');
            if (track.length != 0) {
      caption_text.classList.remove("active")
    }
            if (track.length != 0) {
              caption_text.classList.remove("active")
            }
            mainVideo.removeAttribute('autoplay');
            auto_play.title = "La lecture automatique est desactivée";
        }
    }
    if (getVolume != 0) {
        mainVideo.volume = getVolume;
        volume_range.value = getVolume * 100;
        document.getElementById('vol-value').value = volume_range.value
        document.getElementById('vol-value').innerHTML = document.getElementById('vol-value').value + "%"
        mainVideo.currentTime = getDuration;
    } else if (getVolume != 0) {
        mainVideo.volume = getVolume;
        volume_range.value = getVolume * 100;
        document.getElementById('vol-value').value = volume_range.value
        document.getElementById('vol-value').innerHTML = document.getElementById('vol-value').value + "%"
    } else {
        mainVideo.volume = 0.5;
        volume_range.value = 50;
        document.getElementById('vol-value').value = volume_range.value
        document.getElementById('vol-value').innerHTML = document.getElementById('vol-value').value + "%"
    }
    volumechange()
    
})
var thumbnails = [];

var thumbnailWidth = 158;
var thumbnailHeight = 90;
var horizontalItemCount = 5;
var verticalItemCount = 5;

let preview_video = document.createElement('video');
preview_video.preload = "metadata"
preview_video.width = "250"
preview_video.height = "250"
preview_video.controls = true
preview_video.src = mainVideo.querySelector("source").src


preview_video.addEventListener("loadeddata", async function () {
  //
  preview_video.pause();

  //
  var count = 1;

  //
  var id = 1;

  //
  var x = 0,
    y = 0;

  //
  var array = [];

  //
  var duration = parseInt(preview_video.duration);

  //
  for (var i = 1; i <= duration; i++) {
    array.push(i);
  }

  //
  var canvas;

  //
  var i, j;

  for (i = 0, j = array.length; i < j; i += horizontalItemCount) {
    //
    for (var startIndex of array.slice(i, i + horizontalItemCount)) {
      //
      var backgroundPositionX = x * thumbnailWidth;

      //
      var backgroundPositionY = y * thumbnailHeight;

      //
      var item = thumbnails.find((x) => x.id === id);

      if (!item) {
        //

        //
        canvas = document.createElement("canvas");

        //
        canvas.width = thumbnailWidth * horizontalItemCount;
        canvas.height = thumbnailHeight * verticalItemCount;

        //
        thumbnails.push({
          id: id,
          canvas: canvas,
          sec: [
            {
              index: startIndex,
              backgroundPositionX: -backgroundPositionX,
              backgroundPositionY: -backgroundPositionY,
            },
          ],
        });
      } else {
        //

        //
        canvas = item.canvas;

        //
        item.sec.push({
          index: startIndex,
          backgroundPositionX: -backgroundPositionX,
          backgroundPositionY: -backgroundPositionY,
        });
      }

      //
      var context = canvas.getContext("2d");

      //
      preview_video.currentTime = startIndex;

      //
      await new Promise(function (resolve) {
        var event = function () {
          //
          context.drawImage(
            preview_video,
            backgroundPositionX,
            backgroundPositionY,
            thumbnailWidth,
            thumbnailHeight
          );

          //
          x++;

          // removing duplicate events
          preview_video.removeEventListener("canplay", event);

          //
          resolve();
        };

        //
        preview_video.addEventListener("canplay", event);
      });

      // 1 thumbnail is generated completely
      count++;
    }

    // reset x coordinate
    x = 0;

    // increase y coordinate
    y++;

    // checking for overflow
    if (count > horizontalItemCount * verticalItemCount) {
      //
      count = 1;

      //
      x = 0;

      //
      y = 0;

      //
      id++;
    }
  }
  // looping through thumbnail list to update thumbnail
  thumbnails.forEach(function (item) {
    // converting canvas to blob to get short url
    item.canvas.toBlob(
      (blob) => (item.data = URL.createObjectURL(blob)),
      "image/jpeg"
    );

    // deleting unused property
    delete item.canvas;
  });

  thumb = true
});