import React, {
  useEffect, useState,
} from 'react';
import { THandleSingleCarDataSendToServer } from '../../../../types/types';
import CommonButton from '../../../UI/buttons/CommonButton';
import styles from '../carInput.module.scss';

interface ICarInput {
  handleAction: THandleSingleCarDataSendToServer
  createdCar: {name: string; color: string;}
  setCreated: React.Dispatch<React.SetStateAction<{name: string; color: string;}>>
  buttonText: string
  action: 'create' | 'update'
  getCars: () => Promise<void>
}

function CarInputCreate({
  handleAction,
  createdCar,
  setCreated,
  buttonText,
  action,
  getCars,
}: ICarInput) {
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    if (!createdCar.name) setIsEmpty(true);
    if (createdCar.name) setIsEmpty(false);
  }, [createdCar.name]);

  return (
    <div className={styles.wrapper}>
      <input
        value={createdCar.name}
        type="text"
        placeholder="Enter the name"
        onChange={(e) => {
          setCreated({ ...createdCar, name: e.target.value });
        }}
      />
      <input
        value={createdCar.color}
        type="color"
        onChange={(e) => {
          setCreated({ ...createdCar, color: e.target.value });
        }}
      />
      <CommonButton
        isBlocked={isEmpty}
        onClick={() => {
          handleAction(createdCar.name, createdCar.color, action, getCars);
          setCreated({ name: '', color: '#ffffff' });
        }}
      >
        {buttonText}
      </CommonButton>
    </div>
  );
}

export default CarInputCreate;
