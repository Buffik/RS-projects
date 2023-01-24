import React from 'react';
import Winners from '../../Components/Winners/Winners';
import { TWinnersData } from '../../types/types';
import styles from './winnersTemplate.module.scss';

interface IWinnersTemplate {
  winners: TWinnersData | null
  setWinners: React.Dispatch<React.SetStateAction<TWinnersData | null>>
  currentWinnersPage: number
  setCurrentWinnersPage: React.Dispatch<React.SetStateAction<number>>
}

function Other({
  winners, setWinners,
  currentWinnersPage, setCurrentWinnersPage,
}: IWinnersTemplate) {
  return (
    <div className={styles.wrapper}>
      <Winners
        winners={winners}
        setWinners={setWinners}
        currentWinnersPage={currentWinnersPage}
        setCurrentWinnersPage={setCurrentWinnersPage}
      />
    </div>
  );
}

export default Other;
