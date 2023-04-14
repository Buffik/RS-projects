export const birdNameTemplate = document.createElement('div');

export const birdNameToGuess = (parent, name = '**********') => {
  birdNameTemplate.classList.add('media__bird-name');
  birdNameTemplate.innerText = name;
  parent.appendChild(birdNameTemplate);
};
