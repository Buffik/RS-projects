import React from 'react';
import CarImage from '../../Components/Car/CarImage/CarImage';
import CarTemplate from '../../Components/Car/CarTemplate/CarTemplate';
import TestForMain from '../../Components/TestForMain';

function Main() {
  const testArr = [1, 2, 3, 4];

  // Рендерим 4 компонента на основе массива, передаем в каждый компонент пропсы из массива
  // При таком рендере важно указывать key для каждого компонента. Он должен быть уникальным
  return (
    <div>
      <CarImage color="#000000" />
      <CarImage color="#993333" />
      <CarTemplate color="blue" carName="Tesla" />
      {
            testArr.map((item) => <TestForMain key={item} number={item} />)
        }
    </div>
  );
}

export default Main;
