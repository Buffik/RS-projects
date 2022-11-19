import '../../assets/sass/index.scss';
import backgroundVideo from '../../assets/media/video/background_video.mp4';
import lang from '../../assets/js/resources/lang';
import setLang from '../../assets/js/components/setLang';

const options = document.querySelector('.lang');
const menuWrapper = document.querySelector('.menu__row');

if (!localStorage.getItem('lang')) {
  localStorage.setItem('lang', 'ru');
}

const homeButton = document.createElement('li');
homeButton.classList.add('menu__item');
homeButton.classList.add('lang-header-home');
homeButton.innerHTML =
  localStorage.getItem('lang') === 'ru'
    ? `<a href="#">${lang['header-home']['ru']}</a>`
    : `<a href="#">${lang['header-home']['eng']}</a>`;

const playButton = document.createElement('li');
playButton.classList.add('menu__item');
playButton.classList.add('lang-header-game');
playButton.innerHTML =
  localStorage.getItem('lang') === 'ru'
    ? `<a href="#">${lang['header-game']['ru']}</a>`
    : `<a href="#">${lang['header-game']['eng']}</a>`;

menuWrapper.append(homeButton, playButton);

const optionsField = document.createElement('select');
optionsField.classList.add('lang__list');

optionsField.value = localStorage.getItem('lang');
let currentLanguage = optionsField.value;

const langRu = document.createElement('option');
langRu.classList.add('lang__option');
langRu.classList.add('lang__ru');
langRu.value = 'ru';
langRu.innerText = 'ru';

const langEng = document.createElement('option');
langEng.classList.add('lang__option');
langEng.classList.add('lang__eng');
langEng.value = 'eng';
langEng.innerText = 'eng';

[langRu, langEng].forEach((node) => {
  if (localStorage.getItem('lang') !== 'ru') {
    langRu.selected = false;
    langEng.selected = true;
  } else {
    langRu.selected = true;
    langEng.selected = false;
  }
});

optionsField.append(langRu, langEng);

options.append(optionsField);

options.addEventListener('click', () => {
  let bufferLang = currentLanguage;
  currentLanguage = optionsField.value;
  setLang(currentLanguage);
  if (bufferLang !== currentLanguage) {
    homeButton.innerHTML = `<a href="#">${lang['header-home'][currentLanguage]}</a>`;
    playButton.innerHTML = `<a href="#">${lang['header-game'][currentLanguage]}</a>`;
  }
  console.log(localStorage.getItem('lang'));
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
