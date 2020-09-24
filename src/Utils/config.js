import { getItem } from "./storage.js";
import { getStyle, changeColorMode } from "./style.js";

const html = document.querySelector("html");
const config = {
  itemsForPage: 8,
  fontSize: Number(getStyle(html, "--font-size").replace("%", "")),
  mode: {
    selected: false,
    initial: {
      textColor: getStyle(html, "--text-color"),
      inputText: getStyle(html, "--input-text-color"),
      colorElements: getStyle(html, "--color-elements"),
      backgroundColor: getStyle(html, "--background-color"),
    },
    dark: {
      textColor: "hsl(0, 0%, 100%)",
      inputText: "hsl(0, 0%, 100%)",
      colorElements: "hsl(209, 23%, 22%)",
      backgroundColor: "hsl(207, 26%, 17%)",
    },
  },
};

(function getConfigOnStorage() {
  const save = getItem("config");
  if (!save) return;
  Object.assign(config, save);
  if (config.mode.selected) changeColorMode(config.mode.dark, true);
})();

export default config;
