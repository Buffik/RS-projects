const renderField = (parent, itemsCount, values) => {
  parent.innerHTML = '';
  let renderedItemNodes = [];
  for (let i = 0; i < values.length; i++) {
    const element = values[i];
    const btn = document.createElement('button');
    btn.classList.add('item');
    btn.classList.add('item_' + itemsCount + 'x' + itemsCount);
    btn.dataset.itemPosition = element;
    btn.innerText = element;
    parent.append(btn);
    renderedItemNodes.push(btn);
  }
  return renderedItemNodes;
};

export default renderField;
