import config from "./config.js";

const html = document.querySelector("html");

export function getStyle(element, style) {
  return window.getComputedStyle(element).getPropertyValue(style).trim();
}

const transformKey = (key) =>
  "--" + key.replace(/([A-Z])/, "-$1").toLowerCase();

const changeColorMode = (colors) =>
  Object.keys(colors).map((key) => {
    html.style.setProperty(transformKey(key), colors[key]);
  });

document
  .querySelector("#color-mode")
  .addEventListener("change", ({ target }) => {
    const { dark, initial } = config.mode;
    target.checked ? changeColorMode(dark) : changeColorMode(initial);
  });
