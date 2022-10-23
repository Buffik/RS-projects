import renderElements from './DOM_API/renderElements';
import constants from './constants';
import renderField from './DOM_API/renderField';
import getMatrix from './DOM_API/positioning/getMatrix';
import setStyles from './DOM_API/positioning/setStyles';
import setPosition from './DOM_API/positioning/setPosition';
import shuffleArray from './DOM_API/positioning/shuffleArray';
import findCoordinates from './DOM_API/positioning/findCoordinates';
import isValidToRelocate from './DOM_API/positioning/isValidToRelocate';
import relocate from './DOM_API/positioning/relocate';
import isWon from './DOM_API/positioning/isWon';
import isValidMatrix from './DOM_API/isValidMatrix';

const fieldSizes = constants.fieldSizes;
let startFieldSize = 4;
let itemNodes = [];
let wrapper = document.createElement('div');
let field = document.createElement('div');
let optionField = document.createElement('select');
let shuffleBtn = document.createElement('button');
let container = document.createElement('div');
let countTemplate = document.createElement('div');
let timerTemplate = document.createElement('div');
let stepsCount = 0;
let itemsState = [];
let winState = [];

//*****************Timer*****************/

let secs,
  now,
  timer,
  mins = 0;

function time(node) {
  secs = Math.floor((Date.now() - now) / 1000);
  if (secs == 60) {
    now = Date.now();
    mins++;
  }
  if (secs < 10) {
    secs = '0' + secs;
  }

  timerTemplate.innerHTML = `Time: ${mins < 10 ? '0' + mins : mins} : ${secs}`;
}

//*****************Timer*****************/

//*****************Rendering start field***************/

container.classList.add('container');

countTemplate.classList.add('template__count');
countTemplate.innerText = `Moves: ${stepsCount}`;

timerTemplate.classList.add('template__timer');
timerTemplate.innerText = `Time: 00:00`;

container.append(countTemplate, timerTemplate);
wrapper.append(container);

let buttonValues = new Array(startFieldSize * startFieldSize)
  .fill(0)
  .map((elem, index) => index + 1);

wrapper.classList.add('wrapper');
document.body.append(wrapper);

field.classList.add('field');
wrapper.append(field);

for (let i = 0; i < buttonValues.length; i++) {
  const element = buttonValues[i];
  const btn = document.createElement('button');
  btn.classList.add('item');
  btn.classList.add('item_' + startFieldSize + 'x' + startFieldSize);
  btn.dataset.itemPosition = element;
  btn.innerText = element;
  field.append(btn);
  itemNodes.push(btn);
}
let matrix = getMatrix(
  itemNodes.map((elem) => Number(elem.dataset.itemPosition)),
  startFieldSize
);

itemNodes[itemNodes.length - 1].style.display = 'none';

matrix = getMatrix(shuffleArray(buttonValues), startFieldSize);

optionField.classList.add('options__field');
wrapper.append(optionField);

renderElements(optionField, 'option', 'options__option', fieldSizes);

shuffleBtn.innerText = 'shuffle and start';
shuffleBtn.classList.add('btn', 'btn__shuffle');
wrapper.append(shuffleBtn);

setPosition(matrix, itemNodes);

//*****************Rendering start field***************/

//*****************Game's logic***************/

shuffleBtn.addEventListener('click', (event) => {
  let selectedValue = optionField.value;
  let buttonValues = new Array(selectedValue * selectedValue)
    .fill(0)
    .map((elem, index) => index + 1);
  winState = buttonValues;
  let renderedItemNodes = renderField(field, selectedValue, buttonValues);
  itemsState = renderedItemNodes;
  itemsState[itemsState.length - 1].style.display = 'none';
  matrix = getMatrix(shuffleArray(buttonValues), selectedValue);
  while (!isValidMatrix(matrix, selectedValue)) {
    matrix = getMatrix(shuffleArray(buttonValues), selectedValue);
  }
  setPosition(matrix, itemsState);
  stepsCount = 0;
  now = Date.now();
  mins = 0;
  timer = setInterval(time);
});

field.addEventListener('click', (event) => {
  const buttonNode = event.target.closest('.item');
  if (!buttonNode) {
    return;
  }
  let emptyItem = optionField.value ** 2;
  const btnNumber = Number(buttonNode.dataset.itemPosition);
  const btnCoordinates = findCoordinates(btnNumber, matrix);
  const emptyItemCoordinates = findCoordinates(emptyItem, matrix);
  const isValid = isValidToRelocate(btnCoordinates, emptyItemCoordinates);

  console.log(isValid);

  if (isValid) {
    relocate(emptyItemCoordinates, btnCoordinates, matrix);
    setPosition(matrix, itemsState);
    stepsCount++;
    if (isWon(matrix, winState)) {
      let endTime = timerTemplate.innerHTML;
      console.log('winNNNNNERRRRRRRRRRRRRRREEEEEEEEE', endTime);
    }
    countTemplate.innerText = `Moves: ${stepsCount}`;
  }
});

//*****************Game's logic***************/
