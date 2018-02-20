<template>
  <div>
    <h3 class='title'>Statistics</h3>
    <svg :width='graphWidth' :height='graphHeight'>
      <line v-for='(l, key) in lines'
        :key='key + "line"'
        :x1="l.fromX" 
        :y1="l.fromY"
        :x2="l.toX"
        :y2="l.toY"
        :class="selectedIngNodeId === l.fromId ? 'line--highlighted' : ''" 
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

      <circle v-for='(n) in ingNodes' 
        :key='n.id' 
        :cx="n.x" 
        :cy="n.y"
        :r="3"
        @mouseenter='onIngMouseEnter(n)'
        @mouseleave='onIngMouseLeave(n)' >
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
const maxY = 800;
const padding = 5;
const ingCircleRadius = 300;
const ingCircleCenterX = maxX/2;
const ingCircleCenterY = maxY/2;
const ingRingWidth = 30;
const drinkNodes = {};
for(let dId in ingredientsStatistics.drinks){
  let drink = ingredientsStatistics.drinks[dId]
  let nodeX;
  let nodeY;
  let coordsOk;
  do{
    nodeX = getRandomInteger(padding, maxX - padding);
    nodeY = getRandomInteger(padding, maxY - padding);
    let distanceFromIngCircleToNode = Math.sqrt((nodeX - ingCircleCenterX) **2  + (nodeY - ingCircleCenterY)**2)
    coordsOk = distanceFromIngCircleToNode < (ingCircleRadius - ingRingWidth/2) 
      || distanceFromIngCircleToNode > (ingCircleRadius + ingRingWidth/2)
  } while(!coordsOk)

  drinkNodes[dId] = {
    name: drink.name,
    x: nodeX,
    y: nodeY,
  }
}

let initialIngId = 0;
const ingNodes = ingredientsStatistics.ingredients.map((ing, index) => {
  return {
    id: ++initialIngId,
    name: ing.name,
    x: Math.cos(2 * Math.PI * index/ ingredientsCount)*ingCircleRadius + ingCircleCenterX,
    y: Math.sin(2 * Math.PI * index/ ingredientsCount)*ingCircleRadius + ingCircleCenterY,
    drinkIds: ing.drinkIds,
  }
});

const lines = [];
ingNodes.forEach(ingNode => {
  ingNode.drinkIds.forEach(drinkId => {
    let drinkNode = drinkNodes[drinkId];
    lines.push({
      fromId:ingNode.id,
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
      lines,
      selectedIngNodeId: null,
      graphWidth: maxX,
      graphHeight: maxY
    }
  },
  methods:{
    onIngMouseEnter(ingNode){
      this.selectedIngNodeId = ingNode.id
    },
    onIngMouseLeave(){
      this.selectedIngNodeId = null;
    }
  }  
}

function getRandomInteger(min, max){
  return Math.ceil(min + Math.random() * (max - min));
}
</script>

<style lang="scss" scoped>
  p{
    padding: 10px 0;
  }
  .line--highlighted{
    stroke: red;
  }
</style>

