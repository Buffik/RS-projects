import { TButtonStopEngineDisabled } from '../../types/types';

const handleIsButtonBlocked = (
  arr: TButtonStopEngineDisabled | [],
  carId: number,
) => {
  const currentState = arr.find((car) => car.id === carId);
  if (currentState) return currentState.disabled;
  return true;
  // if (arr.length > 0) {
  //   const result = arr.find((elem) => elem.id === carId)?.disabled;
  //   if (result === undefined) {
  //     return true;
  //   }
  //   return result;
  // }
  // return true;
};

export default handleIsButtonBlocked;
