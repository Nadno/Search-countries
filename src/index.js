import { getCountries, getCountriesNames, getRegion } from "./api.js";
import { countryPreview } from "./countryElement.js";

const search = document.getElementById("search");
const searchInput = document.getElementById("country");
const searchSelectRegion = document.querySelector(".search__select__region");
const dataList = document.getElementById("founded__countries");

let waitToGetValue = 0;

const setDataList = (countries) => {
  dataList.innerHTML = "";
  countries.forEach(({ name }, index) => {
    if (index > 4) return;
    const option = document.createElement("option");

    option.value = name;
    dataList.appendChild(option);
  });
};

const suggestCountries = ({ target }) => {
  if (waitToGetValue) clearTimeout(waitToGetValue);

  waitToGetValue = setTimeout(searchForNames, 1000);

  async function searchForNames() {
    waitToGetValue = 0;
    const countries = await getCountriesNames(target.value);
    setDataList(countries);
  }
};

searchInput.addEventListener("keypress", suggestCountries);

const renderCountries = async (event) => {
  event.preventDefault();
  const { target } = event;
  
  const countriesList = document.getElementById("countries");
  countriesList.innerHTML = "Loading...";

  const PARAMS = '?fields=flag;name;region;capital;population;';
  const get = {
    FORM: () => getCountries('/name', searchInput.value, PARAMS),
    SELECT: () => getRegion(target.value, PARAMS),
  };
  const input = target.nodeName;

  const countries = await get[input]();
  console.log(countries);
  countriesList.innerHTML = "";
  countries.forEach((item) => {
    countriesList.appendChild(countryPreview(item));
  });
};

searchSelectRegion.addEventListener("change", renderCountries);
search.addEventListener("submit", renderCountries);