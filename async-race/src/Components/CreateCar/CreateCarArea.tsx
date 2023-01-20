import React from 'react';
import CarInputCreate from './CarInput/CarCreate/CarInputCreate';
import CarInputUpdate from './CarInput/CarUpdate/CarInputUpdate';
import CommonButton from '../UI/buttons/CommonButton';
import styles from './createCarArea.module.scss';
import handleSingleCarDataSendToServer from '../utils/handleSingleCarDataSendToServer';
import { TCar, whatTodoWithCar } from '../../types/types';

interface ICreateCarArea {
  getCars: () => Promise<void>
  createdCar: {name: string; color: string;}
  setCreated: React.Dispatch<React.SetStateAction<{name: string; color: string;}>>
  updatedCar: TCar
  setUpdatedCar: React.Dispatch<React.SetStateAction<TCar>>
  handleGenerateCarsButton: () => void
}

function CreateCarArea({
  getCars,
  createdCar,
  setCreated,
  updatedCar,
  setUpdatedCar,
  handleGenerateCarsButton,
} : ICreateCarArea) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.carInputWrapper}>
        <CarInputCreate
          action={whatTodoWithCar.create}
          createdCar={createdCar}
          setCreated={setCreated}
          handleAction={handleSingleCarDataSendToServer}
          buttonText="Create Car"
          getCars={getCars}
        />
        <CarInputUpdate
          action={whatTodoWithCar.update}
          handleAction={handleSingleCarDataSendToServer}
          updatedCar={updatedCar}
          setUpdatedCar={setUpdatedCar}
          buttonText="Update Car"
          getCars={getCars}
        />
      </div>
      <div className={styles.buttonsWrapper}>
        <CommonButton isBlocked={false} onClick={() => console.log('click select')}>Race</CommonButton>
        <CommonButton isBlocked={false} onClick={() => console.log('click select')}>Reset</CommonButton>
        <CommonButton
          isBlocked={false}
          onClick={() => handleGenerateCarsButton()}
        >
          Generate Cars
        </CommonButton>
      </div>
    </div>
  );
}

export default CreateCarArea;
