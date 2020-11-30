import config from "./Utils/config.js";
import renderCountries from "./preview.js";

const NEXT = "next__page";
const BACK = "back__page";

const pagination = {
  page: 1,
  maxPages: 0,
  countries: [],
};

const disableButton = (button, toggle) =>
  (document.getElementById(button).disabled = toggle);

export const setPagination = ({ countries, pages }, FIRST_PAGE = 1) => {
  Object.assign(pagination, {
    page: FIRST_PAGE,
    maxPages: pages,
    countries,
  });
  disableButton(BACK, true);
};

export const setPageTo = (value) => pagination.page = value;

export const getPage = (page) => {
  const from = (page * config.itemsForPage) - config.itemsForPage;
  const to = page * config.itemsForPage;
  return page
    ? pagination.countries.slice(from, to)
    : pagination.countries;
};

const nextPage = () => {
  const { page, maxPages } = pagination;

  const next = page + 1;
  if (next >= maxPages) disableButton(NEXT, true);
  if (next === 2) disableButton(BACK, false);

  const countries = getPage(next);
  renderCountries(countries);
  setPageTo(next);
};

const backPage = () => {
  const { page, maxPages } = pagination;

  const back = page - 1;
  if (back === 1) disableButton(BACK, true);
  if (back < maxPages) disableButton(NEXT, false);

  const countries = getPage(back);
  renderCountries(countries);
  setPageTo(back);
};

const nextEl = document.getElementById(NEXT);
const backEl = document.getElementById(BACK);

nextEl.addEventListener("click", nextPage);
backEl.addEventListener("click", backPage);

export const activePagination = (toggle) => {
  const page = document.getElementById("page");
  if (pagination.maxPages <= 1) nextEl.disabled = true;

  toggle ? page.classList.add("on") : page.classList.remove("on");
};
