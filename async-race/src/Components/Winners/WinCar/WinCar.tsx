import React from 'react';
import CarImageSmall from './carImageSmall/CarImageSmall';
import styles from './winCar.module.scss';

interface IWinCar {
  order: number
  img: string
  name: string
  wins: number
  time: number
}

function WinCar({
  order, img, name, wins, time,
}: IWinCar) {
  return (
    <tr className={styles.wrapper}>
      <td>{order}</td>
      <td><CarImageSmall color={img} /></td>
      <td>{name}</td>
      <td>{wins}</td>
      <td>{time}</td>
    </tr>
  );
}

export default WinCar;
