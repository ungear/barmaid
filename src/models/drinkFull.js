export class DrinkFull{
  constructor(apiDrinkModel){
    for(let x in apiDrinkModel){
      this[x] = apiDrinkModel[x]
    }
  }
}