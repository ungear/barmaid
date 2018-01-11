import axios from 'axios';

const API_URL = 'http://www.thecocktaildb.com/api/json/v1/';
const API_KEY = '1';
const API_BASE_URL = API_URL + API_KEY + '/';

var ingredientsCache;

export const getDrinksByIngreidient = function(ingredient){
  let url = API_BASE_URL + 'filter.php?i=' + ingredient;
  return axios.get(url);
}

export const searchDrinksByName = function(name){
  let url = API_BASE_URL + 'search.php?s=' + name;
  return axios.get(url);
}

export const searchDrinksByIng = function(ing){
  let url = API_BASE_URL + 'filter.php?i=' + ing;
  return axios.get(url);
}

export const getDrinkById = function(id){
  let url = API_BASE_URL + 'lookup.php?i=' + id;
  return axios.get(url);
}

export const getIngredients = function(){
  if(ingredientsCache){
    return Promise.resolve(ingredientsCache)  
  }
  else{
    let url = API_BASE_URL + 'list.php?i=list';
    return axios.get(url).then(response => {
      // save ingerients to cache to avoid multiple requests
      ingredientsCache = response.data.drinks
        ? response.data.drinks.map(i => capitalizeFirstLetter(i.strIngredient1)).sort()
        : [];
      return ingredientsCache;
    });
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
