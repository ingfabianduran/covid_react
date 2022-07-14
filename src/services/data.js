const DOMINIO = `https://api.covidtracking.com`;

const getEstados = async() => {
  const res = await fetch(`${DOMINIO}/v1/states/info.json`);
  const data = await res.json();
  return data;
};

export { getEstados };