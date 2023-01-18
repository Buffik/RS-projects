import React from 'react';
import styles from './carTemplate.module.scss';
import CarImage from '../CarImage/CarImage';
import CommonButton from '../../UI/buttons/CommonButton';
import flagIcon from '../../../assets/images/flagFinishIcon.svg';

interface ICarTemplate {
  carName: string
  color: string
}

function CarTemplate({ color, carName }: ICarTemplate) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.controlWrapper}>
        <div className={styles.controlButtonsWrapper}>
          <CommonButton onClick={() => console.log('click select')}>SELECT</CommonButton>
          <CommonButton onClick={() => console.log('click remove')}>REMOVE</CommonButton>
        </div>
        <h2 className={styles.carName}>{carName}</h2>
      </div>
      <div className={styles.rangeWrapper}>
        <div className={styles.engineControlWrapper}>
          <CommonButton onClick={() => console.log('click select')}>A</CommonButton>
          <CommonButton onClick={() => console.log('click select')}>B</CommonButton>
        </div>
        <CarImage color={color} />
        <img className={styles.iconFinishFlag} src={flagIcon} alt="Finish flag" />
      </div>
    </div>
  );
}

export default CarTemplate;
