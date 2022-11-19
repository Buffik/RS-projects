import lang from '../resources/lang';
import setLang from './setLang';

export const options = document.querySelector('.lang');
const menuWrapper = document.querySelector('.menu__row');

if (!localStorage.getItem('lang')) {
  localStorage.setItem('lang', 'ru');
}

export const homeButton = document.createElement('li');
homeButton.classList.add('menu__item');
homeButton.classList.add('lang-header-home');

export const playButton = document.createElement('li');
playButton.classList.add('menu__item');
playButton.classList.add('lang-header-game');

menuWrapper.append(homeButton, playButton);

export const optionsField = document.createElement('select');
optionsField.classList.add('lang__list');

optionsField.value = localStorage.getItem('lang');
export let currentLanguage = optionsField.value;

export const langRu = document.createElement('option');
langRu.classList.add('lang__option');
langRu.classList.add('lang__ru');
langRu.value = 'ru';
langRu.innerText = 'ru';

export const langEng = document.createElement('option');
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
