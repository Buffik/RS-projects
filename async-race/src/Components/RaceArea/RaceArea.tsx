import React from 'react';
import styles from './raceArea.module.scss';
import CarTemplate from '../Car/CarTemplate/CarTemplate';
import { TCar, TCarsData } from '../../types/types';

interface IRaceArea {
  currentPage: number
  carsData: TCarsData | null
  setUpdatedCar: React.Dispatch<React.SetStateAction<TCar>>
  getCars: () => Promise<void>
}

function RaceArea({
  currentPage, carsData, setUpdatedCar, getCars,
}: IRaceArea) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        Garage (
        {carsData && carsData.allCarsCount}
        )
      </h2>
      <div className={styles.pageNumberTitle}>
        Page #
        {' '}
        {currentPage}
      </div>
      <div className={styles.carsWrapper}>
        {carsData && carsData.cars.map(
          (item) => (
            <CarTemplate
              key={item.id}
              carId={item.id}
              carName={item.name}
              carColor={item.color}
              setUpdatedCar={setUpdatedCar}
              getCars={getCars}
            />
          ),
        )}
      </div>
    </div>
  );
}

export default RaceArea;
