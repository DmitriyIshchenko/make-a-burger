import * as model from "./model";
import burgerView from "./views/burgerView";
import ingredientsView from "./views/ingredientsView";
import summaryView from "./views/summaryView";
import tooltipView from "./views/tooltipView";
import { wait } from "./helpers";

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

  model.getTotals().calories > 1000
    ? tooltipView.showTooltip()
    : tooltipView.hideTooltip();

  timeoutId = setTimeout(() => {
    controlAddIngredient("bun-top");
  }, 3000);
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
  await wait(0.2);
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
