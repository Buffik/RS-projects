export const player = (parent, file) => {
  const audioPlayer = document.createElement('div');
  audioPlayer.classList.add('audio-player');

  //timeline
  const timeLineWrapper = document.createElement('div');
  timeLineWrapper.classList.add('timeline');
  const progressTemplate = document.createElement('div');
  progressTemplate.classList.add('progress');
  progressTemplate.style.width = '0%;';
  timeLineWrapper.append(progressTemplate);
  audioPlayer.appendChild(timeLineWrapper);

  //controls
  const controlsWrapper = document.createElement('div');
  controlsWrapper.classList.add('controls');

  //controls button wrapper
  const buttonPlayWrapper = document.createElement('div');
  buttonPlayWrapper.classList.add('play-container');
  //controls button
  const buttonPlay = document.createElement('div');
  buttonPlay.classList.add('toggle-play');
  buttonPlay.classList.add('play');
  buttonPlayWrapper.append(buttonPlay);
  controlsWrapper.appendChild(buttonPlayWrapper);

  //controls time wrapper
  const timeWrapper = document.createElement('div');
  timeWrapper.classList.add('time');
  //controls time current
  const audioCurrentDurationTemplate = document.createElement('div');
  audioCurrentDurationTemplate.classList.add('current');
  audioCurrentDurationTemplate.innerText = '0:00';
  //controls time divider
  const audioDividerTemplate = document.createElement('div');
  audioDividerTemplate.classList.add('divider');
  audioDividerTemplate.innerText = '/';
  //controls time length
  const audioDurationTemplate = document.createElement('div');
  audioDurationTemplate.classList.add('length');
  timeWrapper.append(
    audioCurrentDurationTemplate,
    audioDividerTemplate,
    audioDurationTemplate
  );
  controlsWrapper.appendChild(timeWrapper);

  //controls volume wrapper
  const audioVolumeWrapper = document.createElement('div');
  audioVolumeWrapper.classList.add('volume-container');
  //controls volume wrapper > button wrapper
  const buttonVolumeWrapper = document.createElement('div');
  buttonVolumeWrapper.classList.add('volume-button');
  //controls volume wrapper > button
  const buttonVolume = document.createElement('div');
  buttonVolume.classList.add('volume');
  buttonVolume.classList.add('icono-volumeMedium');
  buttonVolumeWrapper.append(buttonVolume);
  //controls volume wrapper > slider wrapper
  const sliderVolumeWrapper = document.createElement('div');
  sliderVolumeWrapper.classList.add('volume-slider');
  //controls volume wrapper > slider
  const sliderVolume = document.createElement('div');
  sliderVolume.classList.add('volume-percentage');
  sliderVolume.style.width = '55%;';
  sliderVolumeWrapper.append(sliderVolume);
  audioVolumeWrapper.append(buttonVolumeWrapper, sliderVolumeWrapper);
  controlsWrapper.appendChild(audioVolumeWrapper);
  audioPlayer.appendChild(controlsWrapper);

  //append into root
  parent.append(audioPlayer);

  const audio = new Audio(file);

  audio.addEventListener(
    'loadeddata',
    () => {
      audioDurationTemplate.textContent = getTimeCodeFromNum(audio.duration);
      audio.volume = 0.75;
    },
    false
  );

  //click on timeline to skip around
  timeLineWrapper.addEventListener(
    'click',
    (e) => {
      const timelineWidth = window.getComputedStyle(timeLineWrapper).width;
      const timeToSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration;
      audio.currentTime = timeToSeek;
    },
    false
  );

  //click volume slider to change volume
  sliderVolumeWrapper.addEventListener(
    'click',
    (e) => {
      const sliderWidth = window.getComputedStyle(sliderVolumeWrapper).width;
      const newVolume = e.offsetX / parseInt(sliderWidth);
      audio.volume = newVolume;
      sliderVolume.style.width = newVolume * 100 + '%';
    },
    false
  );

  //check audio percentage and update time accordingly
  setInterval(() => {
    progressTemplate.style.width =
      (audio.currentTime / audio.duration) * 100 + '%';
    audioCurrentDurationTemplate.textContent = getTimeCodeFromNum(
      audio.currentTime
    );
  }, 500);

  //toggle between playing and pausing on button click
  buttonPlay.addEventListener(
    'click',
    () => {
      if (audio.paused) {
        buttonPlay.classList.remove('play');
        buttonPlay.classList.add('pause');
        audio.play();
      } else {
        buttonPlay.classList.remove('pause');
        buttonPlay.classList.add('play');
        audio.pause();
      }
    },
    false
  );

  audio.addEventListener('ended', () => {
    buttonPlay.classList.remove('pause');
    buttonPlay.classList.add('play');
  });

  //turn 128 seconds into 2:08
  function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
      seconds % 60
    ).padStart(2, 0)}`;
  }
};
