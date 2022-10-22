const isWon = (currentMatrix, winArr) => {
  const flatMatrix = currentMatrix.flat();
  for (let i = 0; i < winArr.length; i++) {
    if (flatMatrix[i] !== winArr[i]) {
      return false;
    }
  }
  return true;
};

export default isWon;
