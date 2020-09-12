const BASE_URL = "https://restcountries.eu/rest/v2";

const parseJson = (res) => {
  return res.json();
};

export const getRegion = async (name) => {
  const countries = await fetch(`${BASE_URL}/region/${name}?fields=flag;name;region;capital;population;`)
    .then(parseJson);

    return countries;
};

export const getCountriesPreview = async (name) => {
  try {
    const countries = await fetch(`${BASE_URL}/name/${name}/`)
      .then(parseJson);

    return countries;
  } catch (err) {
    throw new Error("Erro ao pegar dados:", err);
  }
};

export const getCountriesNames = async (name) => {
  try {
    const names = await fetch(`${BASE_URL}/name/${name}?fields=name`)
      .then(parseJson);
      
      return names;
    } catch (err) {
      throw new Error("Erro ao pegar dados:", err);
    }
};