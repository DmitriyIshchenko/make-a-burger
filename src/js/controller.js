import * as model from "./model";
import burgerView from "./views/burgerView";
import ingredientsView from "./views/ingredientsView";
import summaryView from "./views/summaryView";
import tooltipView from "./views/tooltipView";
import navigationView from "./views/navigationView";
import checkoutView from "./views/checkoutView";
import burgerDemoView from "./views/burgerDemoView";
import formView from "./views/formView";
import { TOP_BUN_TIMEOUT_SEC, CALORIES_LIMIT_POPUP } from "./config";

let timeoutId;
const controlBurger = function (name, updateTo) {
  clearTimeout(timeoutId);

  controlUpdateIngredients(name, updateTo);
  controlAutoTopBun();

  model.getTotals().calories > CALORIES_LIMIT_POPUP
    ? tooltipView.showTooltip()
    : tooltipView.hideTooltip();
};

const controlAutoTopBun = () => {
  // if there is no bun on top, add after timeout
  timeoutId = setTimeout(() => {
    if (model.state.recipe.order.at(-1) !== "bun-top") {
      controlUpdateIngredients("bun-top", 1);
    }
  }, TOP_BUN_TIMEOUT_SEC * 1000);
};

const controlUpdateIngredients = function (name, updateTo) {
  const indexToDelete = model.updateIngredients(name, updateTo);
  ingredientsView.update(model.state.recipe.ingredients);
  summaryView.update(model.getTotals());
  burgerView.update(model.state.recipe.order, indexToDelete);
};

const init = function () {
  window.addEventListener("load", () => {
    burgerView.render(model.state.recipe.order);
    ingredientsView.render(model.state.recipe.ingredients);
    summaryView.update(model.getTotals());
  });
  ingredientsView.addHandlerUpdateQuantity(controlBurger);
};

init();
