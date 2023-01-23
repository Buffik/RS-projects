import React, { MutableRefObject } from 'react';
import { TButtonStopEngineDisabled } from '../../types/types';
import CarService from '../API/carServices';
import updateButtonSingleState from './updateButtonSingleState';

const handleEngineStop = async (
  id: number,
  elem: CSSStyleDeclaration,
  arr: TButtonStopEngineDisabled | [],
  callback: React.Dispatch<React.SetStateAction<TButtonStopEngineDisabled | []>>,
  refRequestId: MutableRefObject<number>,
  setIsStartButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const element = elem;
  try {
    callback(updateButtonSingleState(id, arr));
    await CarService.engineStop(id);
    cancelAnimationFrame(refRequestId.current);
    element.transform = `translateX(${0}px)`;
    setIsStartButtonDisabled(false);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export default handleEngineStop;
