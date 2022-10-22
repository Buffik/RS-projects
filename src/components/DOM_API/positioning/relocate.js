const relocate = (firstItem, secondItem, matrix) => {
  const itemCoordinates = matrix[firstItem.y][firstItem.x];
  matrix[firstItem.y][firstItem.x] = matrix[secondItem.y][secondItem.x];
  matrix[secondItem.y][secondItem.x] = itemCoordinates;
};

export default relocate;
