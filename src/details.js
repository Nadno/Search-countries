import { getCountry, getCountries } from "./api.js";

const getBorders = async (name) => {
  const noPage = 0;

  const path = "/alpha";
  const params = "?fields=name;";
  const { countries } = await getCountries({ path, name, params }, noPage);

  const button = document.createElement("button");

  button.type = "button";
  button.innerText = countries.name;
  button.className = "box-shadow";
  button.addEventListener("click", () => renderDetail(countries.name));

  return button;
};

const countryDetails = ({
  flag,
  name,
  region,
  subregion,
  capital,
  population,
  nativeName,
  topLevelDomain,
  currencies,
  languages,
  borders,
}) => {
  const divMain = document.createElement("div");
  const flagDiv = document.createElement("div");
  const description = document.createElement("div");
  const bordersCountries = document.createElement("div");

  flagDiv.className = "country__flag";
  flagDiv.innerHTML = `
    <img
      src="${flag}"
      alt="${name}, Bandeira" 
    >
  `;

  description.innerHTML = `
    <div class="country__description">
      <h2>${name}</h2>
      <span> <strong>Native Name:</strong> ${nativeName}</span>
      <span> <strong>População:</strong> ${population}</span>
      <span> <strong>Region:</strong> ${region}</span>
      <span> <strong>Sub Region:</strong> ${subregion}</span>
      <span> <strong>Capital:</strong> ${capital}</span>

      <br />
      <br />

      <span> <strong>Top Level Domain:</strong> ${topLevelDomain} </span>
      <span> <strong>Currencies:</strong> 
        ${currencies
          .map((currency) => {
            return currency.name;
          })
          .join(", ")} 
      </span>
      <span> <strong>Languages:</strong> 
        ${languages
          .map((lang) => {
            return lang.name;
          })
          .join(", ")}
      </span>
    </div>
  `;

  bordersCountries.className = "border__countries";

  borders.forEach(async (country) =>
    bordersCountries.appendChild(await getBorders(country))
  );

  divMain.appendChild(flagDiv);
  divMain.appendChild(description);
  divMain.appendChild(bordersCountries);

  return divMain;
};

async function renderDetail(name) {
  const detailElement = document.getElementById("detail");
  detailElement.innerHTML = "";

  const country = await getCountry(name);
  detailElement.appendChild(countryDetails(country));
}

export default renderDetail;
