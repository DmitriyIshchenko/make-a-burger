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

const controlIngredientQuantity = async function (name, updateTo) {
  const currentQt = model.state.recipe.ingredients[name].quantity;
  if (currentQt < updateTo) {
    // ADD

    // 1. Update model
    model.addIngredient(name);

    // 2. Render updated burger
    burgerView.render(model.state.recipe.order);

    // 3. Animate new ingredient AFTER DOM updated
    burgerView.animateNew();

    // 4. Render updated ingredient
    ingredientsView.render(model.state.recipe.ingredients);
  } else {
    // DELETE

    // 1. Update model
    const index = model.deleteIngredient(name);

    // 2. Animate deleted ingredient BEFORE rendering
    burgerView.animateDeleted(index);

    // 3. Render updated ingredients
    ingredientsView.render(model.state.recipe.ingredients);

    // 4. Wait until animation completes
    await wait(0.2);

    // 5. Render updated burger
    burgerView.render(model.state.recipe.order);
  }

  // Update summary
  summaryView.render(model.getTotals());
};

const init = function () {
  window.addEventListener("load", controlBurger);
  ingredientsView.addHandlerUpdateQuantity(controlIngredientQuantity);
};

init();
