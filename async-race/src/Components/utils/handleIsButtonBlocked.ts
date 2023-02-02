import { TButtonStopEngineDisabled } from '../../types/types';

const handleIsButtonBlocked = (
  arr: TButtonStopEngineDisabled | [],
  carId: number,
) => {
  const currentState = arr.find((car) => car.id === carId);
  if (currentState) return currentState.disabled;
  return true;
};

export default handleIsButtonBlocked;
