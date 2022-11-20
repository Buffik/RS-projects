import '../../assets/sass/quiz.scss';
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
import birdsData from '../../assets/js/resources/birdsDataRu';
import birdsDataEn from '../../assets/js/resources/birdsDataRu';
import createSpecies from '../../assets/js/components/birdSpecies';
import { player } from '../../assets/js/components/player';
import birdNameToGuess from '../../assets/js/components/birdNameToGuess';

let boo = birdsData[0][0].audio;

/**********************render Header**********************/

let currentQuizLanguage = optionsField.value;

homeButton.innerHTML =
  localStorage.getItem('lang') === 'ru'
    ? `<a href="./index.html">${langHeader['header-home']['ru']}</a>`
    : `<a href="./index.html">${langHeader['header-home']['eng']}</a>`;

playButton.innerHTML =
  localStorage.getItem('lang') === 'ru'
    ? `<a href="#">${langHeader['header-game']['ru']}</a>`
    : `<a href="#">${langHeader['header-game']['eng']}</a>`;

/**********************render Header**********************/

/**********************render Birds species**********************/
const birdSpeciesTemplate = document.querySelector('.bird-species');

createSpecies(birdSpeciesTemplate, langBirdsSpecies, currentQuizLanguage);

/**********************render Birds species**********************/

/**********************render bird's name to guess**********************/

const audioParent = document.querySelector('.media');

birdNameToGuess(audioParent);

/**********************render bird's name to guess**********************/

/**********************render Audio**********************/

player(audioParent, boo);

/**********************render Audio**********************/

options.addEventListener('click', () => {
  let bufferLang = currentQuizLanguage;
  currentQuizLanguage = optionsField.value;
  setLang(currentQuizLanguage);
  if (bufferLang !== currentQuizLanguage) {
    homeButton.innerHTML = `<a href="./index.html">${langHeader['header-home'][currentQuizLanguage]}</a>`;
    playButton.innerHTML = `<a href="#">${langHeader['header-game'][currentQuizLanguage]}</a>`;
    createSpecies(birdSpeciesTemplate, langBirdsSpecies, currentQuizLanguage);
  }
});
