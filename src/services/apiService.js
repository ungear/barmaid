import axios from "axios";

const API_BASE_URL = "https://barmaid-api.ungear.ru/";

export const searchDrinksByName = function(name) {
  let url = API_BASE_URL + "drinks/by-name?like=" + name;
  return axios.get(url).then(response => response.data);
};

export const searchDrinksByIng = function(ing) {
  let url = API_BASE_URL + "drinks/by-ingredients?ingIds=" + ing.join(";");
  return axios.get(url).then(response => response.data);
};

export const getDrinkById = function(id) {
  let url = API_BASE_URL + "drinks/" + id;
  return axios.get(url).then(response => response.data);
};

export const getDrinkFullDataById = function(id) {
  let url = API_BASE_URL + "drinks/full/" + id;
  return axios.get(url).then(response => response.data);
};

export const getIngredients = function() {
  let url = API_BASE_URL + "ingredients";
  return axios.get(url).then(response => {
    return response.data;
    // .map(i => capitalizeFirstLetter(i.ingredientName))
    // .sort();
  });
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
