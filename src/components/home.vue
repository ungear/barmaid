<template lang="">
  <div>
    <h1>Welcome to the Barmaid. Enjoy browsing the cocktails collections.</h1>
    <p v-if="!isLoading">
      <h3>Currently we have</h3> 
      <ul> 
        <li>{{alcoholDrinksCount}} alcoholic cocktails</li>
        <li>{{nonAlcoholDrinksCount}} non-alcoholic cocktails</li>
        <li>{{optionalAlcoholDrinksCount}} optionally alcoholic cocktails</li>
        <li>{{ingredients.length}} ingredients</li>
      </ul>
      <h3>Some random drinks from the collection</h3>
      <drink-snippet 
        class='drinks-list__item'
        :drink="x" 
        v-for="x in randomDrinks" 
        v-bind:key="x.idDrink"></drink-snippet>
    </p>
    <spinner v-if="isLoading"></spinner>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { GET_INGREDIENTS_STAGES } from "../consts/consts";
import Spinner from "./spinner.vue";
import DrinkSnippet from "./drinkSnippet.vue";

export default {
  name: "home",
  components: { DrinkSnippet, Spinner },
  created: function(){
    this.$store.dispatch("getAllIngredients");
    this.$store.dispatch("loadAllDrinks").then(drinks => {
      this.isDrinksLoading = false;
      this.randomDrinks = getRamdogDrinks(drinks, 5);
    });
  },
  data: function(){
    return{
      isDrinksLoading: true,
      randomDrinks: null,
    }
  },
  computed: mapState({
    isIngredientsLoading: state => state.ingredients.gettingIngredientsStatus === GET_INGREDIENTS_STAGES.inProgress,
    ingredients: state => state.ingredients.ingredientsList,
    isLoading(){ return this.isDrinksLoading || this.isIngredientsLoading },
    alcoholDrinksCount: state => Object.values(state.drinks.fullData)
      .filter(x => x.alcType === 'Alcoholic')
      .length,
    nonAlcoholDrinksCount: state => Object.values(state.drinks.fullData)
      .filter(x => x.alcType === 'Non alcoholic')
      .length,
    optionalAlcoholDrinksCount: state => Object.values(state.drinks.fullData)
      .filter(x => x.alcType === 'Optional alcohol')
      .length,
  }),
}

function getRamdogDrinks(drinks, count){
  const result = [];
  for(let i = 0; i < count; i++){
    let candidate;
    // keep searching for a random item which is not taken
    do {
      const randomIndex = Math.floor(Math.random() * drinks.length);
      candidate = drinks[randomIndex];
    } while(result.includes(candidate))
    result.push(candidate)
  }
  return result;
}
</script>
<style lang="scss">
  
</style>