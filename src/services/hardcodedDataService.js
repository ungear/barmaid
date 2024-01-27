import { DRINKS, INGREDIENTS } from "./source";

export const searchDrinksByName = async function(name) {
  const result = DRINKS
    .filter(x => x.name.toLowerCase().includes(name))
    .map(x => Object.assign(x, {_id: x.id}));
  return result
};

export const searchDrinksByIng = async function(searchIng) {
  const result = DRINKS
    // get only drink which comtain ALL search ingredients
    .filter(d => d.ingredients.filter(di => searchIng.includes(di.ingId)).length === searchIng.length)
    .map(x => Object.assign(x, {_id: x.id}))
  return result;
};

export const getDrinkById = async function(id) {
  return DRINKS.find(x => x.id === id);
};

export const getDrinkFullDataById = async function(id) {
  const result = DRINKS.find(x => x.id === id);
  return Object.assign(result, {_id: result.id});
};

export const getAllDrinks = async function() {
  const result = DRINKS
    .map(x => Object.assign(x, {_id: x.id}))
  return result;
};

export const getIngredients = async function() {
  const ingData = INGREDIENTS.map(x => {
    return {
      _id: x.id,
      ingredientName: x.name,
    }
  });
  return ingData;
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
