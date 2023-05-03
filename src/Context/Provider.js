import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import api from '../services/fetchAPI';

export default function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterName, setFilterName] = useState('');

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
  }), [planets, filterName, setFilterName]);

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
