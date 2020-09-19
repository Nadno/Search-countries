import config from "./Utils/config.js";
import { activePagination, setPagination } from "./pagination.js";

const BASE_URL = "https://restcountries.eu/rest/v2";
const searchInput = document.getElementById("country");

const parseJson = (res) => res.json();

const setData = (pages, countries) => {
  setPagination("data", countries);
  setPagination("maxPages", pages);
  activePagination(true);
};

export const getRegion = async ({ name, fields }) => {
  try {
    const countries = await fetch(
      `${BASE_URL}/region/${name}${fields ? "?fields=" + fields.join(";") : ""}`
    ).then(parseJson);
    const pages = countries.length / config.itemsForPage;

    setData(pages, countries);
  } catch (err) {
    throw new Error("Erro ao buscar região:", err);
  }
};

export const getCountry = async (path, { name, fields }) => {
  try {
    const country = await fetch(
      `${BASE_URL}${path}/${name}?fullText=true${fields ? "?&fields=" + fields.join(";") : ""}`
    ).then(parseJson);

    return country;
  } catch (err) {
    throw new Error("Erro ao buscar país:", err);
  }
};

export const getCountries = async ({ path, name, fields }) => {
  try {
    const countries = await fetch(
      `${BASE_URL}${path}/${name}${fields ? "?fields=" + fields.join(";") : ""}`
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
