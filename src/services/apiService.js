import axios from "axios";
import { DrinkFull } from "../models/drinkFull";

// const API_URL = 'https://www.thecocktaildb.com/api/json/v1/';
// const API_KEY = '1';
// const API_BASE_URL = API_URL + API_KEY + '/';
const API_BASE_URL = "https://barmaid-api.ungear.ru/";

export const getDrinksByIngreidient = function(ingredient) {
  let url = API_BASE_URL + "filter.php?i=" + ingredient;
  return axios.get(url);
};

export const searchDrinksByName = function(name) {
  let url = API_BASE_URL + "search.php?s=" + name;
  return axios
    .get(url)
    .then(response => (response.data.drinks ? response.data.drinks : []));
};

export const searchDrinksByIng = function(ing) {
  let url = API_BASE_URL + "filter.php?i=" + ing;
  return axios
    .get(url)
    .then(response => (response.data.drinks ? response.data.drinks : []));
};

export const getDrinkById = function(id) {
  let url = API_BASE_URL + "lookup.php?i=" + id;
  return axios
    .get(url)
    .then(response => new DrinkFull(response.data.drinks[0]));
};

export const getIngredients = function() {
  let url = API_BASE_URL + "ingredients";
  return axios.get(url).then(response => {
    return response.data;
    // .map(i => capitalizeFirstLetter(i.ingredientName))
    // .sort();
  });
};

export const getIngredientByName = function(name) {
  let url = API_BASE_URL + "search.php?i=" + name;
  return axios.get(url).then(response => response.data.ingredients[0]);
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
