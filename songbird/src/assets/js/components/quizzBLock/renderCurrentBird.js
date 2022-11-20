import birdsDataEn from '../../resources/birdsDataEng';
import birdsData from '../../resources/birdsDataRu';
import { player } from '../player';

const renderCurrentBird = (parent, data, id = 0, lang, hide) => {
  if (!hide) {
    return;
  }

  const birdLowWrap = document.createElement('div');
  birdLowWrap.classList.add('bird__low-wrap');

  const birdImg = document.createElement('div');
  birdImg.classList.add('card__bird-img');
  birdImg.style.backgroundImage = `url(${birdsData[data][id]['image']})`;

  const listGroupWrapper = document.createElement('ul');
  listGroupWrapper.classList.add('card__list-group-wrapper');

  const listGroupName = document.createElement('li');
  listGroupName.classList.add('card__list-group-name');
  listGroupName.innerText =
    lang === 'ru'
      ? `${birdsData[data][id]['name']}`
      : `${birdsDataEn[data][id]['name']}`;

  const listGroupLatinName = document.createElement('li');
  listGroupLatinName.classList.add('card__list-group-latin-name');
  listGroupLatinName.innerText = `${birdsData[data][id]['species']}`;

  listGroupWrapper.append(listGroupName, listGroupLatinName);

  player(listGroupWrapper, birdsData[data][id]['audio'], 'card');

  const birdDescription = document.createElement('div');
  birdDescription.classList.add('card__bird-description');
  birdDescription.innerText =
    lang === 'ru'
      ? `${birdsData[data][id]['description']}`
      : `${birdsDataEn[data][id]['description']}`;

  birdLowWrap.append(birdImg, listGroupWrapper);
  parent.append(birdLowWrap, birdDescription);
};

export default renderCurrentBird;
