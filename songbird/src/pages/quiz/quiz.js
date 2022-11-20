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
import birdsDataEn from '../../assets/js/resources/birdsDataEng';
import createSpecies from '../../assets/js/components/birdSpecies';
import { player } from '../../assets/js/components/player';
import {
  birdNameTemplate,
  birdNameToGuess,
} from '../../assets/js/components/birdNameToGuess';
import renderQuizBlock from '../../assets/js/components/quizzBLock/quizBlock';
import renderCurrentBirdWrapper from '../../assets/js/components/quizzBLock/renderCurrentBirdWrapper';
import { quizButton } from '../../assets/js/components/quizzBLock/quizButton';
import randomInteger from '../../assets/js/components/getRandomNumber';
import falseSound from '../../assets/media/sound/wrong.mp3';
import trueSound from '../../assets/media/sound/win.mp3';
import imagePlaceHolder from '../../assets/media/images/bird_random.jpg';
import { scoreTemplate } from '../../assets/js/components/quizzBLock/scoreCount';

/**********************render Header**********************/

let currentQuizLanguage = optionsField.value;
let currentLevel = 0;
let currentScore = 0;

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

createSpecies(
  birdSpeciesTemplate,
  langBirdsSpecies,
  currentQuizLanguage,
  currentLevel
);

/**********************render Birds species**********************/

/**********************render bird's name to guess**********************/

let currentData =
  currentQuizLanguage === 'ru'
    ? birdsData[currentLevel]
    : birdsDataEn[currentLevel];

let randomNumber = randomInteger(0, currentData.length - 1);

const audioParent = document.querySelector('.media');

birdNameToGuess(audioParent);

/**********************render bird's name to guess**********************/

/**********************render Audio**********************/

player(audioParent, currentData[randomNumber]['audio'], 'main');

/**********************render Audio**********************/

/**********************render game block**********************/

const quizWrapper = document.querySelector('.quiz__wrapper');
const birdNamesWrapper = document.querySelector('.names');
const cardTemplate = document.querySelector('.card');

let areInstructionsHide = false;

renderQuizBlock(birdNamesWrapper, currentLevel, currentQuizLanguage);

renderCurrentBirdWrapper(
  cardTemplate,
  currentLevel,
  0,
  currentQuizLanguage,
  areInstructionsHide
);

quizButton.innerText =
  currentQuizLanguage === 'ru' ? 'Следующий уровень' : 'Next level';

quizWrapper.appendChild(quizButton);

quizWrapper.append(scoreTemplate);

scoreTemplate.innerText =
  currentQuizLanguage === 'ru'
    ? `Очки: ${currentScore}`
    : `Score: ${currentScore}`;

/**********************render game block BY LANGUAGE**********************/
let currentBirdToGuess = currentData[randomNumber]['name'];

options.addEventListener('click', () => {
  let bufferLang = currentQuizLanguage;
  currentQuizLanguage = optionsField.value;
  setLang(currentQuizLanguage);
  if (bufferLang !== currentQuizLanguage) {
    homeButton.innerHTML = `<a href="./index.html">${langHeader['header-home'][currentQuizLanguage]}</a>`;
    playButton.innerHTML = `<a href="#">${langHeader['header-game'][currentQuizLanguage]}</a>`;

    currentData =
      currentQuizLanguage === 'ru'
        ? birdsData[currentLevel]
        : birdsDataEn[currentLevel];

    currentBirdToGuess = currentData[randomNumber]['name'];

    createSpecies(
      birdSpeciesTemplate,
      langBirdsSpecies,
      currentQuizLanguage,
      currentLevel
    );

    renderQuizBlock(birdNamesWrapper, currentLevel, currentQuizLanguage);

    renderCurrentBirdWrapper(
      cardTemplate,
      currentLevel,
      0,
      currentQuizLanguage,
      areInstructionsHide
    );

    quizButton.innerText =
      currentQuizLanguage === 'ru' ? 'Следующий уровень' : 'Next level';
    quizWrapper.appendChild(quizButton);

    quizWrapper.append(scoreTemplate);

    scoreTemplate.innerText =
      currentQuizLanguage === 'ru'
        ? `Очки: ${currentScore}`
        : `Score: ${currentScore}`;
  }
});

/**********************render game block BY LANGUAGE**********************/

/**********************Game logic**********************/

let currentAnswer = false;
let tempScore = 5;
const guessedBirdImg = document.querySelector('.random-bird__img');

quizWrapper.addEventListener('click', (event) => {
  if (event.target.classList.value !== 'names__item') {
    return;
  }

  areInstructionsHide = true;

  let currentTargetTemplateInnerText = event.target.innerText;
  let currentTargetTemplateId = event.target.id;

  renderCurrentBirdWrapper(
    cardTemplate,
    currentLevel,
    currentTargetTemplateId,
    currentQuizLanguage,
    areInstructionsHide
  );

  if (currentTargetTemplateInnerText !== currentBirdToGuess && !currentAnswer) {
    event.target.firstChild.classList.add('names__btn-false');
    const wrongSound = new Audio(falseSound);
    wrongSound.volume = 0.3;
    wrongSound.play();

    if (tempScore < 1) {
      tempScore = 0;
    } else if (event.target.classList.value !== 'names__btn-false') {
      tempScore -= 1;
      console.log(tempScore);
    }
  } else if (
    currentTargetTemplateInnerText === currentBirdToGuess &&
    !currentAnswer
  ) {
    const rightSound = new Audio(trueSound);
    rightSound.volume = 0.5;
    rightSound.play();

    event.target.firstChild.classList.add('names__btn-true');

    guessedBirdImg.style.backgroundImage = `url(${currentData[randomNumber]['image']})`;

    currentAnswer = true;

    birdNameTemplate.innerText = currentBirdToGuess;

    currentScore += tempScore;

    tempScore = 5;

    scoreTemplate.innerText =
      currentQuizLanguage === 'ru'
        ? `Очки: ${currentScore}`
        : `Score: ${currentScore}`;

    if (currentLevel < 5) {
      quizButton.disabled = false;
      quizButton.classList.add('quiz__button-next');
    } else {
      quizButton.disabled = false;
      quizButton.classList.add('quiz__button-next');
      quizButton.onclick = function () {
        location.replace('./result.html');
      };
    }

    const changeLevel = (event) => {
      areInstructionsHide = false;
      currentAnswer = false;
      if (currentLevel < 5) {
        currentLevel = currentLevel + 1;
      }

      randomNumber = randomInteger(0, currentData.length - 1);

      currentData =
        currentQuizLanguage === 'ru'
          ? birdsData[currentLevel]
          : birdsDataEn[currentLevel];

      currentBirdToGuess = currentData[randomNumber]['name'];

      createSpecies(
        birdSpeciesTemplate,
        langBirdsSpecies,
        currentQuizLanguage,
        currentLevel
      );

      birdNameToGuess(audioParent);

      guessedBirdImg.style.backgroundImage = `url(${imagePlaceHolder})`;

      player(audioParent, currentData[randomNumber]['audio'], 'main');

      renderQuizBlock(birdNamesWrapper, currentLevel, currentQuizLanguage);

      renderCurrentBirdWrapper(
        cardTemplate,
        currentLevel,
        currentTargetTemplateId,
        currentQuizLanguage,
        areInstructionsHide
      );
      quizButton.disabled = true;
      quizButton.classList.remove('quiz__button-next');
      localStorage.setItem(`score`, `${currentScore}`);
      quizButton.removeEventListener('click', changeLevel);
    };

    quizButton.addEventListener('click', changeLevel);
  }
});

/**********************Game logic**********************/
