import { searchByName, searchBySelect } from "./Utils/search.js";
import { getPage } from "./pagination.js";

import renderCountries from "./preview.js";

const FIRST_PAGE = 1;

const searchName = document.getElementById("search");
const searchInput = document.getElementById("country");
const searchRegion = document.querySelector(".search__select__region");

const selectAction = async ({ target }) => {
  await searchBySelect(target.value);
  const countries = getPage(FIRST_PAGE);

  renderCountries(countries);
};

const formAction = async (event) => {
  event.preventDefault();
  searchInput.classList.remove("error");

  await searchByName(searchInput.value);
  const countries = getPage(FIRST_PAGE);

  renderCountries(countries);
};

searchRegion.addEventListener("change", selectAction);
searchName.addEventListener("submit", formAction);

searchInput.addEventListener("blur", ({ target }) => {
  target.placeholder = "Digite o nome de um país";
  target.classList.remove("error");
});
