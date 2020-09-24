import { getCountries } from "./api.js";
import { searchIsValidValue, selectIsValidValue } from "./validation.js";

const search = async (path, value) =>
  await getCountries({
    name: value,
    path,
    fields: ["flag", "name", "region", "capital", "population"],
  });

export const searchByName = async (value) => {
  if (searchIsValidValue(value))
    await search("/name", value);
};

export const searchBySelect = async (value) => {
  if (selectIsValidValue(value))
    await search("/region", value);
};
