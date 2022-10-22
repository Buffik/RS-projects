import setStyles from './setStyles';

const setPosition = (matrix, itemNodes) => {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const element = matrix[y][x];
      const node = itemNodes[element - 1];
      setStyles(node, x, y);
    }
  }
  itemNodes[itemNodes.length - 1].style.display = 'none';
};

export default setPosition;
