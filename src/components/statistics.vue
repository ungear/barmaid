<template>
  <div>
    <h3 class='title'>Statistics</h3>
    <svg width='800' height='500'>
      <line v-for='(l, key) in lines'
        :key='key + "line"'
        :x1="l.fromX" 
        :y1="l.fromY"
        :x2="l.toX"
        :y2="l.toY" 
        stroke='rgba(100,100,100,0.2)' />
      <circle v-for='(n, key) in drinkNodes' 
        :key='key' 
        :cx="n.x" 
        :cy="n.y"
        :r="2"
        fill='red'
        stroke='black'>
        <title>{{n.name}}</title>
      </circle>

      <circle v-for='(n, key) in ingNodes' 
        :key='key' 
        :cx="n.x" 
        :cy="n.y"
        :r="3">
        <title>{{n.name}}</title>
      </circle>
    </svg>
  </div>
</template>
<script>
const ingredientsStatistics = require('../assets/ingredients-statistics.json');
let ingredientsCount = 0;
for(let f in ingredientsStatistics.ingredients){ingredientsCount++}

const maxX = 800;
const maxY = 500;
const ingCircleRadius = 200;
const drinkNodes = {};
for(let dId in ingredientsStatistics.drinks){
  let drink = ingredientsStatistics.drinks[dId]
  drinkNodes[dId] = {
    name: drink.name,
    x: Math.ceil(Math.random() * maxX),
    y: Math.ceil(Math.random() * maxY),
  }
}

const ingNodes = ingredientsStatistics.ingredients.map((ing, index) => {
  return {
    name: ing.name,
    x: Math.cos(2 * Math.PI * index/ ingredientsCount)*ingCircleRadius + maxX/2,
    y: Math.sin(2 * Math.PI * index/ ingredientsCount)*ingCircleRadius + maxY/2,
    drinkIds: ing.drinkIds
  }
});

const lines = [];
ingNodes.forEach(ingNode => {
  ingNode.drinkIds.forEach(drinkId => {
    let drinkNode = drinkNodes[drinkId];
    lines.push({
      fromX: ingNode.x,
      fromY: ingNode.y,
      toX: drinkNode.x,
      toY: drinkNode.y
    })
  })
})

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
      ingredientsCount,
      drinkNodes,
      ingNodes,
      lines
    }
  }  
}
</script>

<style lang="scss" scoped>
  p{
    padding: 10px 0;
  }
</style>

