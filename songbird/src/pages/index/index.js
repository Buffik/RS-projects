import '../../assets/sass/index.scss';
import backgroundVideo from '../../assets/media/video/background_video.mp4';
import '../../assets/js/components/header';
import {
  options,
  homeButton,
  playButton,
  langRu,
  langEng,
  optionsField,
} from '../../assets/js/components/header';
import { langHeader, langBirdsSpecies } from '../../assets/js/resources/lang';
import setLang from '../../assets/js/components/setLang';

let currentHeaderLanguage = optionsField.value;

homeButton.innerHTML =
  localStorage.getItem('lang') === 'ru'
    ? `<a href="#">${langHeader['header-home']['ru']}</a>`
    : `<a href="#">${langHeader['header-home']['eng']}</a>`;

playButton.innerHTML =
  localStorage.getItem('lang') === 'ru'
    ? `<a href="./quiz.html">${langHeader['header-game']['ru']}</a>`
    : `<a href="./quiz.html">${langHeader['header-game']['eng']}</a>`;

options.addEventListener('click', () => {
  let bufferLang = currentHeaderLanguage;
  currentHeaderLanguage = optionsField.value;
  setLang(currentHeaderLanguage);
  if (bufferLang !== currentHeaderLanguage) {
    homeButton.innerHTML = `<a href="#">${langHeader['header-home'][currentHeaderLanguage]}</a>`;
    playButton.innerHTML = `<a href="./quiz.html">${langHeader['header-game'][currentHeaderLanguage]}</a>`;
  }
});

const videoWrapper = document.createElement('div');
videoWrapper.classList.add('background__wrapper');

const videoBlock = document.createElement('video');
videoBlock.autoplay = true;
videoBlock.muted = true;
videoBlock.loop = true;
videoBlock.src = backgroundVideo;
videoBlock.type = 'video/mp4';
videoBlock.classList.add('background__video');

videoWrapper.append(videoBlock);
document.body.prepend(videoWrapper);
