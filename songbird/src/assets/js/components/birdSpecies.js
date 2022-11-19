const createSpecies = (parent, data, lang) => {
  parent.innerHTML = '';
  for (let index = 0; index < data.length; index++) {
    const parentElement = document.createElement('li');
    parentElement.classList.add('bird-species__item');

    const element = document.createElement('div');
    element.classList.add('bird-species__button');
    if (index === 0) {
      element.classList.add('bird-species__button-active');
    }
    element.classList.add(`bird-species__lang-${index}`);
    element.innerText = data[index][`bird-species__lang-${index}`][lang];

    parentElement.append(element);
    parent.append(parentElement);
  }
};

export default createSpecies;
