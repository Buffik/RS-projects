/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import CreateCarArea from '../../Components/CreateCar/CreateCarArea';
import RaceArea from '../../Components/RaceArea/RaceArea';
import CommonButton from '../../Components/UI/buttons/CommonButton';
import { TCar, TCarsData } from '../../types/types';
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
}

function Main({
  handleGenerateCarsButton,
  cars, getCars,
  currentPage,
  setCurrentPage,
  createdCar, setCreated,
  updatedCar, setUpdatedCar,
  currentWidthOfTrack, setCurrentWidthOfTrack,
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
    <div>
      <CreateCarArea
        getCars={getCars}
        createdCar={createdCar}
        setCreated={setCreated}
        updatedCar={updatedCar}
        setUpdatedCar={setUpdatedCar}
        handleGenerateCarsButton={handleGenerateCarsButton}
      />
      <RaceArea
        currentPage={currentPage}
        carsData={cars}
        setUpdatedCar={setUpdatedCar}
        getCars={getCars}
        currentWidthOfTrack={currentWidthOfTrack}
        setCurrentWidthOfTrack={setCurrentWidthOfTrack}
      />
      <div className={styles.buttonsWrapper}>
        <CommonButton
          isBlocked={isPrevButtonBlocked}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          PREV
        </CommonButton>
        <CommonButton
          isBlocked={isNextButtonBlocked}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          NEXT
        </CommonButton>
      </div>
    </div>
  );
}

export default Main;
