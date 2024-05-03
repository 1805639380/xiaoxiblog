import hljs from "highlight.js";
import "highlight.js/styles/a11y-dark.css";

export default defineNuxtPlugin((nuxt) => {
  const app = nuxt.vueApp;
  app.directive("highlight", (el) => {
    const blocks = el.querySelectorAll("pre code");
    blocks.forEach((block) => {
      hljs.highlightElement(block);
    });
  });
});
