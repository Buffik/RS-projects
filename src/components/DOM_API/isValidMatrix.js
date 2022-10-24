import findCoordinates from './positioning/findCoordinates';

const isValidMatrix = (matrix, selectedValue) => {
  const flatMatrix = matrix.flat();
  let emptyItem = selectedValue ** 2;
  const emptyItemCoordinates = findCoordinates(emptyItem, matrix);
  let inversion = 0;

  for (let i = 0; i < flatMatrix.length; i++) {
    let elementCurrent = flatMatrix[i];
    for (let k = i; k < flatMatrix.length; k++) {
      let element = flatMatrix[k];
      if (
        element < elementCurrent &&
        elementCurrent !== emptyItem &&
        element !== emptyItem
      ) {
        inversion++;
      }
    }
  }

  if (selectedValue % 2) {
    let sumOfInversions = inversion;
    inversion = 0;
    return sumOfInversions % 2 ? false : true;
  } else {
    let sumOfInversions = inversion;
    inversion = 0;
    return (sumOfInversions + emptyItemCoordinates.y) % 2 ? true : false;
  }
};

export default isValidMatrix;
