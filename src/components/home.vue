<template lang="">
  <div>
    <h1>Welcome to the Barmaid. Enjoy browsing the cocktails collections.</h1>
    <p v-if="!isLoading">
      <h2>Currently we have</h2> 
      <ul> 
        <li>{{alcoholDrinksCount}} alcoholic cocktails</li>
        <li>{{nonAlcoholDrinksCount}} non-alcoholic cocktails</li>
        <li>{{optionalAlcoholDrinksCount}} optionally alcoholic cocktails</li>
        <li>{{ingredients.length}} ingredients</li>
      </ul>
    </p>
    <spinner v-if="isLoading"></spinner>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { GET_INGREDIENTS_STAGES } from "../consts/consts";
import Spinner from "./spinner.vue";

export default {
  name: "home",
  components: { Spinner },
  created: function(){
    this.$store.dispatch("getAllIngredients");
    this.$store.dispatch("loadAllDrinks").then(x => {
      this.isDrinksLoading = false;
    });
  },
  data: function(){
    return{
      isDrinksLoading: true,
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
</script>
<style lang="scss">
  
</style>