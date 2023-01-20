import React from 'react';

const handleCarDataInInputs = (
  event: React.ChangeEvent<HTMLInputElement>,
  callback: React.Dispatch<React.SetStateAction<string>>,
) => {
  callback(event.target.value);
};

export default handleCarDataInInputs;
