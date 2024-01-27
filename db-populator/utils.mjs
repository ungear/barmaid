export function getUniqueIngredientsList(drinks){
  const ingredientsSet = new Set();
  drinks.forEach((drink) => {
    for(let i = 1; i<=15; i++){
      const fieldName = "strIngredient" + i;
      const ingredient = drink[fieldName];
      if(!ingredient) continue;
      ingredientsSet.add(ingredient.trim().toLowerCase())
    }
  })
  return Array.from(ingredientsSet).sort();
}