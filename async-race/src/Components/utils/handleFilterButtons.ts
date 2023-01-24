import React from 'react';

const handleFilterButtons = (
  filterQueries : { sort: string; order: string; },
  setFilterQueries: React.Dispatch<React.SetStateAction<{ sort: string; order: string;}>>,
) => {
  // eslint-disable-next-line no-unused-expressions
  filterQueries.order === 'ASC'
    ? setFilterQueries({ ...filterQueries, order: 'DESC' })
    : setFilterQueries({ ...filterQueries, order: 'ASC' });
};

export default handleFilterButtons;
