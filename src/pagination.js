import { search } from './index.js';

const divPage = document.getElementById('page');
const pagination = {
  page: 1,
  maxPages: 0,
  element: '',
};

export const setPagination = (name, value) => {
  Object.assign(pagination, {
    [name]: value,
  });
  if (name === 'maxPages') return renderPagination();
};

const nextPage = () => {
  const { page, maxPages, element } = pagination;
  if (page >= maxPages) return;

  const next = page + 1;
  search(element, next);
  setPagination('page', next);
};

const backPage = () => {
  const { page, element } = pagination;
  if (page === 1) return;

  const back = page - 1;
  search(element, back);
  setPagination('page', back);
};

const renderPagination = () => {
  const next = document.createElement('button');
  const back = document.createElement('button');

  next.innerText = 'next';
  back.innerText = 'back';
  next.addEventListener('click', nextPage);
  back.addEventListener('click', backPage);

  divPage.innerHTML = '';
  divPage.appendChild(back);
  divPage.appendChild(next);
};