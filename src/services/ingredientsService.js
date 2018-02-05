// API endpoints return ingredient names in different formats e.g. "Apple Juice" vs "Apple juice".
// Ingredient names are used as keys in the store, so we have to make them consistent.
// The function is supposed to keep names normalization logic.
export const getIngredientKeyByName = name => name.toLowerCase()