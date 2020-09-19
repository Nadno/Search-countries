import { getStyle } from "./colorMode.js";

const html = document.querySelector("html");
const config = {
  itemsForPage: 6,
  mode: {
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

export default config;
