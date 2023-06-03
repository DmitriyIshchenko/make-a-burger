import * as model from './model';
import burgerView from './views/Burger/burgerView';
import ingredientsView from './views/Burger/ingredientsView';
import summaryView from './views/Burger/summaryView';
import burgerTooltipView from './views/Burger/burgerTooltipView';
import navigationView from './views/UI/navigationView';
import modalView from './views/UI/modalView';
import burgerDemoView from './views/Burger/burgerDemoView';
import checkoutFormView from './views/Checkout/checkoutFormView';
import timeSelectorView from './views/Checkout/timeSelectorView';
import { TOP_BUN_TIMEOUT_SEC } from './config';

import '../sass/main.scss';

const controlUpdateIngredients = (name, updateTo) => {
  const indexToDelete = model.updateIngredients(name, updateTo);
  burgerView.update(model.state.recipe.order, indexToDelete);
  burgerTooltipView.update(model.getTotals());

  summaryView.update(model.getTotals());
  ingredientsView.update(model.state.recipe.ingredients);

  modalView.update(model.getTotals());
  timeSelectorView.render(model.getDeliveryTimeOptions());
};

let timeoutId;
const controlAutoTopBun = () => {
  // if there is no bun on top, add after timeout
  timeoutId = setTimeout(() => {
    if (model.state.recipe.order.at(-1) !== 'bun-top') {
      controlUpdateIngredients('bun-top', 1);
    }
  }, TOP_BUN_TIMEOUT_SEC * 1000);
};

const controlBurger = (name, updateTo) => {
  clearTimeout(timeoutId);

  controlUpdateIngredients(name, updateTo);
  controlAutoTopBun();
};

const init = () => {
  window.addEventListener('load', () => {
    burgerView.render(model.state.recipe.order);
    burgerTooltipView.render();

    summaryView.update(model.getTotals());
    ingredientsView.render(model.state.recipe.ingredients);

    modalView.update(model.getTotals());
    timeSelectorView.render(model.getDeliveryTimeOptions());
  });
  ingredientsView.addHandlerUpdateQuantity(controlBurger);
};

init();
