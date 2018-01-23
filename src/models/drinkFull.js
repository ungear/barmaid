const API_DRINK_INGREDIENTS_NUMBER = 15;

export class DrinkFull{
  constructor(apiDrinkModel){
    for(let x in apiDrinkModel){
      this[x] = apiDrinkModel[x]
    }

    let ingrediantNamePrefix = 'strIngredient';
    let ingredientMeasurePrefix = 'strMeasure';
    this.ingredients = [];
    for(let i = 1; i <= API_DRINK_INGREDIENTS_NUMBER; i++ ){
      if(apiDrinkModel[ingrediantNamePrefix + i]){
        this.ingredients.push({
          name: apiDrinkModel[ingrediantNamePrefix + i].trim(),
          measure: apiDrinkModel[ingredientMeasurePrefix + i].trim(),
        })
      }
    }
  }
}