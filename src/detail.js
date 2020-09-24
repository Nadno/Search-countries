import { getCountry } from "./Utils/api.js";
import { detailElementsIsNotOk } from "./Utils/validation.js";
import { transformKey } from "./Utils/style.js";

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

const joinName = (item) =>
  item
    .map(({ name }) => {
      return name;
    })
    .join(", ");

const setDetailElement = (element, value) =>
  document.querySelector(element).insertAdjacentHTML("afterbegin", value);

const clearDetailElement = (element) =>
  (document.querySelector(element).innerHTML = "");

const detailExceptions = ["flag", "borders"];
const renderDetailElement = (detail, country) => {
  if (detailExceptions.includes(detail)) return;
  const element = `#detail-${transformKey(detail)}`;
  clearDetailElement(element);
  setDetailElement(element, country);
};

const setDetail = (country) => {
  if (detailElementsIsNotOk()) {
    const detail = document.getElementById("detail");
    detail.classList.add("error");
    detail.innerHTML = "Erro ao renderizar a página";
    return;
  }
  const { flag, name, borders, currencies, languages, population } = country;
  const flagEl = document.querySelector("#detail-flag");
  const borderCountriesEl = document.querySelector("#detail-borders");

  flagEl.src = flag;
  flagEl.alt = `${name}, flag`;

  Object.assign(country, {
    population: population.toLocaleString("basic"),
    currencies: joinName(currencies),
    languages: joinName(languages),
  });
  
  Object.keys(country)
    .map((detail) => renderDetailElement(detail, country[detail]));

  borderCountriesEl.innerHTML = "";
  if (borders.length) {
    borderCountriesEl.insertAdjacentHTML(
      "afterbegin",
      "<div><strong>Países próximos: </strong></div>"
    );
    borders.forEach(async (country) =>
      borderCountriesEl.appendChild(await getBorders(country))
    );
  }
};

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

  setDetail(country);
}

export default detail;
