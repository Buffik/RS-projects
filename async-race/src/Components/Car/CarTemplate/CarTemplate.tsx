/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  MutableRefObject,
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
  TServerResponseStartEngine,
} from '../../../types/types';
import CarService from '../../API/carServices';
import handleEngineStop from '../../utils/handleEngineStop';
import useFetching from '../../../hooks/useFetching';
import updateButtonSingleState from '../../utils/updateButtonSingleState';
import handleIsButtonBlocked from '../../utils/handleIsButtonBlocked';

interface ICarTemplate {
  carId: number;
  carName: string;
  carColor: string;
  setUpdatedCar: React.Dispatch<React.SetStateAction<TCar>>;
  getCars: () => Promise<void>;
  currentWidthOfTrack: number;
  setCurrentWidthOfTrack: React.Dispatch<React.SetStateAction<number>>;
  isButtonStopEngineDisabled: TButtonStopEngineDisabled | [];
  setIsButtonStopEngineDisabled: React.Dispatch<
    React.SetStateAction<TButtonStopEngineDisabled | []>
  >;
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
  currentWidthOfTrack,
  setCurrentWidthOfTrack,
  isButtonStopEngineDisabled,
  setIsButtonStopEngineDisabled,
  animationStore, setAnimationStore,
  handleStartEngineButton, handleStopEngineButton,
}: ICarTemplate) {
  const refRequestId = useRef(0);

  // ссылка на изображение машинки, поднять в корень, сделать массивом объектов id: ссылка
  const [curRef, setCurRef] = useState<CSSStyleDeclaration | undefined>();
  // поднять вверх
  const [isStartButtonDisabled, setIsStartButtonDisabled] = useState(false);

  // сделать вверху стейт, который хранит refRequestId

  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (ref.current) setCurrentWidthOfTrack(ref.current.offsetWidth - 201);
  }, []);

  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [currentCarDrive, setCurrentCarDrive] = useState(true);
  const [engineStart] = useFetching(async () => {
    const response: TServerResponseStartEngine = await CarService.engineStart(
      carId,
    );
    const result = Math.ceil(response.distance / response.velocity);
    setCurrentSpeed(result);
    updateButtonSingleState(carId, isButtonStopEngineDisabled);
  });

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
            onClick={(e) => setUpdatedCar({
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
