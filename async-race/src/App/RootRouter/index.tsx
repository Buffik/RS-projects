import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../../Components/header';
import Main from '../../Pages/Main/Main';
import Other from '../../Pages/Other';
import { TCar, TCarsData } from '../../types/types';

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
            />
)}
        />
        <Route path="/other" element={<Other />} />
      </Routes>
    </div>
  );
}
