import { getCountries } from "./api.js";
import { getPage, setPagination } from "../pagination.js";

import renderCountries from "../preview.js";

const search = async (path, value) => {
  const FIRST_PAGE = 1;
  
  await getCountries({
    name: value,
    path,
    fields: ["flag", "name", "region", "capital", "population"],
  });

  const countries = getPage(FIRST_PAGE);
  renderCountries(countries);
  setPagination("page", 1);
};

export default search;
