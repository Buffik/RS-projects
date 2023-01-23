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
}: ICarTemplate) {
  const refRequestId = useRef(0);

  // ссылка на изображение машинки, поднять в корень, сделать массивом объектов id: ссылка
  const [curRef, setCurRef] = useState<CSSStyleDeclaration | undefined>();
  // поднять вверх
  const [isStartButtonDisabled, setIsStartButtonDisabled] = useState(false);

  // сделать вверху стейт, который хранит refRequestId
  const animation = (
    elem: CSSStyleDeclaration,
    distance: number,
    cartTime: number,
  ) => {
    const element = elem;
    let startAnimation: number | null = null;
    function easeInOut(time: number) {
      return 0.5 * (1 - Math.cos(Math.PI * time));
    }

    refRequestId.current = requestAnimationFrame(function measure(time) {
      if (!startAnimation) {
        startAnimation = time;
      }

      const progress = (time - startAnimation) / cartTime;

      const translate = easeInOut(progress) * distance;

      element.transform = `translateX(${translate}px)`;

      if (progress < 1) {
        refRequestId.current = requestAnimationFrame(measure);
      }
    });
  };

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

  const [checkDriveState] = useFetching(async () => {
    const result = await CarService.driveCar(carId);
    setCurrentCarDrive(result);
  });

  useEffect(() => {
    if (currentSpeed > 0 && ref) {
      animation(curRef!, currentWidthOfTrack, currentSpeed);
      checkDriveState();
    }
  }, [currentSpeed]);

  useEffect(() => {
    if (!currentCarDrive) cancelAnimationFrame(refRequestId.current);
  }, [currentCarDrive]);

  useEffect(() => {
    // const result = animationStore.map((item) => {
    //   if (item.id === carId) {
    //     // eslint-disable-next-line no-param-reassign
    //     item.carImage = curRef;
    //     return item;
    //   } return item;
    // });
    setAnimationStore(animationStore.map((item) => {
      if (item.id === carId) {
        // eslint-disable-next-line no-param-reassign
        item.carImage = curRef;
        return item;
      } return item;
    }));
  }, [curRef, carId, carName]);

  const handleIsButtonBlocked = (
    arr: TButtonStopEngineDisabled | [],
    carId: number,
  ) => {
    if (arr.length > 0) {
      const result = arr.find((elem) => elem.id === carId)?.disabled;
      if (result === undefined) {
        return true;
      }
      return result;
    }
    return true;
  };

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
            onClick={() => {
              engineStart();
              setIsStartButtonDisabled(true);
            }}
          >
            A
          </CommonButton>
          <CommonButton
            isBlocked={handleIsButtonBlocked(isButtonStopEngineDisabled, carId)}
            onClick={() => {
              handleEngineStop(
                carId,
                curRef!,
                isButtonStopEngineDisabled,
                setIsButtonStopEngineDisabled,
                refRequestId,
                setIsStartButtonDisabled,
              );
            }}
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
