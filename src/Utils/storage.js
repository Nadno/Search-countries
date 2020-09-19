const parse = (item, toString) => {
  try {
    return toString
      ? JSON.stringify(item)
      : JSON.parse(item);
  } catch {
    return null;
  }
};

export const setItem = (name, item) => {
  const TO_STRING = true;
  localStorage.setItem(name, parse(item, TO_STRING));
};

export const getItem = (name) => {
  const TO_JSON = false;
  const item = localStorage.getItem(name);

  return  parse(item, TO_JSON);
};