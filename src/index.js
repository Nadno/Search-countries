import search from "./Utils/search.js";

import { selectIsValidValue, searchIsValidValue } from "./Utils/validation.js";

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

const beforeSearch = (elementName) => {
  const path = {
    NAME: "/name",
    REGION: "/region",
  };

  const searchWith = {
    "FORM": async function (e) {
      e.preventDefault();
      searchInput.classList.remove("error");

      const { value } = searchInput;
      if (searchIsValidValue(value)) return await search(path.NAME, value);
    },
    "SELECT": async function ()  {
      const { value } = searchSelectRegion;
      if (selectIsValidValue(value)) return await search(path.REGION, value);
    },
  };

  return searchWith[elementName];
}

searchSelectRegion.addEventListener("change", beforeSearch("SELECT"));
searchName.addEventListener("submit", beforeSearch("FORM"));

searchInput.addEventListener("blur", ({ target }) => {
  target.placeholder = "Digite o nome de um país";
  target.classList.remove("error");
});
