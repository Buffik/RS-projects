const setStyles = (node, x, y) => {
  const shiftIndex = 100;
  node.style.transform = `translate3D(${x * shiftIndex}%, ${
    y * shiftIndex
  }%, 0)`;
};

export default setStyles;
