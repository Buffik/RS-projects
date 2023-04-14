import birdsDataEn from '../../resources/birdsDataEng';
import birdsData from '../../resources/birdsDataRu';

const renderQuizBlock = (parent, data, lang) => {
  parent.innerHTML = '';

  //wrapper to list of names
  const listNamesWrapper = document.createElement('ul');
  listNamesWrapper.classList.add('names__wrapper');

  //list of names
  if (lang === 'ru') {
    birdsData[data].forEach((element, index) => {
      const birdName = document.createElement('li');
      birdName.classList.add('names__item');
      birdName.id = index;
      birdName.innerHTML = `<span class="names__btn"></span>${element['name']}`;
      listNamesWrapper.appendChild(birdName);
    });
  } else if (lang === 'eng') {
    birdsDataEn[data].forEach((element, index) => {
      const birdName = document.createElement('li');
      birdName.classList.add('names__item');
      birdName.id = index;
      birdName.innerHTML = `<span class="names__btn"></span>${element['name']}`;
      listNamesWrapper.appendChild(birdName);
    });
  }

  //render whole block
  parent.appendChild(listNamesWrapper);
};

export default renderQuizBlock;
