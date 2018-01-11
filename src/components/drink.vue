<template lang="html">
  <div class="">
    <h3>{{drinkData.strDrink}}</h3>
    <img :src="drinkData.strDrinkThumb" width='200' height='200'>
    <h4>Ingredients:</h4>
    <ul>
      <li v-for='ing in ingredients' v-if="ing.name">
        <span>{{ing.name}}</span>
        <span v-if="ing.measure"> - {{ing.measure}}</span>
      </li>
    </ul>
    <h4>Instructions:</h4>
    <p>{{drinkData.strInstructions}}</p>
  </div>
</template>

<script>
import { getDrinkById } from '../services/apiService';
export default {
  name: 'drink',
  data(){
    return {drinkData: {}}
  },
  computed: {
    ingredients: function () {
      let ingrediantNamePrefix = 'strIngredient';
      let ingredientMeasurePrefix = 'strMeasure';
      let ings = [];
      for(let i = 1; i <= 15; i++ ){
        if(this.drinkData[ingrediantNamePrefix + i]){
          ings.push({
            name: this.drinkData[ingrediantNamePrefix + i].trim(),
            measure: this.drinkData[ingredientMeasurePrefix + i].trim(),
          })
        }
      }
      return ings;
    }
  },
  mounted(){
    getDrinkById(this.$route.params.id)
      .then(response => {
          this.drinkData = response.data.drinks && response.data.drinks.length
            ? response.data.drinks[0]
            : {};
        })
        .catch(function (error) {
          debugger
        })
  }
}
</script>

<style lang="css">
</style>
