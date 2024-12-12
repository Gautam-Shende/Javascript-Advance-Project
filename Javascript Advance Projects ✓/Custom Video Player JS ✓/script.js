const video = document.getElementById('video');
const playPauseBtn = document.getElementById('play-pause');
const seekBar = document.getElementById('seek-bar');
const volumeBtn = document.getElementById('volume-btn');
const volumeBar = document.getElementById('volume-bar');
const timeDisplay = document.getElementById('time-display');
const fullscreenBtn = document.getElementById('fullscreen-btn');

// Play/Pause Toggle
playPauseBtn.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playPauseBtn.innerHTML = '<i class="material-icons">pause</i>';
    } else {
        video.pause();
        playPauseBtn.innerHTML = '<i class="material-icons">play_arrow</i>';
    }
});

// Update Seek Bar and Time Display
video.addEventListener('timeupdate', () => {
    const value = (video.currentTime / video.duration) * 100;
    seekBar.value = value;

    const currentMinutes = Math.floor(video.currentTime / 60);
    const currentSeconds = Math.floor(video.currentTime % 60);
    const durationMinutes = Math.floor(video.duration / 60);
    const durationSeconds = Math.floor(video.duration % 60);

    timeDisplay.textContent = `${formatTime(currentMinutes)}:${formatTime(currentSeconds)} / ${formatTime(durationMinutes)}:${formatTime(durationSeconds)}`;
});

// Seek Video
seekBar.addEventListener('input', () => {
    const time = (seekBar.value / 100) * video.duration;
    video.currentTime = time;
});

// Volume Control
volumeBtn.addEventListener('click', () => {
    if (video.muted) {
        video.muted = false;
        volumeBtn.innerHTML = '<i class="material-icons">volume_up</i>';
    } else {
        video.muted = true;
        volumeBtn.innerHTML = '<i class="material-icons">volume_off</i>';
    }
});

volumeBar.addEventListener('input', () => {
    video.volume = volumeBar.value / 100;
});

// Fullscreen Toggle
fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        video.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

// Format Time Display
function formatTime(time) {
    return time < 10 ? '0' + time : time;
}
