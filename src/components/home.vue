<template>
  <div class="drink-searching">
    <h3 class='drink-searching__title'>Search drinks</h3>
    <search-bar class='drink-searching__searchbar' @searchByName="searchByName" @searchByIngredient='searchByIngredient'></search-bar>
    <results v-if="currentSearchingStage == searchingStages.resultsFound" class='drink-searching__results' :collection="collection"></results>
    <spinner v-if="currentSearchingStage == searchingStages.searchingInProgress"></spinner>
    <span v-if="currentSearchingStage == searchingStages.noResults">No drinks</span>
  </div>
</template>

<script>
import SearchBar from './search-bar.vue';
import Results from './results.vue';
import Spinner from './spinner.vue';
import { searchDrinksByName, searchDrinksByIng } from '../services/apiService';

const searchingStages = {
  noResults: 0,
  searchingInProgress: 1,
  resultsFound: 2,
  initialStage: 3
}

export default {
  name: 'home',
  data(){
    return {
      currentSearchingStage: searchingStages.initialStage,
      collection: []
    };
  },
  components:{ SearchBar, Results, Spinner},
  computed: {
    favoriteDrinks () {
      return this.$store.state.favoriteDrinkIds
    }
  },
  created(){
    this.searchingStages = searchingStages;
  },
  methods:{
    searchByName: function(name){
      this.collection = [];
      this.currentSearchingStage = this.searchingStages.searchingInProgress;
      searchDrinksByName(name)
        .then(this._processSearchRequest.bind(this))
    },
    searchByIngredient: function(ing){
      this.collection = [];
      this.currentSearchingStage = this.searchingStages.searchingInProgress;
      searchDrinksByIng(ing)
        .then(this._processSearchRequest.bind(this))
    },
    _processSearchRequest(response){
      this.searchingInProgress = false;
      this.collection = response.data.drinks
        ? response.data.drinks
        : [];
      
      this.currentSearchingStage = this.collection.length
        ? this.searchingStages.resultsFound
        : this.searchingStages.noResults
    }
  }
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
}
</style>
