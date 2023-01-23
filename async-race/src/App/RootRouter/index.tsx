import React, { SetStateAction } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../../Components/header';
import Main from '../../Pages/Main/Main';
import Other from '../../Pages/Other';
import {
  IAnimationStore, TButtonStopEngineDisabled, TCar, TCarsData,
} from '../../types/types';

interface IRootRouter {
  cars: TCarsData | null
  getCars: () => Promise<void>
  handleGenerateCarsButton: () => void
  currentPage: number
  createdCar: {name: string; color: string;}
  setCreated: React.Dispatch<React.SetStateAction<{name: string; color: string;}>>
  updatedCar: TCar
  setUpdatedCar: React.Dispatch<React.SetStateAction<TCar>>
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  currentWidthOfTrack: number
  setCurrentWidthOfTrack: React.Dispatch<React.SetStateAction<number>>
  isButtonStopEngineDisabled: TButtonStopEngineDisabled | []
  setIsButtonStopEngineDisabled:React.Dispatch<React.SetStateAction<TButtonStopEngineDisabled | []>>
  animationStore: [] | IAnimationStore[]
  setAnimationStore: React.Dispatch<SetStateAction<[] | IAnimationStore[]>>
  goRace: () => Promise<void>
  winnerCar: {
    name: string;
    time: string;
    }
  showWinnerCar: boolean
  setShowWinnerCar: React.Dispatch<React.SetStateAction<boolean>>
  stopRace: () => Promise<void>
  handleStartEngineButton: (id: number) => Promise<void>
  handleStopEngineButton: (id: number) => Promise<void>

}

export default function RootRouter({
  handleGenerateCarsButton,
  cars,
  getCars,
  currentPage,
  createdCar,
  setCreated,
  updatedCar,
  setUpdatedCar,
  setCurrentPage,
  currentWidthOfTrack,
  setCurrentWidthOfTrack,
  isButtonStopEngineDisabled,
  setIsButtonStopEngineDisabled,
  animationStore,
  setAnimationStore,
  goRace,
  winnerCar,
  showWinnerCar,
  setShowWinnerCar,
  stopRace,
  handleStartEngineButton, handleStopEngineButton,
}: IRootRouter) {
  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={(
            <Main
              cars={cars}
              getCars={getCars}
              handleGenerateCarsButton={handleGenerateCarsButton}
              currentPage={currentPage}
              createdCar={createdCar}
              setCreated={setCreated}
              updatedCar={updatedCar}
              setUpdatedCar={setUpdatedCar}
              setCurrentPage={setCurrentPage}
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
              stopRace={stopRace}
              handleStartEngineButton={handleStartEngineButton}
              handleStopEngineButton={handleStopEngineButton}
            />
)}
        />
        <Route path="/winners" element={<Other />} />
      </Routes>
    </div>
  );
}
