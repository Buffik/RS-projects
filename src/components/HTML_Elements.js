import renderElements from './DOM_API/renderElements';
import constants from './constants';
import renderField from './DOM_API/renderField';

let wrapper = document.createElement('div');
wrapper.classList.add('wrapper');
document.body.append(wrapper);

let field = document.createElement('div');
field.classList.add('field');
wrapper.append(field);

let fieldSize = 4;

let buttonValues = new Array(fieldSize * fieldSize)
  .fill(0)
  .map((elem, index) => index + 1);

for (let i = 0; i < buttonValues.length; i++) {
  const element = buttonValues[i];
  const btn = document.createElement('button');
  btn.classList.add('item');
  btn.classList.add('item_' + fieldSize + 'x' + fieldSize);
  btn.dataset.itemPosition = element;
  btn.innerText = element;
  field.append(btn);
}

let optionField = document.createElement('select');
optionField.classList.add('options__field');
wrapper.append(optionField);

const fieldSizes = constants.fieldSizes;

renderElements(optionField, 'option', 'options__option', fieldSizes);

let shuffleBtn = document.createElement('button');
shuffleBtn.innerText = 'shuffle and start';
shuffleBtn.classList.add('btn', 'btn__shuffle');
wrapper.append(shuffleBtn);

shuffleBtn.addEventListener('click', (event) => {
  let selectedValue = optionField.value;
  let buttonValues = new Array(selectedValue * selectedValue)
    .fill(0)
    .map((elem, index) => index + 1);
  renderField(field, selectedValue, buttonValues);
});

export default [wrapper, field, fieldSize, shuffleBtn];
