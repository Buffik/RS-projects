/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { HashRouter } from 'react-router-dom';
import CarService from '../Components/API/carServices';
import animation from '../Components/utils/animation';
import generateRandomCars from '../Components/utils/generateRandomCars';
import useFetching from '../hooks/useFetching';
import {
  IAnimationStore, TButtonStopEngineDisabled, TCar, TCarsData, TServerResponseStartEngine,
} from '../types/types';
import RootRouter from './RootRouter';

function App() {
  // array of cars from server, all cars count
  let boo = false;
  const [cars, setCars] = useState<TCarsData | null>(null);
  const [winnerCar, setWinnerCar] = useState({ id: 0, name: '', time: '' });
  const [showWinnerCar, setShowWinnerCar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentWidthOfTrack, setCurrentWidthOfTrack] = useState(0);
  const [
    areButtonsDisabled,
    setAreButtonsDisabled,
  ] = useState<TButtonStopEngineDisabled | []>([]);
  // eslint-disable-next-line max-len
  const [animationStore, setAnimationStore] = useState<IAnimationStore[] | []>([]);
  const [goRace] = useFetching(async () => {
    // eslint-disable-next-line no-return-await
    const response = cars?.cars.map(async (item) => CarService.engineStart(item.id));
    const result = await Promise.all(response!);
    // eslint-disable-next-line max-len
    const animationData = result.map((item, index) => ({ id: cars?.cars[index].id, speed: Math.ceil(item.distance / item.velocity) }));
    animationData.forEach(async (item, index) => {
      // eslint-disable-next-line max-len
      const currentAnimation = animation(animationStore[index].carImage!, currentWidthOfTrack, item.speed);
      const mistake = await CarService.driveCar(item.id!);
      if (!mistake) {
        cancelAnimationFrame(currentAnimation.id);
      } else if (!boo) {
        const winner = cars?.cars.find((car) => car.id === item.id) as TCar;
        boo = true;
        setShowWinnerCar(true);
        setWinnerCar({ id: item.id!, name: winner.name, time: (item.speed / 1000).toFixed(2) });
      }
    });
  });

  const [createdCar, setCreated] = useState({ name: '', color: '#ffffff' });
  const [updatedCar, setUpdatedCar] = useState<TCar>({ name: '', color: '#ffffff', id: 0 });

  const [
    isButtonStopEngineDisabled,
    setIsButtonStopEngineDisabled,
  ] = useState<TButtonStopEngineDisabled | []>([]);

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

  useEffect(() => {
    if (cars) {
      const ids = cars.cars.map((elem) => elem.id);
      const result = cars.cars.map((elem) => {
        const res = { id: elem.id, disabled: true };
        return res;
      });
      setIsButtonStopEngineDisabled(result);
      // eslint-disable-next-line max-len
      if (!animationStore.length) {
        const animationsArr = cars.cars.map((item) => ({ id: item.id, carImage: undefined }));
        setAnimationStore(animationsArr);
        console.log('NEW CREATE :', animationStore);
      } else {
        console.log(ids);
        // eslint-disable-next-line max-len
        const lastUpdatedCar: IAnimationStore[] = [...animationStore, { id: cars.cars[cars.cars.length - 1].id, carImage: undefined }].filter((elem) => ids.includes(elem.id));
        setAnimationStore(lastUpdatedCar);
        console.log('update :', animationStore);
      }
    }
  }, [cars]);

  useEffect(() => {
    if (winnerCar.name) {
      console.log(winnerCar);
    }
  }, [winnerCar]);

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
        isButtonStopEngineDisabled={isButtonStopEngineDisabled}
        setIsButtonStopEngineDisabled={setIsButtonStopEngineDisabled}
        animationStore={animationStore}
        setAnimationStore={setAnimationStore}
        goRace={goRace}
        winnerCar={winnerCar}
        showWinnerCar={showWinnerCar}
        setShowWinnerCar={setShowWinnerCar}
      />
    </HashRouter>

  );
}

export default App;
