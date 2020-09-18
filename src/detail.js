import { getCountry, getCountries } from "./api.js";

const detailContainer = document.querySelector(".detail__container");
const result = document.getElementById("result");

function detail(name) {
  detailContainer.classList.add("on");
  result.classList.add("off");

  return renderDetail(name);
};

const getBorders = async (name) => {
  const noPage = 0;

  const path = "/alpha";
  const params = "?fields=name;";
  const countries = await getCountries({ path, name, params }, noPage);
  const button = document.createElement("button");
  const link = document.createElement("a");

  link.href = "#detail";
  button.type = "button";
  button.innerText = countries.name;
  button.className = "button box-shadow";

  button.addEventListener("click", () => renderDetail(countries.name));
  link.appendChild(button);

  return link;
};

const setAndClear = () => {
  const flagEl = document.querySelector("#detail-flag");
  const nameEl = document.querySelector("#detail-country");
  const nativeNameEl = document.querySelector("#detail-native-name");
  const populationEl = document.querySelector("#detail-population");
  const regionEl = document.querySelector("#detail-region");
  const subregionEl = document.querySelector("#detail-subregion");
  const capitalEl = document.querySelector("#detail-capital");
  const topLevelDomainEl = document.querySelector("#detail-domain");
  const currenciesEl = document.querySelector("#detail-currencies");
  const languagesEl = document.querySelector("#detail-languages");
  const borderCountriesEl = document.querySelector("#detail-borders");

  return {
    setDetail: function({
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
    }) {
      const elementMissing = [
        document.querySelector("#detail-flag"),
        document.querySelector("#detail-country"),
        document.querySelector("#detail-native-name"),
        document.querySelector("#detail-population"),
        document.querySelector("#detail-region"),
        document.querySelector("#detail-subregion"),
        document.querySelector("#detail-capital"),
        document.querySelector("#detail-domain"),
        document.querySelector("#detail-currencies"),
        document.querySelector("#detail-languages"),
        document.querySelector("#detail-borders"),
      ].includes(null);

      if (elementMissing) {
        const detail = document.getElementById("detail");
        detail.classList.add("error");
        detail.innerHTML = "Erro ao renderizar a página";
        return;
      }

      flagEl.src = flag;
      flagEl.alt = `${name}, flag`;
      nameEl.innerHTML = name;
      regionEl.innerHTML = region;
      subregionEl.innerHTML = subregion;
      capitalEl.innerHTML = capital;
      populationEl.innerHTML = population;
      nativeNameEl.innerHTML = nativeName;
      topLevelDomainEl.innerHTML = topLevelDomain;

      languagesEl.innerHTML = languages
        .map((lang) => {
          return lang.name;
        })
        .join(", ");

      currenciesEl.innerHTML = currencies
        .map((currency) => {
          return currency.name;
        })
        .join(", ");

      borderCountriesEl.innerHTML = "";
      borders.forEach(async (country) =>
        borderCountriesEl.appendChild(await getBorders(country))
      );
    },

    clearDetail: function() {
      flagEl.src = "";
      flagEl.alt = "country, flag";
      languagesEl = "";
      currenciesEl = "";
      nameEl.innerHTML = "";
      borderCountriesEl = "";
      regionEl.innerHTML = "";
      subregionEl.innerHTML = "";
      capitalEl.innerHTML = "";
      populationEl.innerHTML = "";
      nativeNameEl.innerHTML = "";
      topLevelDomainEl.innerHTML = "";
    },
  };
};

const { setDetail, clearDetail } = setAndClear();

document.getElementById("back-detail").onclick = () => {
  detailContainer.classList.remove("on");
  result.classList.remove("off");
  
  return clearDetail();
};

async function renderDetail(name) {
  const country = await getCountry(name);
  setDetail(country);
}

export default detail;
