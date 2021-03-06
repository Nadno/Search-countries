import detail from "./detail.js";

const PREVIEW_BUTTON = {
  type: "button",
  className: "preview__button",
};

const preview = ({ flag, name, region, capital, population }) => {
  const li = document.createElement("li");
  const article = document.createElement("article");
  const button = document.createElement("button");
  const flagDiv = document.createElement("div");

  const PREVIEW_FLAG = `
    <img
      class="preview__flag"
      src="${flag}"
      alt="${name}, Bandeira"
    >
  `;
  const PREVIEW_DESCRIPTION = `
    <div class="country__content">
      <p class="country__name">
        <strong>${name}</strong>
      </p>
      <div class="country__detail">
        <p>
          <strong>População:</strong>
          ${population.toLocaleString("basic")}
        </p>
        <p>
          <strong>Region:</strong>
          ${region}
        </p>
        <p>
          <strong>Capital:</strong>
          ${capital}
        </p>
      </div>
    </div>
  `;

  li.title = name;
  li.className = "preview border-radius";
  flagDiv.className = "flag__container";
  flagDiv.insertAdjacentHTML("beforeend", PREVIEW_FLAG);
  
  Object.assign(button, PREVIEW_BUTTON);
  button.addEventListener("click", () => detail(name));
  button.insertAdjacentHTML("beforeend", PREVIEW_DESCRIPTION);

  article.className = "preview__content";
  article.appendChild(flagDiv);
  article.appendChild(button);

  li.appendChild(article);

  return li;
};

const renderCountries = (countries) => {
  const countriesList = document.getElementById("countries");
  if (!countriesList) return;
  
  countriesList.innerHTML = "";
  countries.forEach((country) =>
    countriesList.appendChild(preview(country))
  );
};

export default renderCountries;
