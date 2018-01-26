<template>
  <div class="drink-searching">
    <h3 class='drink-searching__title'>Search drinks</h3>
    <search-bar class='drink-searching__searchbar'></search-bar>
    <results 
      v-if="searchingStage == searchingStages.drinksFound" 
      class='drink-searching__results' 
      :collection="results"></results>
    <spinner 
      class='drink-searching__spinner' 
      v-if="searchingStage == searchingStages.inProgress"></spinner>
    <span v-if="searchingStage == searchingStages.noResults">No drinks</span>
  </div>
</template>

<script>
import SearchBar from './search-bar.vue';
import Results from './results.vue';
import Spinner from './spinner.vue';
import { DrinkShort } from '../models/drinkShort';
import { mapState } from 'vuex'
import { DRINK_SEARCHING_STAGES } from '../consts/consts'

export default {
  name: 'home',
  components:{ SearchBar, Results, Spinner},
  computed: mapState({
    favoriteDrinks: state => state.favoriteDrinkIds,
    searchingStage: state => state.searching.searchingStage,
    results: state => state.searching.results
  }),
  created(){
    this.searchingStages = DRINK_SEARCHING_STAGES;
  },
}
</script>

<style lang="scss" scoped>
.drink-searching{
  .drink-searching__searchbar{
    margin-top: 0.5em;
  }
  .drink-searching__results{
    margin-top:1em;
  }
  .drink-searching__spinner{
    margin: 20px 0 0 20px;
  }
}
</style>
