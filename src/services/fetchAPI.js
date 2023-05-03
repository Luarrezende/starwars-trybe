const func = async () => {
  const urlApi = 'https://swapi.dev/api/planets';
  const response = await fetch(urlApi);
  const data = await response.json();
  return data;
};

export default func;
