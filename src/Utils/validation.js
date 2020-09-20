const isString = (text) => typeof text === "string";
const notVoid = (text) => !(text.trim() === "");
const notNumberString = (text) => !new RegExp(/[0-9]/).test(text);

const setError = (element, error) => {
  if (!error || !element) return;
  const messageError = {
    isString: "O valor deste campo deve ser um texto",
    notVoid: "Preencha este campo",
    notNumberString: "Este campo não aceita números",
  };
  const input = document.querySelector(element);
  input.placeholder = messageError[error];
  input.classList.add("error");
  input.value = "";
};

export const selectIsValidValue = (text) =>
  ["Africa", "Americas", "Asia", "Europe", "Oceania"].includes(text);

export const searchIsValidValue = (text) => {
  const errors = ["isString", "notVoid", "notNumberString"];
  return [isString, notVoid, notNumberString].every(
    (validation, erroPosition) => {
      const isValid = validation(text);
      if (!isValid) setError("#country", errors[erroPosition]);
      return isValid;
    }
  );
};
