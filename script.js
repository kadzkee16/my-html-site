const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");
const progress = document.getElementById("progress");
const currentTimeText = document.getElementById("current-time");
const durationText = document.getElementById("duration");
const volumeSlider = document.getElementById("volume-slider");
const trackImg = document.querySelector(".track-info img");
const trackTitle = document.querySelector(".track-info strong");
const trackArtist = document.querySelector(".track-info p");

let isPlaying = false;
let playlist = [
  { src: "blinding-lights.mp3", title: "Blinding Lights", artist: "The Weeknd", cover: "blinding-lights.jpg" },
  { src: "i-feel-it-coming.mp3", title: "I Feel It Coming", artist: "The Weeknd", cover: "i-feel.JPG" },
  { src: "trinix-aje-feat-tayc-khaid.mp3", title: "AJE", artist: "Trinix feat Tayc & Khaid", cover: "trinix-aje-feat-tayc-khaid.jpg" },
  { src: "tonight-pinkpantheress.mp3", title: "Tonight", artist: "PinkPantheress", cover: "tonight-pinkpantheress copie.JPG" },
  { src: "PinkPantheress - Stars.mp3", title: "Stars", artist: "PinkPantheress", cover: "PinkPantheress - Stars.jpg" },
  { src: "No Limit-Gazo- Vacra-LDC.mp3", title: "No Limit", artist: "Gazo, Vacra, LDC", cover: "No Limit-gazo-Vacra-ldc.jpg" },
  { src: "LAlgérino-feat Franglish-&-Alonzo - La Gari.mp3", title: "La Gari", artist: "L'Algérino feat Franglish & Alonzo", cover: "LAlgérino-feat Franglish-&-Alonzo - La Gari.jpg" }
];

let currentTrackIndex = 0;

function playTrack(index) {
  const track = playlist[index];
  if (!track) return;

  audio.src = track.src;
  trackImg.src = track.cover;
  trackTitle.textContent = track.title;
  trackArtist.textContent = track.artist;
  audio.play();
  playBtn.classList.replace("fa-play-circle", "fa-pause-circle");
  isPlaying = true;
  currentTrackIndex = index;
}

playBtn.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play();
    playBtn.classList.replace("fa-play-circle", "fa-pause-circle");
    isPlaying = true;
  } else {
    audio.pause();
    playBtn.classList.replace("fa-pause-circle", "fa-play-circle");
    isPlaying = false;
  }
});

audio.addEventListener("timeupdate", () => {
  if (!isNaN(audio.duration)) {
    progress.value = (audio.currentTime / audio.duration) * 100;
    currentTimeText.textContent = formatTime(audio.currentTime);
    durationText.textContent = formatTime(audio.duration);
  }
});

progress.addEventListener("input", () => {
  if (!isNaN(audio.duration)) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

volumeSlider.addEventListener("input", () => {
  audio.volume = parseFloat(volumeSlider.value);
});

// التالي عند الانتهاء
audio.addEventListener("ended", () => {
  currentTrackIndex++;
  if (currentTrackIndex >= playlist.length) currentTrackIndex = 0;
  playTrack(currentTrackIndex);
});

// space key toggle
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    if (audio.paused) {
      audio.play();
      playBtn.classList.replace("fa-play-circle", "fa-pause-circle");
      isPlaying = true;
    } else {
      audio.pause();
      playBtn.classList.replace("fa-pause-circle", "fa-play-circle");
      isPlaying = false;
    }
  }
});

// helper
function formatTime(sec) {
  const min = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${min}:${seconds}`;
}

// ابدأ بأول أغنية
playTrack(currentTrackIndex);
