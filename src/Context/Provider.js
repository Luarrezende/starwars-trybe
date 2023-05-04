import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import api from '../services/fetchAPI';

export default function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [options, setOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water']);
  const [filterColumn, setFilterColumn] = useState('population');
  const [filterCompare, setFilterCompare] = useState('maior que');
  const [filterNumber, setFilterNumber] = useState(0);
  const [filterPlanets, setFilterPlanets] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const fetchApi = await api();
      const { results } = await fetchApi;
      const List = results.map((element) => {
        delete element.residents;
        return element;
      });
      setPlanets(List);
    };
    fetch();
  }, []);

  const values = useMemo(() => ({
    planets,
    setPlanets,
    filterName,
    setFilterName,
    options,
    setOptions,
    filterColumn,
    setFilterColumn,
    filterPlanets,
    setFilterPlanets,
    filterCompare,
    setFilterCompare,
    filterNumber,
    setFilterNumber,
  }), [
    planets,
    setPlanets,
    filterName,
    setFilterName,
    options,
    setOptions,
    filterColumn,
    setFilterColumn,
    filterPlanets,
    setFilterPlanets,
    filterCompare,
    setFilterCompare,
    filterNumber,
    setFilterNumber,
  ]);

  return (
    <Context.Provider value={ values }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
