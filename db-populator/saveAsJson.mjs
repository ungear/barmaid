import fs from 'node:fs';
import { getUniqueIngredientsList } from './utils.mjs';
import { drinks } from "./source.mjs";

const uniqueIngredients = getUniqueIngredientsList(drinks);
const ingredientsToSave = uniqueIngredients.map((x, index) => ({
  id: index + 1,
  name: x
}));

saveIngredients(ingredientsToSave);

saveDrinks(drinks)

export function saveIngredients(ingredients){
  fs.writeFile('./ingredients-db.json', JSON.stringify(ingredientsToSave, null, 2), err => {
    if (err) {
      console.error(err);
    } else {
      console.log('success');
    }
  });
}

async function saveDrinks(drinks){
  const drinksToSave = [];
  for(let index = 0; index < drinks.length; index++){
    const drink = drinks[index];
    const ingredients = [];
    for(let i = 1; i<=15; i++){
      const ingFieldName = "strIngredient" + i;
      const measureFieldName = "strMeasure" + i;
      const ingredient = drink[ingFieldName];
      if(!ingredient) continue;
      ingredients.push({
        ingId: ingredientsToSave.find(x => x.name === ingredient.trim().toLowerCase())?.id,
        measure: drink[measureFieldName]
      })
    }
    const drinkItem = {
      id: index + 1,
      alcType: drink.strAlcoholic,
      glass: drink.strGlass,
      instructions: drink.strInstructions,
      name: drink.strDrink,
      thumbImageUrl: drink.strDrinkThumb,
      ingredients,
    }
    drinksToSave.push(drinkItem);
  }
  fs.writeFile('./drinks-db.json', JSON.stringify(drinksToSave, null, 2), err => {
    if (err) {
      console.error(err);
    } else {
      console.log('success');
    }
  });

}