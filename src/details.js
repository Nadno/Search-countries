import { getCountry, getCountries } from "./api.js";

const getBorders = async (country) => {
  const { name } = await getCountries("/alpha", country, "?fields=name;");
  const button = document.createElement("button");

  button.classList.add("box-shadow");
  button.type = "button";
  button.innerText = name;

  button.addEventListener("click", () => renderDetail(name));

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

  flagDiv.classList.add("country__flag");
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

  bordersCountries.classList.add("border__countries");

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
