import { renderCountries } from "./index.js";

const NEXT = "next__page";
const BACK = "back__page";

const pagination = {
  page: 1,
  maxPages: 0,
  element: '',
  data: [],
};

export const setPagination = (name, value) => {
  Object.assign(pagination, {
    [name]: value,
  });
};

export const getPage = (page) =>
  page ? pagination.data.slice(page * 5 - 5, page * 5) : pagination.countries;

const disableButton = (button, toggle) => 
  document.getElementById(button).disabled = toggle;

const nextPage = () => {
  const { page, maxPages } = pagination;
  
  const next = page + 1;
  if (next >= maxPages) disableButton(NEXT, true);
  if (next === 2) disableButton(BACK, false);
  
  const countries = getPage(next);
  renderCountries(countries);
  setPagination('page', next);
};

const backPage = () => {
  const { page, maxPages } = pagination;
  
  const back = page - 1;
  if (back === 1) disableButton('back__page', true);
  if (back < maxPages) disableButton('next__page', false);

  const countries = getPage(back);
  renderCountries(countries);
  setPagination('page', back);
};

const nextEl = document.getElementById(NEXT);
const backEl = document.getElementById(BACK);

nextEl.addEventListener('click', nextPage);
backEl.addEventListener('click', backPage);

export const activePagination = (toggle) => {
  const page = document.getElementById("page");
  if (pagination.maxPages <= 1)
    nextEl.disabled = true;

  toggle
    ? page.classList.add("on")
    : page.classList.remove("on");
};