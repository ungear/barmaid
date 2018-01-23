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
      <li v-for='ing in drinkData.ingredients' v-if="ing.name">
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
    }
  }),
  methods:{
    toggleFavorite(){
      this.$store.dispatch('toggleFavoriteDrink', this.drinkData.idDrink)
    }
  },
  created(){
    getDrinkById(this.$route.params.id)
      .then(drinkFullModel => {
          this.drinkData = drinkFullModel;
          this.drinkData.ingredients.forEach(({name}) => {
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
