import { Dispatch, SetStateAction } from 'react';

const MAX_CARS_PER_PAGE = 7;

const handleNumberOfCarsAtCurrentPage = (
  shouldUpdateCars: number,
  setShouldUpdateCars: Dispatch<SetStateAction<number>>,
) => {
  if (shouldUpdateCars < MAX_CARS_PER_PAGE) {
    setShouldUpdateCars(shouldUpdateCars + 1);
  }
};

export default handleNumberOfCarsAtCurrentPage;
