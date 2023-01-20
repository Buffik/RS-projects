import React from 'react';

type TGoPrev = (
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
) => void

const goPrev: TGoPrev = () => {
  console.log('asd');
};

export default goPrev;
