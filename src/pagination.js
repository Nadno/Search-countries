import { renderCountries } from "./index.js";

const divPage = document.getElementById('page');
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
  if (next >= maxPages) disableButton('next__page', true);
  if (next === 2) disableButton('back__page', false);
  
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

export const renderPagination = () => {
  const next = document.createElement('button');
  const back = document.createElement('button');
  const link1 = document.createElement('a');
  const link2 = document.createElement('a');

  link1.href = "#search";
  link2.href = "#search";
  
  next.id = 'next__page';
  next.innerText = 'next';
  next.className = "box-shadow";
  if (pagination.maxPages <= 1)
    next.setAttribute('disabled', true);
  next.addEventListener('click', nextPage);
  
  back.id = 'back__page';
  back.innerText = 'back';
  back.className = "box-shadow";
  back.setAttribute('disabled', true);
  back.addEventListener('click', backPage);

  divPage.innerHTML = '';
  link1.appendChild(back);
  link2.appendChild(next);
  divPage.appendChild(link1);
  divPage.appendChild(link2);
};