import { activePagination, setPagination } from "./pagination.js";

const BASE_URL = "https://restcountries.eu/rest/v2";
const searchInput = document.getElementById("country");

const parseJson = (res) => res.json();

const setData = (pages, countries) => {
  setPagination("data", countries);
  setPagination("maxPages", pages);
  activePagination(true);
};

export const getRegion = async ({ name, params }) => {
  try {
    const countries = await fetch(
      `${BASE_URL}/region/${name}${params ? params : ""}`
    ).then(parseJson);
    const pages = countries.length / 5;

    setData(pages, countries);
  } catch (err) {
    throw new Error("Erro ao buscar região:", err);
  }
};

export const getCountry = async (name) => {
  try {
    const countries = await fetch(
      `${BASE_URL}/name/${name}?fullText=true`
    ).then(parseJson);

    return countries[0];
  } catch (err) {
    throw new Error("Erro ao buscar país:", err);
  }
};

export const getCountries = async ({ path, name, params }) => {
  try {
    const countries = await fetch(
      `${BASE_URL}${path}/${name}${params ? params : ""}`
    ).then(parseJson);
    const pages = countries.length / 5;

    if (countries?.status) {
      searchInput.value = "";
      return searchInput.setAttribute("placeholder", "Nenhum país encontrado");
    }

    setData(pages, countries);
    return countries;
  } catch (err) {
    throw new Error("Erro ao buscar países:", err);
  }
};

export const getCountriesNames = async (name) => {
  try {
    const names = await fetch(`${BASE_URL}/name/${name}?fields=name`).then(
      parseJson
    );

    return names;
  } catch (err) {
    throw new Error("Erro ao buscar sugestões:", err);
  }
};
