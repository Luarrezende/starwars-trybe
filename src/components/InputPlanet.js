import React, { useContext } from 'react';
import Context from '../Context/Context';

export default function InputPlanet() {
  const {
    filterName,
    setFilterName,
    options,
    // setFilterPlanets,
    // filterPlanets,
    planets,
    // setOptions,
    filterColumn,
    setFilterColumn,
    filterCompare,
    setFilterCompare,
    filterNumber,
    setFilterNumber,
    setPlanets,
  } = useContext(Context);

  // useEffect(() => {
  // }, [planets, filterPlanets, setFilterPlanets, filterCompare]);

  const handleFilter = () => {
    switch (filterCompare) {
    case 'maior que':
      return (
        setPlanets(planets
          .filter((planet) => Number(planet[filterColumn])
            > Number(filterNumber)))
      );
    case 'menor que':
      return (
        setPlanets(planets
          .filter((planet) => Number(planet[filterColumn])
        < Number(filterNumber)))
      );
    case 'igual a':
      return (
        setPlanets(planets
          .filter((planet) => Number(planet[filterColumn])
          === Number(filterNumber)))
      );
    default:
    }
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
    </form>
  );
}
