import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import { THandleSingleCarDataSendToServer } from '../../../../types/types';
import CommonButton from '../../../UI/buttons/CommonButton';
import handleCarDataInInputs from '../../../utils/handleCarDataInInputs';
import styles from '../carInput.module.scss';

interface ICarInput {
  handleAction: THandleSingleCarDataSendToServer
  carName: string
  carColor: string
  setName: Dispatch<SetStateAction<string>>
  setColor: Dispatch<SetStateAction<string>>
  buttonText: string
  action: 'create' | 'update'
  getCars: () => Promise<void>
  shouldUpdateCars: number
  setShouldUpdateCars: React.Dispatch<React.SetStateAction<number>>
}

function CarInputCreate({
  handleAction,
  carName,
  carColor,
  setName,
  setColor,
  buttonText,
  action,
  getCars,
  shouldUpdateCars,
  setShouldUpdateCars,
}: ICarInput) {
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    if (!carName) setIsEmpty(true);
    if (carName) setIsEmpty(false);
  }, [carName]);

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        placeholder="Enter the name"
        onChange={(e) => {
          handleCarDataInInputs(e, setName);
        }}
      />
      <input
        type="color"
        onChange={(e) => {
          handleCarDataInInputs(e, setColor);
        }}
      />
      <CommonButton
        isBlocked={isEmpty}
        onClick={() => handleAction(
          carName,
          carColor,
          action,
          getCars,
          shouldUpdateCars,
          setShouldUpdateCars,
        )}
      >
        {buttonText}
      </CommonButton>
    </div>
  );
}

export default CarInputCreate;
