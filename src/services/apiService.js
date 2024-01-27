import * as firebaseService from "./firebaseService";
import * as hardcodedDataService from "./hardcodedDataService";

const useHardcoded = true;

export const searchDrinksByName = async function(...args) {
  if(useHardcoded){
    return hardcodedDataService.searchDrinksByName.apply(hardcodedDataService, args)
  } else {
    return firebaseService.searchDrinksByName.apply(firebaseService, args)
  }
};

export const searchDrinksByIng = async function(...args) {
  if(useHardcoded){
    return hardcodedDataService.searchDrinksByIng.apply(hardcodedDataService, args)
  } else {
    return firebaseService.searchDrinksByIng.apply(firebaseService, args)
  }
};

export const getDrinkById = async function(...args) {
  if(useHardcoded){
    return hardcodedDataService.getDrinkById.apply(hardcodedDataService, args)
  } else {
    return firebaseService.getDrinkById.apply(firebaseService, args)
  }
};

export const getDrinkFullDataById = async function(...args) {
  if(useHardcoded){
    return hardcodedDataService.getDrinkFullDataById.apply(hardcodedDataService, args)
  } else {
    return firebaseService.getDrinkFullDataById.apply(firebaseService, args)
  }
};

export const getAllDrinks = async function(...args) {
  if(useHardcoded){
    return hardcodedDataService.getAllDrinks.apply(hardcodedDataService, args)
  } else {
    return firebaseService.getAllDrinks.apply(firebaseService, args)
  }
};

export const getIngredients = async function() {
  if(useHardcoded){
    return hardcodedDataService.getIngredients.apply(hardcodedDataService)
  } else {
    return firebaseService.getIngredients.apply(firebaseService)
  }
};
