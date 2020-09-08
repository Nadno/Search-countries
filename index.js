const search = document.getElementById("search");
const searchInput = document.getElementById("country");
const searchSelectRegion = document.querySelector(".search__select__region");
const dataList = document.getElementById("founded__countries");

let waitToGetValue = 0;

const parseJson = (res) => {
  try {
    return res.json();
  } catch {
    return null;
  }
};

const setDataList = (countries) => {
  dataList.innerHTML = "";
  countries.forEach((country, index) => {
    if (index > 4) return;
    const option = document.createElement("option");

    option.value = country.name;
    dataList.appendChild(option);
  });
};

searchInput.addEventListener("keypress", ({ target }) => {
  if (waitToGetValue) clearTimeout(waitToGetValue);

  waitToGetValue = setTimeout(searchForNames, 1000);

  async function searchForNames() {
    waitToGetValue = 0;
    const countries = await fetch(
      `https://restcountries.eu/rest/v2/name/${target.value}`
    )
      .then(parseJson)
      .catch(console.log);
    setDataList(countries);
  }
});

search.onsubmit = (event) => {
  event.preventDefault();
};
