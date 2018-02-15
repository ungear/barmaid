<template>
  <div>
    <h3 class='title'>Statistics</h3>
    <div v-for='(ing, key) in ingredientsStatistics' :key='key'>
      {{ing.ingredientName}} - {{ing.drinks.length}}
    </div>
  </div>
</template>
<script>
const ingredientsStatistics = require('../assets/ingredients-statistics.json');
// capitalize ingredient names
ingredientsStatistics.forEach(x => x.ingredientName = x.ingredientName[0].toUpperCase() + x.ingredientName.slice(1));

const ingredientsSorted = ingredientsStatistics.sort((a,b) => {
  //sort by drinks number then by name
  return b.drinks.length == a.drinks.length
    ? a.ingredientName.charCodeAt(0) - b.ingredientName.charCodeAt(0)
    : b.drinks.length - a.drinks.length;
})
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

