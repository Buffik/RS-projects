import birdsDataEn from '../../resources/birdsDataEng';
import birdsData from '../../resources/birdsDataRu';
import renderCurrentBird from './renderCurrentBird';

const renderCurrentBirdWrapper = (parent, data, id, lang, hide) => {
  let currentState = hide;
  let currentLang = lang;
  let currentData = data;
  let currentId = id;

  parent.innerHTML = '';

  const cardWrapper = document.createElement('div');
  cardWrapper.classList.add('card__wrapper');

  const instructionText = document.createElement('p');
  instructionText.classList.add('card__instruction-text');
  instructionText.innerHTML =
    lang === 'ru'
      ? `<span>Послушайте плеер. </span> <br> <span>Выберите птицу из списка</span>`
      : `<span>Listen songbird. </span> <br> <span>Choose bird's name</span>`;
  instructionText.style.display = currentState ? 'none' : 'block';

  const cardBody = document.createElement('div');
  cardBody.classList.add('card__body-wrapper');

  renderCurrentBird(
    cardBody,
    currentData,
    currentId,
    currentLang,
    currentState
  );

  cardWrapper.append(instructionText, cardBody);

  parent.append(cardWrapper);
};

export default renderCurrentBirdWrapper;
