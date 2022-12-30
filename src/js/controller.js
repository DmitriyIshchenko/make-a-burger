import * as model from "./model";
import burgerView from "./views/burgerView";
import ingredientsView from "./views/ingredientsView";
import summaryView from "./views/summaryView";
import tooltipView from "./views/tooltipView";
import tabsView from "./views/tabsView";
import { wait } from "./helpers";
import {
  TOP_BUN_TIMEOUT_SEC,
  ANIMATION_DURATION_SEC,
  CALORIES_LIMIT_POPUP,
} from "./config";

let timeoutId;
const controlBurger = async function (name, updateTo) {
  clearTimeout(timeoutId);

  const currentQt = model.state.recipe.ingredients[name].quantity;
  if (currentQt < updateTo) {
    if (model.state.recipe.order.at(-1) === "bun-top")
      await controlDeleteIngredient("bun-top");
    controlAddIngredient(name);
  } else {
    controlDeleteIngredient(name);
  }

  model.getTotals().calories > CALORIES_LIMIT_POPUP
    ? tooltipView.showTooltip()
    : tooltipView.hideTooltip();

  timeoutId = setTimeout(() => {
    controlAddIngredient("bun-top");
  }, TOP_BUN_TIMEOUT_SEC * 1000);
};

const controlAddIngredient = function (name) {
  model.addIngredient(name);
  burgerView.render(model.state.recipe.order);
  burgerView.animateNew();
  ingredientsView.render(model.state.recipe.ingredients);
  summaryView.render(model.getTotals());
};

const controlDeleteIngredient = async function (name) {
  const index = model.deleteIngredient(name);
  burgerView.animateDeleted(index);
  ingredientsView.render(model.state.recipe.ingredients);
  await wait(ANIMATION_DURATION_SEC);
  burgerView.render(model.state.recipe.order);
  summaryView.render(model.getTotals());
};

const init = function () {
  window.addEventListener("load", () => {
    burgerView.render(model.state.recipe.order);
    ingredientsView.render(model.state.recipe.ingredients);
    summaryView.render(model.getTotals());
    tooltipView.render("");
  });
  ingredientsView.addHandlerUpdateQuantity(controlBurger);
};

init();
