/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  MutableRefObject, useLayoutEffect, useRef, useState,
} from 'react';
import styles from './carTemplate.module.scss';
import CarImage from '../CarImage/CarImage';
import CommonButton from '../../UI/buttons/CommonButton';
import flagIcon from '../../../assets/images/flagFinishIcon.svg';
import { TCar } from '../../../types/types';
import CarService from '../../API/carServices';
import animation from '../../utils/animation';

interface ICarTemplate {
  carId: number
  carName: string
  carColor: string
  setUpdatedCar: React.Dispatch<React.SetStateAction<TCar>>
  getCars: () => Promise<void>
  currentWidthOfTrack: number
  setCurrentWidthOfTrack: React.Dispatch<React.SetStateAction<number>>
}

function CarTemplate({
  carColor, carName, carId, setUpdatedCar, getCars,
  currentWidthOfTrack,
  setCurrentWidthOfTrack,
}: ICarTemplate) {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (ref.current) setCurrentWidthOfTrack(ref.current.offsetWidth - 201);
  }, []);

  const [curRef, setCurRef] = useState<CSSStyleDeclaration | undefined>();

  return (
    <div className={styles.wrapper}>
      <div className={styles.controlWrapper}>
        <div className={styles.controlButtonsWrapper}>
          <CommonButton
            isBlocked={false}
            onClick={(e) => setUpdatedCar(
              {
                name: carName, color: carColor, id: carId,
              },
            )}
          >
            SELECT

          </CommonButton>
          <CommonButton
            isBlocked={false}
            onClick={async () => {
              await CarService.deleteCar(carId);
              setUpdatedCar({ name: '', color: '#ffffff', id: 0 });
              getCars();
            }}
          >
            REMOVE

          </CommonButton>
        </div>
        <h2 className={styles.carName}>{carName}</h2>
      </div>
      <div className={styles.rangeWrapper} ref={ref}>
        <div className={styles.engineControlWrapper}>
          <CommonButton
            isBlocked={false}
            onClick={
            () => animation(curRef!, currentWidthOfTrack, 2000)
}
          >
            A

          </CommonButton>
          <CommonButton isBlocked={false} onClick={() => console.log('click select')}>B</CommonButton>
        </div>
        <CarImage color={carColor} setCurRef={setCurRef} />
        <img className={styles.iconFinishFlag} src={flagIcon} alt="Finish flag" />
      </div>
    </div>
  );
}

export default CarTemplate;
