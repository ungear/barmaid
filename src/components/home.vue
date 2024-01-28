<template lang="">
  <div>
    <h1>Welcome to the Barmaid. Enjoy browsing the cocktails collections.</h1>
    <section v-if="!isLoading">
      <h3>Currently we have</h3> 
      <ul> 
        <li>{{alcoholDrinksCount}} alcoholic cocktails</li>
        <li>{{nonAlcoholDrinksCount}} non-alcoholic cocktails</li>
        <li>{{optionalAlcoholDrinksCount}} optionally alcoholic cocktails</li>
        <li>{{ingredients.length}} ingredients</li>
      </ul>
      <h3>Some random drinks from the collection</h3>
      <div class="drinks">
        <drink-snippet 
          class='drinks__item'
          :drink="x" 
          v-for="x in randomDrinks" 
          v-bind:key="x.idDrink"></drink-snippet>
      </div>
    </section>
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
      const randomDrinks = getRamdogDrinks(drinks, 6);
      // sort by the number of ingredients
      // then swap drinks to make sure that items with the largest number of ingredients
      // take 1st and 4th positions to be rendered in tiles with 100% width
      randomDrinks.sort((a,b) => {
        return a.ingredients.length - b.ingredients.length;
      });
      let temp = randomDrinks[0];
      randomDrinks[0] = randomDrinks[randomDrinks.length-1];
      randomDrinks[randomDrinks.length-1] = temp;
      temp = randomDrinks[3];
      randomDrinks[3] = randomDrinks[randomDrinks.length-2];
      randomDrinks[randomDrinks.length-2] = temp;

      this.randomDrinks = randomDrinks;
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
<style lang="scss" scoped>
  ul{
    padding-left: 20px;
  }

  .drinks{
    padding: 10px 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;

    &__item {
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 10px
    }

    &__item:nth-child(3n-2){
      grid-column-start: 1;
      grid-column-end: 3;
    }
  }
</style>