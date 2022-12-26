import * as model from "./model";
import burgerView from "./views/burgerView";
import ingredientsView from "./views/ingredientsView";
import summaryView from "./views/summaryView";
import { wait } from "./helpers";

const controlBurger = function () {
  burgerView.render(model.state.recipe.order);
  ingredientsView.render(model.state.recipe.ingredients);
  summaryView.render(model.getTotals());
};

let timeoutId;
const controlIngredientQuantity = async function (name, updateTo) {
  clearTimeout(timeoutId);

  const currentQt = model.state.recipe.ingredients[name].quantity;
  if (currentQt < updateTo) {
    if (model.state.recipe.order.at(-1) === "bun-top")
      await controlDeleteIngredient("bun-top");
    controlAddIngredient(name);
  } else {
    controlDeleteIngredient(name);
  }

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
  window.addEventListener("load", controlBurger);
  ingredientsView.addHandlerUpdateQuantity(controlIngredientQuantity);
};

init();
