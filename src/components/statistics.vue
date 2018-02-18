<template>
  <div>
    <h3 class='title'>Statistics</h3>
    <svg width='800' height='500'>
      <circle v-for='(ing, key) in ingredientsStatistics' 
        :key='key' 
        :cx="Math.cos(2 * Math.PI * key/ ingredientsStatistics.length)*200 + 400" 
        :cy="Math.sin(2 * Math.PI * key/ ingredientsStatistics.length)*200 + 250"
        :r="3"
        :title='ing.ingredientName'>
        <title>{{ing.ingredientName}} - {{ing.drinks.length}}</title>
      </circle>
    </svg>
    <div v-for='(ing, key) in ingredientsStatistics' :key='key'>
      {{ing.ingredientName}} - {{ing.drinks.length}}
    </div>
  </div>
</template>
<script>
const ingredientsStatistics = require('../assets/ingredients-statistics.json');
// capitalize ingredient names
ingredientsStatistics.forEach(x => x.ingredientName = x.ingredientName[0].toUpperCase() + x.ingredientName.slice(1));

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
      ingredientsStatistics
    }
  }  
}
</script>

<style lang="scss" scoped>
  p{
    padding: 10px 0;
  }
</style>

