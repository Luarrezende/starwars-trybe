import React, { useContext, useEffect } from 'react';
import Context from '../Context/Context';

export default function InputPlanet() {
  const {
    filterName,
    setFilterName,
    options,
    setFilterPlanets,
    filterPlanets,
    planets,
    setOptions,
    filterColumn,
    setFilterColumn,
    filterCompare,
    setFilterCompare,
    filterNumber,
    setFilterNumber,
    // setPlanets,
    data,
    setData,
  } = useContext(Context);

  useEffect(() => {
    setData(planets);
  }, [setData, planets]);

  useEffect(() => {
    setFilterColumn(options[0]);
  }, [setFilterColumn, options]);

  const handleFilter = () => {
    setOptions(options.filter((option) => option !== filterColumn));
    switch (filterCompare) {
    case 'maior que':
      return (
        setData(data
          .filter((planet) => Number(planet[filterColumn])
            > Number(filterNumber))),
        setFilterPlanets([...filterPlanets,
          { filterColumn, filterCompare, filterNumber }])
      );
    case 'menor que':
      return (
        setData(data
          .filter((planet) => Number(planet[filterColumn])
        < Number(filterNumber))),
        setFilterPlanets([...filterPlanets,
          { filterColumn, filterCompare, filterNumber }])
      );
    case 'igual a':
      return (
        setData(data
          .filter((planet) => Number(planet[filterColumn])
          === Number(filterNumber))),
        setFilterPlanets([...filterPlanets,
          { filterColumn, filterCompare, filterNumber }])
      );
    default:
    }
  };

  const deleteOneFilter = (planet) => {
    const newFilter = filterPlanets.filter((filter) => filter.filterColumn !== planet);

    setFilterPlanets([...newFilter]);

    options.push(planet);

    let newData = [...planets];

    newFilter.forEach((filter) => {
      if (filter.filterCompare === 'maior que') {
        newData = newData
          .filter((item) => Number(item[filter.filterColumn])
            > Number(filter.filterNumber));
      }
      if (filter.filterCompare === 'menor que') {
        newData = newData
          .filter((item) => Number(item[filter.filterColumn])
            < Number(filter.filterNumber));
      }
      if (filter.filterCompare === 'igual a') {
        newData = newData
          .filter((item) => Number(item[filter.filterColumn])
            === Number(filter.filterNumber));
      }
    });
    setData([...newData]);
  };

  const deleteAllFilters = () => {
    setFilterPlanets([]);
    setData([...planets]);
    setOptions(['population', 'orbital_period', 'diameter',
      'rotation_period', 'surface_water']);
  };

  return (
    <form>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ ({ target }) => setFilterName(target.value) }
        value={ filterName }
      />

      <select
        data-testid="column-filter"
        onChange={ ({ target }) => setFilterColumn(target.value) }
        value={ filterColumn }
      >
        {
          options.map((element, index) => (
            <option
              key={ index }
              value={ element }
            >
              {element}
            </option>))
        }
      </select>

      <select
        data-testid="comparison-filter"
        value={ filterCompare }
        onChange={ ({ target }) => setFilterCompare(target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        onChange={ ({ target }) => setFilterNumber(target.value) }
        value={ filterNumber }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleFilter }
      >
        AddFiltro

      </button>
      {
        filterPlanets.map((planet) => (
          <div
            data-testid="filter"
            key={ planet.filterColumn }
          >
            {`${planet.filterColumn} ${planet.filterCompare} ${planet.filterNumber}`}
            <button
              type="button"
              data-testid="rmv"
              onClick={ () => deleteOneFilter(planet.filterColumn) }
            >
              x
            </button>
          </div>
        ))
      }
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ deleteAllFilters }
      >
        Remover todas filtragens
      </button>
    </form>
  );
}
