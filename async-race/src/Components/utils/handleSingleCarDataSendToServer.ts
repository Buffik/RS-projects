import CarService from '../API/carServices';
import { THandleSingleCarDataSendToServer } from '../../types/types';
import handleNumberOfCarsAtCurrentPage from './handleNumberOfCarsAtCurrentPage';

const handleSingleCarDataSendToServer: THandleSingleCarDataSendToServer = async (
  carName,
  carColor,
  action,
  getCars,
  shouldUpdateCars,
  setShouldUpdateCars,
  id,
) => {
  if (action === 'create') {
    try {
      await CarService.createCar({ name: carName, color: carColor });
      handleNumberOfCarsAtCurrentPage(shouldUpdateCars, setShouldUpdateCars);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
  if (action === 'update' && id) {
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
