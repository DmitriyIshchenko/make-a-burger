import { CLOSING_HOUR, DELIVERY_TIME_HOURS, OPENING_HOUR } from "./config";

export const state = {
  recipe: {
    ingredients: {
      "bun-top": {
        name: "bun-top",
        quantity: 0,
        calories: 128,
        mass: 46,
        time: 0.5,
        price: 1,
      },
      bun: {
        name: "bun",
        quantity: 0,
        calories: 128,
        mass: 46,
        time: 0.5,
        price: 0.5,
      },
      "bun-bottom": {
        name: "bun-bottom",
        quantity: 1,
        calories: 128,
        mass: 46,
        time: 0.5,
        price: 1,
      },
      beef: {
        name: "beef",
        quantity: 0,
        calories: 200,
        mass: 85,
        time: 3,
        price: 4.5,
      },
      mayo: {
        name: "mayo",
        quantity: 0,
        calories: 120,
        mass: 5,
        time: 0.5,
        price: 1.3,
      },
      cheese: {
        name: "cheese",
        quantity: 0,
        calories: 66,
        mass: 21,
        time: 0.5,
        price: 1,
      },
      tomato: {
        name: "tomato",
        quantity: 0,
        calories: 15,
        mass: 10,
        time: 1,
        price: 1,
      },
      onion: {
        name: "onion",
        quantity: 0,
        calories: 10,
        mass: 10,
        time: 1,
        price: 1.1,
      },
      pickle: {
        name: "pickle",
        quantity: 0,
        calories: 10,
        mass: 25,
        time: 1,
        price: 1,
      },
      salad: {
        name: "salad",
        quantity: 0,
        calories: 9,
        mass: 5,
        time: 1,
        price: 1,
      },
    },
    order: ["bun-bottom"],
  },
  favorites: [],
};

export const addIngredient = function (name) {
  // If there is a bun on top, then delete it
  if (state.recipe.order.at(-1) === "bun-top") {
    deleteIngredient("bun-top");
  }
  state.recipe.ingredients[name].quantity += 1;
  state.recipe.order.push(name);
};

export const deleteIngredient = function (name) {
  state.recipe.ingredients[name].quantity -= 1;

  const index = state.recipe.order.findLastIndex((item) => item === name);
  state.recipe.order.splice(index, 1);

  return index;
};

export const updateIngredients = function (name, updateTo) {
  return state.recipe.ingredients[name].quantity < updateTo
    ? addIngredient(name)
    : deleteIngredient(name);
};

export const getTotals = function () {
  const totals = Object.values(state.recipe.ingredients).reduce(
    (total, ingredient) => {
      Object.keys(total).forEach((key) => {
        total[key] += ingredient[key] * ingredient.quantity;
      });
      return total;
    },
    { calories: 0, price: 0, time: 0, mass: 0 }
  );
  totals.completed = state.recipe.order.at(-1) === "bun-top";
  return totals;
};

export const getDeliveryTimeOptions = function () {
  const timeOptions = [];
  for (let i = OPENING_HOUR; i <= CLOSING_HOUR; i++) {
    const date = new Date();
    date.setHours(i, 0, 0, 0);
    timeOptions.push(date);
  }

  const now = new Date();
  const estimatedDeliveryTime = new Date(
    +now + DELIVERY_TIME_HOURS * 60 * 60 * 1000 + getTotals().time * 60 * 1000
  );

  timeOptions.unshift(new Date(estimatedDeliveryTime));

  return timeOptions.filter((time) => time >= estimatedDeliveryTime);
};
