import renderElements from './DOM_API/renderElements';
import constants from './constants';
import renderField from './DOM_API/renderField';
import getMatrix from './DOM_API/positioning/getMatrix';
import setStyles from './DOM_API/positioning/setStyles';
import setPosition from './DOM_API/positioning/setPosition';
import shuffleArray from './DOM_API/positioning/shuffleArray';

const fieldSizes = constants.fieldSizes;
let startFieldSize = 4;
let itemNodes = [];
let wrapper = document.createElement('div');
let field = document.createElement('div');
let optionField = document.createElement('select');
let shuffleBtn = document.createElement('button');

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

optionField.classList.add('options__field');
wrapper.append(optionField);

renderElements(optionField, 'option', 'options__option', fieldSizes);

shuffleBtn.innerText = 'shuffle and start';
shuffleBtn.classList.add('btn', 'btn__shuffle');
wrapper.append(shuffleBtn);

shuffleBtn.addEventListener('click', (event) => {
  let selectedValue = optionField.value;
  let buttonValues = new Array(selectedValue * selectedValue)
    .fill(0)
    .map((elem, index) => index + 1);
  let renderedItemNodes = renderField(field, selectedValue, buttonValues);
  renderedItemNodes[renderedItemNodes.length - 1].style.display = 'none';
  matrix = getMatrix(shuffleArray(buttonValues), selectedValue);
  setPosition(matrix, renderedItemNodes);
});

setPosition(matrix, itemNodes);

export default [wrapper, field, startFieldSize, shuffleBtn];
