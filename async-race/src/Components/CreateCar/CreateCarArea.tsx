/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import CarInputCreate from './CarInput/CarCreate/CarInputCreate';
import CarInputUpdate from './CarInput/CarUpdate/CarInputUpdate';
import CommonButton from '../UI/buttons/CommonButton';
import styles from './createCarArea.module.scss';
import handleSingleCarDataSendToServer from '../utils/handleSingleCarDataSendToServer';
import handleNumberOfCarsAtCurrentPage from '../utils/handleNumberOfCarsAtCurrentPage';
import { TCar, whatTodoWithCar } from '../../types/types';

interface ICreateCarArea {
  getCars: () => Promise<void>
  shouldUpdateCars: number
  setShouldUpdateCars: React.Dispatch<React.SetStateAction<number>>
  updatedCar: TCar
  setUpdatedCar: React.Dispatch<React.SetStateAction<TCar>>
}

function CreateCarArea({
  getCars,
  shouldUpdateCars,
  setShouldUpdateCars,
  updatedCar,
  setUpdatedCar,
} : ICreateCarArea) {
  const [createdCarName, setCreatedName] = useState('');
  const [createdCarColor, setCreatedCarColor] = useState('#ffffff');

  return (
    <div className={styles.wrapper}>
      <div className={styles.carInputWrapper}>
        <CarInputCreate
          action={whatTodoWithCar.create}
          handleAction={handleSingleCarDataSendToServer}
          setName={setCreatedName}
          setColor={setCreatedCarColor}
          buttonText="Create Car"
          carName={createdCarName}
          carColor={createdCarColor}
          getCars={getCars}
          shouldUpdateCars={shouldUpdateCars}
          setShouldUpdateCars={setShouldUpdateCars}
        />
        <CarInputUpdate
          action={whatTodoWithCar.update}
          handleAction={handleSingleCarDataSendToServer}
          updatedCar={updatedCar}
          setUpdatedCar={setUpdatedCar}
          buttonText="Update Car"
          getCars={getCars}
          shouldUpdateCars={shouldUpdateCars}
          setShouldUpdateCars={setShouldUpdateCars}
        />
      </div>
      <div className={styles.buttonsWrapper}>
        <CommonButton isBlocked={false} onClick={() => console.log('click select')}>Race</CommonButton>
        <CommonButton isBlocked={false} onClick={() => console.log('click select')}>Reset</CommonButton>
        <CommonButton isBlocked={false} onClick={() => console.log('click select')}>Generate Cars</CommonButton>
      </div>
    </div>
  );
}

export default CreateCarArea;
