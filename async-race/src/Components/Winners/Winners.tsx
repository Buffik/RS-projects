/* eslint-disable @typescript-eslint/no-unused-vars */
import { log, time } from 'console';
import React, { EventHandler, useEffect, useState } from 'react';
import useFetching from '../../hooks/useFetching';
import { IWinnerData, TWinnersData } from '../../types/types';
import CarService from '../API/carServices';
import CommonButton from '../UI/buttons/CommonButton';
import handleFilterButtons from '../utils/handleFilterButtons';
import WinCar from './WinCar/WinCar';
import styles from './winners.module.scss';

interface IWinners {
  winners: TWinnersData | null
  setWinners: React.Dispatch<React.SetStateAction<TWinnersData | null>>
  currentWinnersPage: number
  setCurrentWinnersPage: React.Dispatch<React.SetStateAction<number>>
}

function Winners({
  winners, setWinners,
  currentWinnersPage, setCurrentWinnersPage,
}: IWinners) {
  const [isPrevWinnerButtonBlocked, setIsPrevWinnerButtonBlocked] = useState(true);
  const [isNextWinnerButtonBlocked, setIsNextWinnerButtonBlocked] = useState(true);
  const [winnersData, setWinnersData] = useState<IWinnerData[]>([]);
  const [getWinnersData] = useFetching(async () => {
    if (winners) {
      const response = winners.winnerCars.map((car) => CarService.getCarById(car.id));
      const imagesArr = (await Promise.all(response))
        .map((car) => ({ img: car.color, name: car.name }));
      const result = winners.winnerCars.map((data, index) => {
        const item = {
          img: imagesArr[index].img,
          carName: imagesArr[index].name,
          wins: data.wins,
          time: data.time,
          id: data.id,
        };
        return item;
      });
      setWinnersData(result);
    }
  });
  const [filterByWins, setFilterByWins] = useState({ sort: 'wins', order: 'ASC' });
  const [filterByTime, setFilterByTime] = useState({ sort: 'time', order: 'ASC' });
  const [getWinnersByWins] = useFetching(async () => {
    const result = await CarService.getWinners(
      currentWinnersPage,
      filterByWins.sort,
      filterByWins.order,
    );
    setWinners(result);
  });
  const [getWinnersByTime] = useFetching(async () => {
    const result = await CarService.getWinners(
      currentWinnersPage,
      filterByTime.sort,
      filterByTime.order,
    );
    setWinners(result);
  });

  useEffect(() => {
    if (winners) {
      if (currentWinnersPage > 1) {
        setIsPrevWinnerButtonBlocked(false);
      } else setIsPrevWinnerButtonBlocked(true);
      const maxPages = Math.ceil(Number(winners.allCarsCount) / 10);
      if (currentWinnersPage === maxPages) {
        setIsNextWinnerButtonBlocked(true);
      } else setIsNextWinnerButtonBlocked(false);
      getWinnersData();
    }
  }, [winners, currentWinnersPage]);

  useEffect(() => {
    getWinnersByWins();
  }, [filterByWins]);

  useEffect(() => {
    getWinnersByTime();
  }, [filterByTime]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.infoWrapper}>
        <h2 className={styles.title}>
          Winners
          {' '}
          {winners && winners.allCarsCount}
        </h2>
        <div className={styles.pageNumberTitle}>
          Page #
          {' '}
          {currentWinnersPage}
        </div>

      </div>
      <table className={styles.tableWrapper}>
        <thead>
          <tr className={styles.titleWrapper}>
            <th>№</th>
            <th className={styles.carImg}>Car</th>
            <th>Name</th>
            <th className={styles.winsTitle}>
              <button type="button" value="wins" onClick={() => handleFilterButtons(filterByWins, setFilterByWins)}>Wins</button>
            </th>
            <th className={styles.timeTitle}>
              <button type="button" value="time" onClick={() => handleFilterButtons(filterByTime, setFilterByTime)}>Time</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {
          winnersData.map((data, index) => {
            const currenOrder = currentWinnersPage
            === 1 ? index + 1 : index + 1 + 10 * (currentWinnersPage - 1);
            return (
              <WinCar
                key={data.id}
                order={currenOrder}
                img={data.img}
                name={data.carName}
                wins={data.wins}
                time={data.time}
              />
            );
          })
          }
        </tbody>
      </table>
      <div className={styles.buttonsWrapper}>
        <CommonButton
          isBlocked={isPrevWinnerButtonBlocked}
          onClick={() => {
            setCurrentWinnersPage(currentWinnersPage - 1);
          }}
        >
          PREV
        </CommonButton>
        <CommonButton
          isBlocked={isNextWinnerButtonBlocked}
          onClick={() => {
            setCurrentWinnersPage(currentWinnersPage + 1);
          }}
        >
          NEXT
        </CommonButton>
      </div>
    </div>
  );
}

export default Winners;
