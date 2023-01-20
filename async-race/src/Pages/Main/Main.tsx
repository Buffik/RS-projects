/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import CarService from '../../Components/API/carServices';
import CreateCarArea from '../../Components/CreateCar/CreateCarArea';
import RaceArea from '../../Components/RaceArea/RaceArea';
import useFetching from '../../hooks/useFetching';
import CommonButton from '../../Components/UI/buttons/CommonButton';
import { TCar, TCarsData } from '../../types/types';
import styles from './main.module.scss';

function Main() {
  // array of cars from server, all cars count
  const [cars, setCars] = useState<TCarsData | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [areNavButtonsBlocked, setAreNavButtonsBlocked] = useState({ prev: true, next: true });
  const [shouldUpdateCars, setShouldUpdateCars] = useState(1);

  const [updatedCar, setUpdatedCar] = useState<TCar>({ name: '', color: '#ffffff', id: 0 });

  console.log(updatedCar);
  const [getCars, isLoadingCars, errorLoadingCars] = useFetching(async () => {
    const carsData = await CarService.getCars(currentPage);
    setCars(carsData);
  });

  useEffect(() => {
    getCars();
    if (cars && cars.cars.length) setShouldUpdateCars(cars.cars.length);
  }, [currentPage]);

  useEffect(() => {
    if (currentPage === 1) {
      setAreNavButtonsBlocked({ ...areNavButtonsBlocked, prev: true });
    } else setAreNavButtonsBlocked({ ...areNavButtonsBlocked, prev: false });
    if (cars && cars.allCarsCount) {
      const maxPages = Math.ceil(Number(cars.allCarsCount) / 7);
      if (currentPage === maxPages) {
        setAreNavButtonsBlocked({ ...areNavButtonsBlocked, next: true });
      } else setAreNavButtonsBlocked({ ...areNavButtonsBlocked, next: false });
    }
  }, [currentPage]);

  useEffect(() => {
    if (shouldUpdateCars <= 7) getCars();
  }, [shouldUpdateCars]);

  return (
    <div>
      <CreateCarArea
        getCars={getCars}
        shouldUpdateCars={shouldUpdateCars}
        setShouldUpdateCars={setShouldUpdateCars}
        updatedCar={updatedCar}
        setUpdatedCar={setUpdatedCar}
      />
      <RaceArea
        currentPage={currentPage}
        carsData={cars}
        setUpdatedCar={setUpdatedCar}
        getCars={getCars}
      />
      <div className={styles.buttonsWrapper}>
        <CommonButton isBlocked={areNavButtonsBlocked.prev} onClick={() => console.log('prev clicked')}>PREV</CommonButton>
        <CommonButton isBlocked={areNavButtonsBlocked.next} onClick={() => console.log('next clicked')}>NEXT</CommonButton>
      </div>
    </div>
  );
}

export default Main;
