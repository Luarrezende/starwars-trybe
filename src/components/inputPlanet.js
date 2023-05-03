import React, { useContext } from 'react';
import Context from '../Context/Context';

export default function InputPlanet() {
  const { filterName, setFilterName } = useContext(Context);
  return (
    <input
      type="text"
      data-testid="name-filter"
      onChange={ ({ target }) => setFilterName(target.value) }
      value={ filterName }
    />
  );
}
