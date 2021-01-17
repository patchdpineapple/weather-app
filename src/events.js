import { methods } from "./methods.js";

const events = (function () {
  function initialize() {
    document.querySelector("form").reset();
    methods.getData(null, "Manila");

    const btn_search = document.getElementById("btn_search");
    btn_search.addEventListener("click", (event) => {
      console.clear();
      console.log("button pressed");
      event.preventDefault(); //prevents page from refresh before fetching finishes
      methods.getData(event);
    });

    const btn_switch = document.getElementById("btn_switch");
    btn_switch.addEventListener("click", (event) => {
      console.log("switch pressed");

      event.preventDefault(); //prevents page from refresh before fetching finishes
      methods.switchTemp(event);
    });
  }

  return {
    initialize,
  };
})();

export { events };
