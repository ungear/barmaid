<template lang="html">
  <div class="drink-details" v-if='currentDrinkLoadingStage === drinkLoadingStages.success'>
    <div class='drink-details__header'>
      <h3 class='drink-details__name'>{{drinkData.strDrink}}</h3>
      <favorite-mark :drinkId="drinkData.idDrink"></favorite-mark>
    </div>
    <img :src="drinkThumbSrc" width='200' height='200'>
    <h4>Ingredients:</h4>
    <div class='ingredients-thumbs'>
      <img v-for='dIng in detailedIngredients' 
        class='ingredients-thumbs__thumb' 
        :src='"http://www.thecocktaildb.com/images/ingredients/" + dIng.strIngredient + "-Small.png"'
        :alt='dIng.strIngredient'
        :title='dIng.strIngredient'/>
    </div>
    <ul class='ingredients-list'>
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

const drinkLoadingStages = {
  inProgress: 1,
  success: 2,
  failed: 3
}

export default {
  name: 'drink',
  components:{
    FavoriteMark
  },
  data(){
    return {
      drinkId: null, 
      //detailedIngredients: [],
      currentDrinkLoadingStage: null
    }
  },
  computed: mapState({
    drinkData(state){
      return state.drinks.fullData[this.drinkId];
    },
    drinkThumbSrc(){
      return this.drinkData.strDrinkThumb.indexOf('http://') === 0
        ? this.drinkData.strDrinkThumb
        : 'http://' + this.drinkData.strDrinkThumb
    },
    detailedIngredients(state, getters){
      return this.drinkData.ingredients.map(({name}) => getters.getIngredientByName(name)).filter(x => x)
    }
  }),
  created(){
    this.drinkId = this.$route.params.link.split('-')[0];
    this.drinkLoadingStages = drinkLoadingStages;
    if(this.drinkData){
      this.currentDrinkLoadingStage = drinkLoadingStages.success;
      this.drinkData.ingredients.forEach(({name}) => {
        this.$store.dispatch('getDetailedIngredientByName', name);
        //getIngredientByName(name).then(ing => this.detailedIngredients.push(ing))
      })
    } 
    else{
      this.currentDrinkLoadingStage = drinkLoadingStages.inProgress;
      this.$store.dispatch('loadDrinkFullData', this.drinkId).then(() => {
        this.currentDrinkLoadingStage = drinkLoadingStages.success;
        this.drinkData.ingredients.forEach(({name}) => {
          this.$store.dispatch('getDetailedIngredientByName', name);
          //getIngredientByName(name).then(ing => this.detailedIngredients.push(ing))
        })
      })
    }
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
  .ingredients-list{
    margin-left: 20px;
  }
}
</style>
