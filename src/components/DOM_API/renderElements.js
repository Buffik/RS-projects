const renderElements = (parent, element = 'div', itemClass, values) => {
  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    const elem = document.createElement(element);
    elem.classList.add(itemClass);
    elem.innerText = value;
    elem.value = value;
    parent.append(elem);
  }
};

export default renderElements;
