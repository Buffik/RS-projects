import React from 'react';
import styles from './winner.module.scss';

interface IPurchase {
  winnerCarDataModal: {
    name: string;
    time: string;
  }
}

function Winner({ winnerCarDataModal }: IPurchase) {
  return (
    <div className={styles.wrapper}>
      Winner is
      {' '}
      {winnerCarDataModal.name}
      , time elapsed
      {' '}
      {winnerCarDataModal.time}
      s
    </div>
  );
}

export default Winner;
