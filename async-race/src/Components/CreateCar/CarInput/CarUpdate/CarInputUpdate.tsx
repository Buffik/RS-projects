import React, {
  useEffect, useState,
} from 'react';
import { TCar, THandleSingleCarDataSendToServer } from '../../../../types/types';
import CommonButton from '../../../UI/buttons/CommonButton';
import styles from '../carInput.module.scss';

interface ICarInput {
  handleAction: THandleSingleCarDataSendToServer
  updatedCar: TCar
  setUpdatedCar: React.Dispatch<React.SetStateAction<TCar>>
  buttonText: string
  action: 'create' | 'update'
  getCars: () => Promise<void>
}

function CarInput({
  handleAction,
  updatedCar,
  setUpdatedCar,
  buttonText,
  action,
  getCars,
}: ICarInput) {
  const [isEmptyCarUpdate, setIsEmptyCarUpdate] = useState(true);

  useEffect(() => {
    if (!updatedCar.name || updatedCar.id === 0) setIsEmptyCarUpdate(true);
    if (updatedCar.name && updatedCar.id > 0) setIsEmptyCarUpdate(false);
  }, [updatedCar]);

  return (
    <div className={styles.wrapper}>
      <input
        value={updatedCar.name}
        type="text"
        placeholder="Enter the name"
        onChange={(e) => {
          setUpdatedCar({ ...updatedCar, name: e.target.value });
        }}
      />
      <input
        type="color"
        value={updatedCar.color}
        onChange={(e) => {
          setUpdatedCar({ ...updatedCar, color: e.target.value });
        }}
      />
      <CommonButton
        isBlocked={isEmptyCarUpdate}
        onClick={() => handleAction(
          updatedCar.name,
          updatedCar.color,
          action,
          getCars,
          updatedCar.id,
        )}
      >
        {buttonText}
      </CommonButton>
    </div>
  );
}

export default CarInput;
