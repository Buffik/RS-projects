import { Dispatch, SetStateAction } from 'react';

const handleNumberOfCarsAtCurrentPage = (
  shouldUpdateCars: number,
  setShouldUpdateCars: Dispatch<SetStateAction<number>>,
) => {
  if (shouldUpdateCars < 7) {
    setShouldUpdateCars(shouldUpdateCars + 1);
  }
};

export default handleNumberOfCarsAtCurrentPage;
