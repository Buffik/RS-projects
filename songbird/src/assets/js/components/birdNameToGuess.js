const birdNameToGuess = (parent, name = '**********') => {
  const birdNameTemplate = document.createElement('div');
  birdNameTemplate.classList.add('media__bird-name');
  birdNameTemplate.innerText = name;
  parent.appendChild(birdNameTemplate);
};

export default birdNameToGuess;
