const fs = require('fs');

var r = fs.readFileSync('./src/assets/ingredients-statistics.json')
var data = JSON.parse(r);

var result = {
  drinks:{},
  ingredients:[]
}
for(let f in data.drinks){
  let drink = data.drinks[f];
  result.drinks[f] = {
    name: drink.strDrink
  }
}
for(let f in data.ingredients){
  let ing = data.ingredients[f];
  result.ingredients.push(ing)
}

fs.writeFile('./src/assets/ingredients-statistics1.json', JSON.stringify(result))
