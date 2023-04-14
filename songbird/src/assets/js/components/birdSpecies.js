const createSpecies = (parent, data, lang, id) => {
  parent.innerHTML = '';
  for (let index = 0; index < data.length; index++) {
    const parentElement = document.createElement('li');
    parentElement.classList.add('bird-species__item');

    const element = document.createElement('div');
    element.classList.add('bird-species__button');
    if (index === id) {
      element.classList.add('bird-species__button-active');
    }
    element.classList.add(`bird-species__lang-${index}`);
    element.innerText = data[index][`bird-species__lang-${index}`][lang];
    element.id = index;

    parentElement.append(element);
    parent.append(parentElement);
  }
};

export default createSpecies;
