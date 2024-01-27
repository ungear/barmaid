import { drinks } from "./source.mjs";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where, doc, getDoc, addDoc } from 'firebase/firestore/lite';
import { firebaseConfig } from "../firebase-creds.mjs";
import { getUniqueIngredientsList } from './utils.mjs';

const savedIngredients = [];
// compose ingredients list
const ingredients = getUniqueIngredientsList(drinks);

// write ingredients
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
await populateIngredients(ingredients, db);

// write drinks
await populateDrinks(drinks, db);


async function populateIngredients(ingredientsData, db){
  const ingCol = collection(db, 'ingredients');
  for(let index = 0; index < ingredientsData.length; index++){
    const ingName = ingredientsData[index];
    const ingItem = {
      name: ingName,
    }
    console.log("Writing " + ingName);
    const savedIngredient = await addDoc(ingCol, ingItem);
    savedIngredients.push({id: savedIngredient.id, name: ingName});
    console.log("Completed " + ingName);
  }
}

async function populateDrinks(drinks, db){
  const drinksCol = collection(db, 'drinks');
  for(let index = 0; index < drinks.length; index++){
    const drink = drinks[index];
    const ingredients = [];
    for(let i = 1; i<=15; i++){
      const ingFieldName = "strIngredient" + i;
      const measureFieldName = "strMeasure" + i;
      const ingredient = drink[ingFieldName];
      if(!ingredient) continue;
      ingredients.push({
        ingId: savedIngredients.find(x => x.name === ingredient.trim().toLowerCase())?.id,
        measure: drink[measureFieldName]
      })
    }
    const drinkItem = {
      alcType: drink.strAlcoholic,
      glass: drink.strGlass,
      instructions: drink.strInstructions,
      name: drink.strDrink,
      thumbImageUrl: drink.strDrinkThumb,
      ingredients,
    }
    console.log("Writing " + drinkItem.name)
    await addDoc(drinksCol, drinkItem);
    console.log("Completed " + drinkItem.name)
  }
}