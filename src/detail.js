import { getCountry } from "./api.js";

const detailContainer = document.querySelector("#detail__container");
const result = document.getElementById("result");

function detail(name) {
  detailContainer.classList.add("on");
  result.classList.add("off");

  return renderDetail(name);
}

const getBorders = async (code) => {
  const path = "/alpha";
  const fields = ["name"];
  const { name } = await getCountry(path, { name: code, fields });
  const button = document.createElement("button");
  const link = document.createElement("a");

  link.href = "#detail";
  button.type = "button";
  button.innerText = name;
  button.className = "border__country";

  button.addEventListener("click", () => renderDetail(name));
  link.appendChild(button);

  return link;
};

const joinCountryName = (item) =>
  item
    .map(({ name }) => {
      return name;
    })
    .join(", ");

const setAndClear = () => {
  const flagEl = document.querySelector("#detail-flag");
  const nameEl = document.querySelector("#detail-name");
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
    setDetail: function ({
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
        document.querySelector("#detail-name"),
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
      nameEl.insertAdjacentHTML("afterbegin", name);
      regionEl.insertAdjacentHTML("afterbegin", region);
      subregionEl.insertAdjacentHTML("afterbegin", subregion);
      capitalEl.insertAdjacentHTML("afterbegin", capital);
      populationEl.insertAdjacentHTML(
        "afterbegin",
        population.toLocaleString("basic")
      );
      nativeNameEl.insertAdjacentHTML("afterbegin", nativeName);
      topLevelDomainEl.insertAdjacentHTML("afterbegin", topLevelDomain);

      languagesEl.insertAdjacentHTML("afterbegin", joinCountryName(languages))
      currenciesEl.insertAdjacentHTML("afterbegin", joinCountryName(currencies))
      
      if (borders.length) {
        borderCountriesEl.insertAdjacentHTML(
          "afterbegin",
          "<div><strong>Países próximos: </strong></div>"
        );
        borders.forEach(async (country) =>
          borderCountriesEl.appendChild(await getBorders(country))
        );
      }
    },

    clearDetail: function () {
      flagEl.src = "";
      flagEl.alt = "country, flag";
      languagesEl.innerHTML = "";
      currenciesEl.innerHTML = "";
      nameEl.innerHTML = "";
      borderCountriesEl.innerHTML = "";
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
};

async function renderDetail(name) {
  const path = "/name";
  const fields = [
    "flag",
    "name",
    "region",
    "subregion",
    "capital",
    "population",
    "nativeName",
    "topLevelDomain",
    "currencies",
    "languages",
    "borders",
  ];
  const [country] = await getCountry(path, { name, fields });
  clearDetail();
  setDetail(country);
}

export default detail;
