<template>
  <div class="drink-details" v-if='currentDrinkLoadingStage === drinkLoadingStages.success'>
    <div class='drink-details__header'>
      <h2 class='drink-details__name'>{{drinkData.strDrink}}</h2>
      <favorite-mark :drinkId="drinkId"></favorite-mark>
    </div>
    <img :src="drinkThumbSrc" width='200' height='200'>
    <div class='section'>
      <h3>Ingredients</h3>
      <div class='ingredients-thumbs'>
        <img v-for='dIng in drinkData.ingredients' 
          class='ingredients-thumbs__thumb' 
          :src='"http://www.thecocktaildb.com/images/ingredients/" + dIng.name + "-Small.png"'
          :alt='dIng.name'
          :title='dIng.name'
          :key='dIng.name'/>
      </div>
      <ul class='ingredients-list'>
        <li class='ingredients-list__item' v-for='ing in drinkData.ingredients' v-if="ing.name" :key="ing.name">
          <span
            class='ingredients-list__ingredient-name' 
            :class="{ 'ingredients-list__ingredient-name--active': getIngredientDescriptionByName(ing.name)}"
            @click='getIngredientDescriptionByName(ing.name) && onIngredientNameClick(ing.name)'>{{ing.name}}</span>
          <span v-if="ing.measure"> - {{ing.measure}}</span>
          <p
            class='ingredients-list__ingredient-description' 
            v-if='ingredientsDescriptionsToShow.includes(ing.name)'>{{getIngredientDescriptionByName(ing.name)}}</p>
        </li>
      </ul>
    </div>
    <div class='section'>
      <h3>Glass</h3>
      <p>{{drinkData.strGlass}}</p>
    </div>
    <div class='section'>
      <h3>Instructions</h3>
      <p>{{drinkData.strInstructions}}</p>
    </div>
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
      currentDrinkLoadingStage: null,
      ingredientsDescriptionsToShow:[]
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
    },
    drinkId() {
      return this.$route.params.link.split('-')[0];
    }
  }),
  created(){
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
    },
    onIngredientNameClick(name){
      let index = this.ingredientsDescriptionsToShow.indexOf(name)
      if(index >= 0)
        this.ingredientsDescriptionsToShow.splice(index, 1)
      else
        this.ingredientsDescriptionsToShow.push(name)
    }
  }
}
</script>

<style lang="scss" scoped>
.drink-details{
  .drink-details__header{
    padding: 10px 0;
  }
  .drink-details__name{
    display: inline-block;
  }
  .section{
    padding: 5px 0;
  }
  .ingredients-thumbs{
    padding: 10px 0;
  }
  .ingredients-list{
    margin-left: 20px;
    .ingredients-list__item{
      margin: 5px 0;
    }
    .ingredients-list__ingredient-name{
      &--active{
        border-bottom: 1px dotted #222;
        cursor: pointer;
      }
    }
    .ingredients-list__ingredient-description{
      padding: 10px;
      background: #eee;
      border: 1px solid #333;
      border-radius: 5px;
      margin: 5px 0;
    }
  }
}
</style>
