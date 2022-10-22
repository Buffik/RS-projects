const getMatrix = (arr, startFieldSize) => {
  let matrix = [];
  let index = startFieldSize;
  while (index) {
    matrix.push([]);
    index--;
  }

  let y = 0;
  let x = 0;

  for (let i = 0; i < arr.length; i++) {
    matrix[y][x] = arr[i];
    if (x >= startFieldSize) {
      y++;
      x = 0;
    }
    matrix[y][x] = arr[i];
    x++;
  }

  return matrix;
};

export default getMatrix;
