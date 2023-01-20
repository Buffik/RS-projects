import CarService from '../API/carServices';
import { THandleSingleCarDataSendToServer, whatTodoWithCar } from '../../types/types';

const handleSingleCarDataSendToServer: THandleSingleCarDataSendToServer = async (
  carName,
  carColor,
  action,
  getCars,
  id,
) => {
  if (action === whatTodoWithCar.create) {
    try {
      await CarService.createCar({ name: carName, color: carColor });
      getCars();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
  if (action === whatTodoWithCar.update && id) {
    try {
      await CarService.updateCar(id, { name: carName, color: carColor });
      getCars();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};

export default handleSingleCarDataSendToServer;
