import detail from "./detail.js";

const PREVIEW_BUTTON = {
  type: "button",
  className: "preview__button",
};

const countryPreview = ({ flag, name, region, capital, population }) => {
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
    <div class="country__description">
      <h2>${name}</h2>
      <span>
        <strong>População:</strong>
        ${population}
      </span>
      <span>
        <strong>Region:</strong>
        ${region}
      </span>
      <span>
        <strong>Capital:</strong>
        ${capital}
      </span>
    </div>
  `;

  li.className = "preview border-radius";
  flagDiv.className = "flag__container border-radius";
  flagDiv.insertAdjacentHTML("beforeend", PREVIEW_FLAG);
  button.appendChild(flagDiv);
  
  button.insertAdjacentHTML("beforeend", PREVIEW_DESCRIPTION);
  article.className = "preview__article box-shadow border-radius";

  Object.assign(button, PREVIEW_BUTTON);
  button.addEventListener("click", () => detail(name));
  article.appendChild(button);

  li.appendChild(article);

  return li;
};

export default countryPreview;
