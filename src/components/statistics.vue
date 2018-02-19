<template>
  <div>
    <h3 class='title'>Statistics</h3>
    <svg width='800' height='500'>
      <circle v-for='(ing, key, index) in ingredientsStatistics.ingredients' 
        :key='key' 
        :cx="Math.cos(2 * Math.PI * index/ ingredientsCount)*200 + 400" 
        :cy="Math.sin(2 * Math.PI * index/ ingredientsCount)*200 + 250"
        :r="3"
        :title='ing.ingredientName'>
        <title>{{ing.name}} - {{ing.drinkIds.length}}</title>
      </circle>
    </svg>
  </div>
</template>
<script>
const ingredientsStatistics = require('../assets/ingredients-statistics.json');


let ingredientsCount = 0;
for(let f in ingredientsStatistics.ingredients){ingredientsCount++}

// sort ingrediants by drinks number then name
// ingredientsStatistics.sort((a,b) => {
//   //sort by drinks number then by name
//   return b.drinks.length == a.drinks.length
//     ? a.ingredientName.charCodeAt(0) - b.ingredientName.charCodeAt(0)
//     : b.drinks.length - a.drinks.length;
// })
export default {
  name: 'about',
  data: function(){
    return{
      ingredientsStatistics,
      ingredientsCount
    }
  }  
}
</script>

<style lang="scss" scoped>
  p{
    padding: 10px 0;
  }
</style>

