import { getCountriesPreview, getCountriesNames, getRegion } from "./api.js";

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

const listItem = ({ flag, name, region, capital, population }) => {
  return `
    <li>
      <article>
        <div class="country__flag">
          <img
            src="${flag}"
            alt="${name}, Bandeira" 
          >
        </div>
        
        <button  class="country__button" onclick="detail(${name})">
          <div class="country__description">
              <h2>${name}</h2>
              <span>
                <strong>População:</strong> ${population}
              </span>
              <span>
                <strong>Region:</strong> ${region}
              </span>
              <span>
                <strong>Capital:</strong> ${capital}
              </span>
          </div>
        </button>
      </article>
    </li>
  `;
};

const renderCountries = async (event) => {
  event.preventDefault();
  const { target } = event;

  const countriesList = document.getElementById("countries");
  countriesList.innerHTML = "Loading...";

  const get = {
    FORM: () => getCountriesPreview(searchInput.value),
    SELECT: () => getRegion(target.value),
  };
  const input = target.nodeName;

  const countries = await get[input]();

  countriesList.innerHTML = "";
  countries.forEach((item) => {
    countriesList.innerHTML += listItem(item);
  });
};

searchSelectRegion.addEventListener("change", renderCountries);
search.addEventListener("submit", renderCountries);
