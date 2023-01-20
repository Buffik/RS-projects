import React from 'react';

export type TCar = {
  name: string,
  color: string,
  id: number
};

export type TCarCreate = {
  name: string,
  color: string,
}

export type TCarsData = {
  cars: TCar[]
  allCarsCount: string | null
}

export type THandleSingleCarDataSendToServer = (
  carName: string,
  carColor: string,
  action: 'create' | 'update',
  getCars: () => Promise<void>,
  shouldUpdateCars: number,
  setShouldUpdateCars: React.Dispatch<React.SetStateAction<number>>,
  id?:number,
) => void

// eslint-disable-next-line no-shadow
export enum whatTodoWithCar { create = 'create', update = 'update' }
