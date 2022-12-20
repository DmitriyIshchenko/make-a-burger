import * as model from "./model";
import burgerView from "./views/burgerView";
import ingredientsView from "./views/ingredientsView";

const controlBurger = function () {
  burgerView.render(model.state.recipe.order);
  ingredientsView.render(model.state.recipe.ingredients);
};

const controlIngredientQuantity = function (name, updateTo) {
  const currentQt = model.state.recipe.ingredients[name].quantity;
  if (currentQt < updateTo) {
    model.addIngredient(name);
  } else {
    const index = model.deleteIngredient(name);
    burgerView.addDeleteAnimation(index);
  }

  ingredientsView.render(model.state.recipe.ingredients);
  burgerView.render(model.state.recipe.order);
};

const init = function () {
  window.addEventListener("load", controlBurger);
  ingredientsView.addHandlerUpdateQuantity(controlIngredientQuantity);
};

init();
