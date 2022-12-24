export const state = {
  recipe: {
    ingredients: {
      "bun-top": {
        name: "bun-top",
        quantity: 0,
        calories: 0,
        mass: 0,
        time: 0,
      },
      bun: {
        name: "bun",
        quantity: 0,
        calories: 0,
        mass: 0,
        time: 0,
      },
      "bun-bottom": {
        name: "bun-bottom",
        quantity: 0,
        calories: 0,
        mass: 0,
        time: 0,
      },
      beef: { name: "beef", quantity: 0, calories: 0, mass: 0, time: 0 },
      mayo: { name: "mayo", quantity: 0, calories: 0, mass: 0, time: 0 },
      cheese: { name: "cheese", quantity: 0, calories: 0, mass: 0, time: 0 },
      tomato: { name: "tomato", quantity: 0, calories: 0, mass: 0, time: 0 },
      onion: { name: "onion", quantity: 0, calories: 0, mass: 0, time: 0 },
      pickle: { name: "pickle", quantity: 0, calories: 0, mass: 0, time: 0 },
      salad: { name: "salad", quantity: 0, calories: 0, mass: 0, time: 0 },
    },
    order: ["bun-bottom"],
  },
  favorites: [],
};

export const addIngredient = function (name) {
  state.recipe.ingredients[name].quantity += 1;
  state.recipe.order.push(name);
};

export const deleteIngredient = function (name) {
  state.recipe.ingredients[name].quantity -= 1;

  const index = state.recipe.order.findLastIndex((item) => item === name);
  state.recipe.order.splice(index, 1);

  return index;
};
