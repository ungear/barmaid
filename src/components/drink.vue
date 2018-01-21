<template lang="html">
  <div class="drink-details">
    <div class='drink-details__header'>
      <h3 class='drink-details__name'>{{drinkData.strDrink}}</h3>
      <favorite-mark :isFavorite="isFavorite" @toggle='toggleFavorite'></favorite-mark>
    </div>
    <img :src="drinkData.strDrinkThumb" width='200' height='200'>
    <h4>Ingredients:</h4>
    <div class='ingredients-thumbs'>
      <img v-for='dIng in detailedIngredients' 
        class='ingredients-thumbs__thumb' 
        :src='"http://www.thecocktaildb.com/images/ingredients/" + dIng.strIngredient + "-Small.png"'
        :alt='dIng.strIngredient'
        :title='dIng.strIngredient'/>
    </div>
    <ul>
      <li v-for='ing in ingredients' v-if="ing.name">
        <span>{{ing.name}}</span>
        <span v-if="ing.measure"> - {{ing.measure}}</span>
      </li>
    </ul>
    <h4>Glass</h4>
    <p>{{drinkData.strGlass}}</p>
    <h4>Instructions</h4>
    <p>{{drinkData.strInstructions}}</p>
  </div>
</template>

<script>
import { getDrinkById, getIngredientByName } from '../services/apiService';
import { mapState } from 'vuex'
import FavoriteMark from './favorite-mark.vue'

export default {
  name: 'drink',
  components:{
    FavoriteMark
  },
  data(){
    return {drinkData: {}, detailedIngredients: []}
  },
  computed: mapState({
    isFavorite(state){
      return state.favoriteDrinkIds.indexOf(this.drinkData.idDrink) >= 0
    }, 
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
  }),
  methods:{
    toggleFavorite(){
      this.$store.dispatch('toggleFavoriteDrink', this.drinkData.idDrink)
    }
  },
  mounted(){
    getDrinkById(this.$route.params.id)
      .then(drink => {
          this.drinkData = drink;
          this.ingredients.forEach(({name}) => {
            getIngredientByName(name).then(ing => this.detailedIngredients.push(ing))
          })
        })
        .catch(function (error) {
          debugger
        })
  }
}
</script>

<style lang="scss" scoped>
.drink-details{
  .drink-details__name{
    display: inline-block
  }
  .ingredients-thumbs{
    padding: 10px 0;
  }
}
</style>
