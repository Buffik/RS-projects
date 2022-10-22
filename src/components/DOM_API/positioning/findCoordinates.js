const findCoordinates = (elem, matrix) => {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === elem) {
        return { x, y };
      }
    }
  }
};

export default findCoordinates;
