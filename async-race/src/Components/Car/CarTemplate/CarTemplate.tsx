import React, {
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import styles from './carTemplate.module.scss';
import CarImage from '../CarImage/CarImage';
import CommonButton from '../../UI/buttons/CommonButton';
import flagIcon from '../../../assets/images/flagFinishIcon.svg';
import {
  IAnimationStore,
  TButtonStopEngineDisabled,
  TCar,
} from '../../../types/types';
import CarService from '../../API/carServices';
import handleIsButtonBlocked from '../../utils/handleIsButtonBlocked';

interface ICarTemplate {
  carId: number;
  carName: string;
  carColor: string;
  setUpdatedCar: React.Dispatch<React.SetStateAction<TCar>>;
  getCars: () => Promise<void>;
  setCurrentWidthOfTrack: React.Dispatch<React.SetStateAction<number>>;
  isButtonStopEngineDisabled: TButtonStopEngineDisabled | [];
  animationStore: [] | IAnimationStore[]
  setAnimationStore: React.Dispatch<SetStateAction<[] | IAnimationStore[]>>
  handleStartEngineButton: (id: number) => Promise<void>
  handleStopEngineButton: (id: number) => Promise<void>
}

function CarTemplate({
  carColor,
  carName,
  carId,
  setUpdatedCar,
  getCars,
  setCurrentWidthOfTrack,
  isButtonStopEngineDisabled,
  animationStore, setAnimationStore,
  handleStartEngineButton, handleStopEngineButton,
}: ICarTemplate) {
  const refRequestId = useRef(0);

  const [curRef, setCurRef] = useState<CSSStyleDeclaration | undefined>();

  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (ref.current) setCurrentWidthOfTrack(ref.current.offsetWidth - 201);
  }, []);

  const [currentCarDrive] = useState(true);

  useEffect(() => {
    if (!currentCarDrive) cancelAnimationFrame(refRequestId.current);
  }, [currentCarDrive]);

  useEffect(() => {
    setAnimationStore(animationStore.map((item) => {
      if (item.id === carId) {
        // eslint-disable-next-line no-param-reassign
        item.carImage = curRef;
        return item;
      } return item;
    }));
  }, [curRef, carId, carName]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.controlWrapper}>
        <div className={styles.controlButtonsWrapper}>
          <CommonButton
            isBlocked={false}
            onClick={() => setUpdatedCar({
              name: carName,
              color: carColor,
              id: carId,
            })}
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
            isBlocked={!handleIsButtonBlocked(isButtonStopEngineDisabled, carId)}
            onClick={() => { handleStartEngineButton(carId); }}
          >
            A
          </CommonButton>
          <CommonButton
            isBlocked={handleIsButtonBlocked(isButtonStopEngineDisabled, carId)}
            onClick={() => { handleStopEngineButton(carId); }}
          >
            B
          </CommonButton>
        </div>
        <CarImage color={carColor} setCurRef={setCurRef} />
        <img
          className={styles.iconFinishFlag}
          src={flagIcon}
          alt="Finish flag"
        />
      </div>
    </div>
  );
}

export default CarTemplate;
