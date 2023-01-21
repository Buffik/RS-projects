/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import CarService from '../Components/API/carServices';
import generateRandomCars from '../Components/utils/generateRandomCars';
import useFetching from '../hooks/useFetching';
import { TCar, TCarsData } from '../types/types';
import RootRouter from './RootRouter';

function App() {
  // array of cars from server, all cars count
  const [cars, setCars] = useState<TCarsData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [currentWidthOfTrack, setCurrentWidthOfTrack] = useState(0);
  console.log(currentWidthOfTrack);

  const [createdCar, setCreated] = useState({ name: '', color: '#ffffff' });
  const [updatedCar, setUpdatedCar] = useState<TCar>({ name: '', color: '#ffffff', id: 0 });

  const [getCars, isLoadingCars, errorLoadingCars] = useFetching(async () => {
    const carsData = await CarService.getCars(currentPage);
    setCars(carsData);
  });

  const [createManyCars] = useState(generateRandomCars());

  const handleGenerateCarsButton = async () => {
    try {
      await CarService.createMultipleCars(createManyCars);
      getCars();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };
  return (
    <HashRouter>
      <RootRouter
        cars={cars}
        getCars={getCars}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        createdCar={createdCar}
        setCreated={setCreated}
        updatedCar={updatedCar}
        setUpdatedCar={setUpdatedCar}
        handleGenerateCarsButton={handleGenerateCarsButton}
        currentWidthOfTrack={currentWidthOfTrack}
        setCurrentWidthOfTrack={setCurrentWidthOfTrack}
      />
    </HashRouter>

  );
}

export default App;
