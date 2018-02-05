<template lang="html">
  <div class="drink-details" v-if='currentDrinkLoadingStage === drinkLoadingStages.success'>
    <div class='drink-details__header'>
      <h3 class='drink-details__name'>{{drinkData.strDrink}}</h3>
      <favorite-mark :drinkId="drinkData.idDrink"></favorite-mark>
    </div>
    <img :src="drinkThumbSrc" width='200' height='200'>
    <h4>Ingredients:</h4>
    <div class='ingredients-thumbs'>
      <img v-for='dIng in drinkData.ingredients' 
        class='ingredients-thumbs__thumb' 
        :src='"http://www.thecocktaildb.com/images/ingredients/" + dIng.name + "-Small.png"'
        :alt='dIng.name'
        :title='dIng.name'/>
    </div>
    <ul class='ingredients-list'>
      <li v-for='ing in drinkData.ingredients' v-if="ing.name">
        <span :title="getIngredientDescriptionByName(ing.name)">{{ing.name}}</span>
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
import { getIngredientKeyByName } from '../services/ingredientsService';
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
       // .reduce is used to convert an array to a map
      return this.drinkData.ingredients
        .map(({name}) => getters.getIngredientByName(name))
        .filter(x => x)
        .reduce((result, ing) => { result[getIngredientKeyByName(ing.strIngredient)] = ing; return result}, {})
    }
  }),
  created(){
    this.drinkId = this.$route.params.link.split('-')[0];
    this.drinkLoadingStages = drinkLoadingStages;
    if(this.drinkData){
      this.currentDrinkLoadingStage = drinkLoadingStages.success;
      this.drinkData.ingredients.forEach(({name}) => {
        this.$store.dispatch('getDetailedIngredientByName', name);
      })
    } 
    else{
      this.currentDrinkLoadingStage = drinkLoadingStages.inProgress;
      this.$store.dispatch('loadDrinkFullData', this.drinkId).then(() => {
        this.currentDrinkLoadingStage = drinkLoadingStages.success;
        this.drinkData.ingredients.forEach(({name}) => {
          this.$store.dispatch('getDetailedIngredientByName', name);
        })
      })
    }
  },
  methods: {
    getIngredientDescriptionByName(name){
      let ing = this.detailedIngredients[getIngredientKeyByName(name)];
      return ing
        ? ing.strDescription
        : null
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
