const isValidToRelocate = (firstItem, secondItem) => {
  const xDifference = Math.abs(firstItem.x - secondItem.x);
  const yDifference = Math.abs(firstItem.y - secondItem.y);

  if (
    (xDifference === 1 || yDifference === 1) &&
    (firstItem.x === secondItem.x || firstItem.y === secondItem.y)
  ) {
    return true;
  } else {
    return false;
  }
};

export default isValidToRelocate;
