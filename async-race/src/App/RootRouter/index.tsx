import React, { SetStateAction } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../../Components/header';
import Main from '../../Pages/Main/Main';
import Other from '../../Pages/Other';
import {
  IAnimationStore, TButtonStopEngineDisabled, TCar, TCarsData, TWinnersData,
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
  setCurrentWidthOfTrack: React.Dispatch<React.SetStateAction<number>>
  isButtonStopEngineDisabled: TButtonStopEngineDisabled | []
  animationStore: [] | IAnimationStore[]
  setAnimationStore: React.Dispatch<SetStateAction<[] | IAnimationStore[]>>
  goRace: () => Promise<void>
  winnerCarDataModal: {
    name: string;
    time: string;
    }
  showWinnerCar: boolean
  setShowWinnerCar: React.Dispatch<React.SetStateAction<boolean>>
  stopRace: () => Promise<void>
  handleStartEngineButton: (id: number) => Promise<void>
  handleStopEngineButton: (id: number) => Promise<void>
  winners: TWinnersData | null
  setWinners: React.Dispatch<React.SetStateAction<TWinnersData | null>>
  currentWinnersPage: number
  setCurrentWinnersPage: React.Dispatch<React.SetStateAction<number>>
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
  setCurrentWidthOfTrack,
  isButtonStopEngineDisabled,
  animationStore,
  setAnimationStore,
  goRace,
  winnerCarDataModal,
  showWinnerCar,
  setShowWinnerCar,
  stopRace,
  handleStartEngineButton, handleStopEngineButton,
  winners, setWinners,
  currentWinnersPage, setCurrentWinnersPage,
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
              setCurrentWidthOfTrack={setCurrentWidthOfTrack}
              isButtonStopEngineDisabled={isButtonStopEngineDisabled}
              animationStore={animationStore}
              setAnimationStore={setAnimationStore}
              goRace={goRace}
              winnerCarDataModal={winnerCarDataModal}
              showWinnerCar={showWinnerCar}
              setShowWinnerCar={setShowWinnerCar}
              stopRace={stopRace}
              handleStartEngineButton={handleStartEngineButton}
              handleStopEngineButton={handleStopEngineButton}
            />
)}
        />
        <Route
          path="/winners"
          element={(
            <Other
              winners={winners}
              setWinners={setWinners}
              currentWinnersPage={currentWinnersPage}
              setCurrentWinnersPage={setCurrentWinnersPage}
            />
)}
        />
      </Routes>
    </div>
  );
}
