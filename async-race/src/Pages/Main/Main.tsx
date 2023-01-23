/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { SetStateAction, useEffect, useState } from 'react';
import CreateCarArea from '../../Components/CreateCar/CreateCarArea';
import Modal from '../../Components/PurchaseModal/Modal';
import Winner from '../../Components/PurchaseModal/Winner/Winner';
import RaceArea from '../../Components/RaceArea/RaceArea';
import CommonButton from '../../Components/UI/buttons/CommonButton';
import {
  IAnimationStore, TButtonStopEngineDisabled, TCar, TCarsData,
} from '../../types/types';
import styles from './main.module.scss';

interface IMain {
  handleGenerateCarsButton: () => void
  cars: TCarsData | null
  getCars: () => Promise<void>
  currentPage: number
  createdCar: {name: string; color: string;}
  setCreated: React.Dispatch<React.SetStateAction<{name: string; color: string;}>>
  updatedCar: TCar
  setUpdatedCar: React.Dispatch<React.SetStateAction<TCar>>
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  currentWidthOfTrack: number
  setCurrentWidthOfTrack: React.Dispatch<React.SetStateAction<number>>
  isButtonStopEngineDisabled: TButtonStopEngineDisabled | []
  setIsButtonStopEngineDisabled:React.Dispatch<React.SetStateAction<TButtonStopEngineDisabled | []>>
  animationStore: [] | IAnimationStore[]
  setAnimationStore: React.Dispatch<SetStateAction<[] | IAnimationStore[]>>
  goRace: () => Promise<void>
    winnerCar: {
    name: string;
    time: string;
    }
  showWinnerCar: boolean
  setShowWinnerCar: React.Dispatch<React.SetStateAction<boolean>>
  stopRace: () => Promise<void>

}

function Main({
  handleGenerateCarsButton,
  cars, getCars,
  currentPage,
  setCurrentPage,
  createdCar, setCreated,
  updatedCar, setUpdatedCar,
  currentWidthOfTrack, setCurrentWidthOfTrack,
  isButtonStopEngineDisabled, setIsButtonStopEngineDisabled,
  animationStore, setAnimationStore,
  goRace,
  winnerCar,
  showWinnerCar,
  setShowWinnerCar,
  stopRace,
}: IMain) {
  const [isPrevButtonBlocked, setIsPrevButtonBlocked] = useState(true);
  const [isNextButtonBlocked, setIsNextButtonBlocked] = useState(true);

  useEffect(() => {
    getCars();
  }, [currentPage]);

  useEffect(() => {
    if (cars && cars.allCarsCount) {
      if (currentPage > 1) {
        setIsPrevButtonBlocked(false);
      } else setIsPrevButtonBlocked(true);
      const maxPages = Math.ceil(Number(cars.allCarsCount) / 7);
      if (currentPage === maxPages) {
        setIsNextButtonBlocked(true);
      } else setIsNextButtonBlocked(false);
    }
  }, [currentPage, cars]);

  useEffect(() => {
    if (cars && cars.cars.length === 0 && currentPage > 1) setCurrentPage(currentPage - 1);
  }, [cars]);

  return (
    <div className={styles.wrapper}>
      {showWinnerCar && (
      <Modal visible={showWinnerCar} setVisible={setShowWinnerCar}>
        <Winner winnerCar={winnerCar} />
      </Modal>
      )}
      <CreateCarArea
        getCars={getCars}
        createdCar={createdCar}
        setCreated={setCreated}
        updatedCar={updatedCar}
        setUpdatedCar={setUpdatedCar}
        handleGenerateCarsButton={handleGenerateCarsButton}
        goRace={goRace}
        stopRace={stopRace}
      />
      <RaceArea
        currentPage={currentPage}
        carsData={cars}
        setUpdatedCar={setUpdatedCar}
        getCars={getCars}
        currentWidthOfTrack={currentWidthOfTrack}
        setCurrentWidthOfTrack={setCurrentWidthOfTrack}
        isButtonStopEngineDisabled={isButtonStopEngineDisabled}
        setIsButtonStopEngineDisabled={setIsButtonStopEngineDisabled}
        animationStore={animationStore}
        setAnimationStore={setAnimationStore}
      />
      <div className={styles.buttonsWrapper}>
        <CommonButton
          isBlocked={isPrevButtonBlocked}
          onClick={() => {
            setAnimationStore([]);
            setCurrentPage(currentPage - 1);
          }}
        >
          PREV
        </CommonButton>
        <CommonButton
          isBlocked={isNextButtonBlocked}
          onClick={() => {
            setAnimationStore([]);
            setCurrentPage(currentPage + 1);
          }}
        >
          NEXT
        </CommonButton>
      </div>
    </div>
  );
}

export default Main;
