import { TButtonStopEngineDisabled } from '../../types/types';

const updateButtonSingleState = (
  id: number,
  arr: TButtonStopEngineDisabled | [],
) => arr.map((item) => {
  // eslint-disable-next-line no-param-reassign
  if (item.id === id) item.disabled = !item.disabled;
  return item;
});

export default updateButtonSingleState;
