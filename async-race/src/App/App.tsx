/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { HashRouter } from 'react-router-dom';
import CarService from '../Components/API/carServices';
import animation from '../Components/utils/animation';
import generateRandomCars from '../Components/utils/generateRandomCars';
import handleIsButtonBlocked from '../Components/utils/handleIsButtonBlocked';
import useFetching from '../hooks/useFetching';
import {
  IAnimationStore, IFrames, TButtonStopEngineDisabled, TCar, TCarsData, TWinnersData,
} from '../types/types';
import RootRouter from './RootRouter';

function App() {
  // array of cars from server, all cars count
  let boo = false;
  const frames = useRef<IFrames>({});
  const [cars, setCars] = useState<TCarsData | null>(null);
  const [winners, setWinners] = useState<TWinnersData | null>(null);
  const [winnerCar, setWinnerCar] = useState({ id: 0, name: '', time: '' });
  const [winnerCarDataModal, setWinnerCarDataModal] = useState({ id: 0, name: '', time: '' });
  const [showWinnerCar, setShowWinnerCar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentWinnersPage, setCurrentWinnersPage] = useState(1);
  const [currentWidthOfTrack, setCurrentWidthOfTrack] = useState(0);
  const [
    isButtonStopEngineDisabled,
    setIsButtonStopEngineDisabled,
  ] = useState<TButtonStopEngineDisabled | []>([]);
  const [animationStore, setAnimationStore] = useState<IAnimationStore[] | []>([]);
  const [goRace] = useFetching(async () => {
    const response = cars?.cars.map(async (item) => CarService.engineStart(item.id));
    const result = await Promise.all(response!);
    const animationData = result.map(
      (item, index) => (
        { id: cars?.cars[index].id, speed: Math.ceil(item.distance / item.velocity) }
      ),
    );
    animationData.forEach(async (item, index) => {
      if (item.id) {
        const key = String(item.id);
        frames.current[key] = animation(
          animationStore[index].carImage!,
          currentWidthOfTrack,
          item.speed,
        );
      }
      const mistake = await CarService.driveCar(item.id!);
      if (!mistake && item.id) {
        cancelAnimationFrame(frames.current[item.id].id);
      } else if (!boo) {
        const winner = cars?.cars.find((car) => car.id === item.id) as TCar;
        boo = true;
        setShowWinnerCar(true);
        setWinnerCar({ id: item.id!, name: winner.name, time: (item.speed / 1000).toFixed(2) });
        setWinnerCarDataModal(
          {
            id: item.id!,
            name: winner.name,
            time: (item.speed / 1000).toFixed(2),
          },
        );
      }
    });
    const buttons = isButtonStopEngineDisabled.map((el) => ({ ...el, disabled: !el.disabled }));
    setIsButtonStopEngineDisabled(buttons);
  });

  const [stopRace] = useFetching(async () => {
    boo = true;
    cars?.cars.forEach(async (item, index) => {
      await CarService.engineStop(item.id);
      cancelAnimationFrame(frames.current[item.id].id);
      animationStore[index].carImage!.transform = `translateX(${0}px)`;
    });
    const buttons = isButtonStopEngineDisabled.map((el) => ({ ...el, disabled: !el.disabled }));
    setIsButtonStopEngineDisabled(buttons);
  });

  const [createdCar, setCreated] = useState({ name: '', color: '#ffffff' });
  const [updatedCar, setUpdatedCar] = useState<TCar>({ name: '', color: '#ffffff', id: 0 });

  const [getCars, isLoadingCars, errorLoadingCars] = useFetching(async () => {
    const carsData = await CarService.getCars(currentPage);
    setCars(carsData);
  });
  const [getWinners] = useFetching(async () => {
    const winnersData = await CarService.getWinners(currentWinnersPage);
    setWinners(winnersData);
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
      if (!animationStore.length) {
        const animationsArr = cars.cars.map((item) => ({ id: item.id, carImage: undefined }));
        setAnimationStore(animationsArr);
      } else {
        const lastUpdatedCar: IAnimationStore[] = [
          ...animationStore,
          {
            id: cars.cars[cars.cars.length - 1].id,
            carImage: undefined,
          }].filter((elem) => ids.includes(elem.id));
        setAnimationStore(lastUpdatedCar);
      }
    }
  }, [cars]);

  useEffect(() => {
    if (winnerCar.name) {
      CarService.saveWinner(Number(winnerCar.time), winnerCar.id);
      setWinnerCar({ id: 0, name: '', time: '' });
    }
  }, [winnerCar]);

  useEffect(() => {
    getWinners();
  }, [currentWinnersPage]);

  const handleStartEngineButton = async (id: number) => {
    const currentCarImg = animationStore.find((car) => car.id === id);
    const response = await CarService.engineStart(id);
    const currentSpeed = Math.ceil(response.distance / response.velocity);
    if (currentCarImg?.carImage) {
      frames.current[id] = animation(currentCarImg.carImage, currentWidthOfTrack, currentSpeed);
    }
    const buttons = isButtonStopEngineDisabled.map(
      (el) => (
        el.id === id
          ? { ...el, disabled: !el.disabled } : el),
    );
    setIsButtonStopEngineDisabled(buttons);
    handleIsButtonBlocked(isButtonStopEngineDisabled, id);

    const mistake = await CarService.driveCar(id);
    if (!mistake) {
      cancelAnimationFrame(frames.current[id].id);
    }
  };

  const handleStopEngineButton = async (id: number) => {
    const currentCarImg = animationStore.find((car) => car.id === id);
    await CarService.engineStop(id);
    cancelAnimationFrame(frames.current[id].id);
    if (currentCarImg?.carImage) currentCarImg.carImage.transform = `translateX(${0}px)`;
    const buttons = isButtonStopEngineDisabled.map(
      (el) => (el.id === id
        ? { ...el, disabled: !el.disabled } : el),
    );
    setIsButtonStopEngineDisabled(buttons);
    handleIsButtonBlocked(isButtonStopEngineDisabled, id);
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
        isButtonStopEngineDisabled={isButtonStopEngineDisabled}
        setIsButtonStopEngineDisabled={setIsButtonStopEngineDisabled}
        animationStore={animationStore}
        setAnimationStore={setAnimationStore}
        goRace={goRace}
        winnerCarDataModal={winnerCarDataModal}
        showWinnerCar={showWinnerCar}
        setShowWinnerCar={setShowWinnerCar}
        stopRace={stopRace}
        handleStartEngineButton={handleStartEngineButton}
        handleStopEngineButton={handleStopEngineButton}
        winners={winners}
        setWinners={setWinners}
        currentWinnersPage={currentWinnersPage}
        setCurrentWinnersPage={setCurrentWinnersPage}
      />
    </HashRouter>

  );
}

export default App;
