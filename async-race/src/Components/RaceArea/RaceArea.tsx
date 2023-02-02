import React, { SetStateAction } from 'react';
import styles from './raceArea.module.scss';
import CarTemplate from '../Car/CarTemplate/CarTemplate';
import {
  IAnimationStore, TButtonStopEngineDisabled, TCar, TCarsData,
} from '../../types/types';

interface IRaceArea {
  currentPage: number
  carsData: TCarsData | null
  setUpdatedCar: React.Dispatch<React.SetStateAction<TCar>>
  getCars: () => Promise<void>
  setCurrentWidthOfTrack: React.Dispatch<React.SetStateAction<number>>
  isButtonStopEngineDisabled: TButtonStopEngineDisabled | []
  animationStore: [] | IAnimationStore[]
  setAnimationStore: React.Dispatch<SetStateAction<[] | IAnimationStore[]>>
  handleStartEngineButton: (id: number) => Promise<void>
  handleStopEngineButton: (id: number) => Promise<void>
}

function RaceArea({
  currentPage, carsData, setUpdatedCar, getCars,
  setCurrentWidthOfTrack,
  isButtonStopEngineDisabled,
  animationStore, setAnimationStore,
  handleStartEngineButton, handleStopEngineButton,
}: IRaceArea) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.infoWrapper}>
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
              setCurrentWidthOfTrack={setCurrentWidthOfTrack}
              isButtonStopEngineDisabled={isButtonStopEngineDisabled}
              animationStore={animationStore}
              setAnimationStore={setAnimationStore}
              handleStartEngineButton={handleStartEngineButton}
              handleStopEngineButton={handleStopEngineButton}
            />
          ),
        )}
      </div>
    </div>
  );
}

export default RaceArea;
