const DOMINIO = `https://api.covidtracking.com`;

const getEstados = async() => {
  const res = await fetch(`${DOMINIO}/v1/states/info.json`);
  const data = await res.json();
  return data;
};

const getTestRealizados = async(estado) => {
  const res = await fetch(`${DOMINIO}/v1/states/${estado}/daily.json`);
  const data = await res.json();
  return data;
};

export { getEstados, getTestRealizados };