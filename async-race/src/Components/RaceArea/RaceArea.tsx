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
  currentWidthOfTrack: number
  setCurrentWidthOfTrack: React.Dispatch<React.SetStateAction<number>>
  isButtonStopEngineDisabled: TButtonStopEngineDisabled | []
  setIsButtonStopEngineDisabled:React.Dispatch<React.SetStateAction<TButtonStopEngineDisabled | []>>
  animationStore: [] | IAnimationStore[]
  setAnimationStore: React.Dispatch<SetStateAction<[] | IAnimationStore[]>>

}

function RaceArea({
  currentPage, carsData, setUpdatedCar, getCars,
  currentWidthOfTrack,
  setCurrentWidthOfTrack,
  isButtonStopEngineDisabled,
  setIsButtonStopEngineDisabled,
  animationStore, setAnimationStore,
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
              currentWidthOfTrack={currentWidthOfTrack}
              setCurrentWidthOfTrack={setCurrentWidthOfTrack}
              isButtonStopEngineDisabled={isButtonStopEngineDisabled}
              setIsButtonStopEngineDisabled={setIsButtonStopEngineDisabled}
              animationStore={animationStore}
              setAnimationStore={setAnimationStore}
            />
          ),
        )}
      </div>
    </div>
  );
}

export default RaceArea;
