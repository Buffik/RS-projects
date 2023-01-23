// import React from 'react';

export type TCar = {
  name: string,
  color: string,
  id: number
};

export type TWinner = {
  wins: number,
  time: number,
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

export type TWinnersData = {
  winnerCars: TWinner[]
  allCarsCount: string | null
}

export type THandleSingleCarDataSendToServer = (
  carName: string,
  carColor: string,
  action: 'create' | 'update',
  getCars: () => Promise<void>,
  id?:number,
) => void

// eslint-disable-next-line no-shadow
export enum whatTodoWithCar { create = 'create', update = 'update' }

export type TButtonStopEngineDisabled = { id: number, disabled: boolean }[]

export type TServerResponseStartEngine = {
  velocity: number
  distance: number
};

export interface IAnimationStore {
  id: number
  carImage: CSSStyleDeclaration | undefined
}

export interface IFrames {
  [key: string] : {id: number}
}
