import config from "./config.js";
import { setItem } from "./storage.js";

const html = document.querySelector("html");

export function getStyle(element, style) {
  return window.getComputedStyle(element).getPropertyValue(style).trim();
}

const transformKey = (key) =>
  "--" + key.replace(/([A-Z])/, "-$1").toLowerCase();

export const changeColorMode = (colors, selectedMode) => {
  document.querySelector("#color-mode").checked = selectedMode;
  Object.keys(colors).map((key) => {
    html.style.setProperty(transformKey(key), colors[key]);
  });
}
  
const changeFontSize = () => {
  config.fontSize += 1;
  html.style.setProperty("--font-size", `${config.fontSize}%`);
};

document
  .querySelector("#color-mode")
  .addEventListener("change", ({ target }) => {
    const { dark, initial } = config.mode;
    config.mode.selected = target.checked ? 1 : 0;
    target.checked ? changeColorMode(dark, target.checked) : changeColorMode(initial, target.checked);
    setItem("config", config);
  });
