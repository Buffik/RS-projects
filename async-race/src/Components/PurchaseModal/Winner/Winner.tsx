import React from 'react';
import styles from './winner.module.scss';

interface IPurchase {
  winnerCar: {
    name: string;
    time: string;
  }
}

function Winner({ winnerCar }: IPurchase) {
  return (
    <div className={styles.wrapper}>
      Winner is
      {' '}
      {winnerCar.name}
      , time elapsed
      {' '}
      {winnerCar.time}
      s
    </div>
  );
}

export default Winner;
