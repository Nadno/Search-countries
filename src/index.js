import { getCountries, getRegion } from "./api.js";
import { getPage, setPagination } from "./pagination.js";
import countryPreview from "./preview.js";

const searchName = document.getElementById("search");
const searchInput = document.getElementById("country");
const searchSelectRegion = document.querySelector(".search__select__region");

let waitToGetValue = 0;

// const suggestCountries = ({ target }) => {
//   if (waitToGetValue) clearTimeout(waitToGetValue);

//   waitToGetValue = setTimeout(searchForNames, 1000);

//   async function searchForNames() {
//     waitToGetValue = 0;
//     const countries = await getCountriesNames(target.value);
//     setDataList(countries);
//   }
// };

// searchInput.addEventListener("keypress", suggestCountries);

export const renderCountries = (countries) => {
  const countriesList = document.getElementById("countries");
  countriesList.innerHTML = "Loading...";

  countriesList.innerHTML = "";
  countries.forEach((item) => {
    countriesList.appendChild(countryPreview(item));
  });
};

export const search = async (element, value, page = 1) => {
  const fields = ["flag","name", "region", "capital", "population"];
  const searchWith = {
    FORM: () =>
      getCountries(
        {
          name: value,
          path: "/name",
          fields,
        }, page),

    SELECT: () =>
      getRegion(
        {
          name: value,
          fields,
        }, page),
  };

  await searchWith[element]();
  const countries = getPage(page);
  renderCountries(countries);
  
  setPagination("element", element);
  setPagination("page", 1);
};


searchSelectRegion.addEventListener("change", async () => {
  const element = "SELECT";
  await search(element, searchSelectRegion.value);
});



searchName.addEventListener("submit", async (e) => {
  e.preventDefault();
  const element = "FORM";
  await search(element, searchInput.value);
});