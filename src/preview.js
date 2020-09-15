import renderDetail from "./details.js";

function detail(name) {
  const detailContainer = document.querySelector(".detail__container");
  const result = document.getElementById("result");

  detailContainer.classList.toggle("on");
  result.classList.toggle("off");

  return renderDetail(name);
};

const countryPreview = ({ flag, name, region, capital, population }) => {
  const li = document.createElement("li");
  const article = document.createElement("article");
  const button = document.createElement("button");
  const flagDiv = document.createElement("div");

  article.classList.add("box-shadow");
  flagDiv.classList.add("country__flag");
  flagDiv.innerHTML = `
    <img
      src="${flag}"
      alt="${name}, Bandeira" 
    >
  `;

  button.classList.add("country__button");
  button.type = "button";
  button.addEventListener("click", () => detail(name));
  button.innerHTML = `
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
  `;

  article.appendChild(flagDiv);
  article.appendChild(button);
  li.appendChild(article);

  return li;
};

export default countryPreview;