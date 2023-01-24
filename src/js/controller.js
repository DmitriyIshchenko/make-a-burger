import * as model from "./model";
import burgerView from "./views/burgerView";
import ingredientsView from "./views/ingredientsView";
import summaryView from "./views/summaryView";
import burgerTooltipView from "./views/burgerTooltipView";
import navigationView from "./views/navigationView";
import popupView from "./views/popupView";
import burgerDemoView from "./views/burgerDemoView";
import checkoutFormView from "./views/checkoutFormView";
import timeSelectorView from "./views/timeSelectorView";
import { TOP_BUN_TIMEOUT_SEC } from "./config";

let timeoutId;
const controlBurger = function (name, updateTo) {
  clearTimeout(timeoutId);

  controlUpdateIngredients(name, updateTo);
  controlAutoTopBun();
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
  burgerView.update(model.state.recipe.order, indexToDelete);
  burgerTooltipView.update(model.getTotals());

  summaryView.update(model.getTotals());
  ingredientsView.update(model.state.recipe.ingredients);

  popupView.update(model.getTotals());
  timeSelectorView.render(model.getDeliveryTimeOptions());
};

const init = function () {
  window.addEventListener("load", () => {
    burgerView.render(model.state.recipe.order);
    burgerTooltipView.render();

    summaryView.update(model.getTotals());
    ingredientsView.render(model.state.recipe.ingredients);

    popupView.update(model.getTotals());
    timeSelectorView.render(model.getDeliveryTimeOptions());
  });
  ingredientsView.addHandlerUpdateQuantity(controlBurger);
};

init();
