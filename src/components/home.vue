<template>
  <div class="drink-searching">
    <h3 class='drink-searching__title'>Search drinks</h3>
    <search-bar class='drink-searching__searchbar' @searchByName="searchByName" @searchByIngredient='searchByIngredient'></search-bar>
    <results class='drink-searching__results' :collection="collection"></results>
  </div>
</template>

<script>
import SearchBar from './search-bar.vue';
import Results from './results.vue';
import { searchDrinksByName, searchDrinksByIng } from '../services/apiService';

export default {
  name: 'home',
  data(){
    return {collection: []};
  },
  components:{
    SearchBar,
    Results,
  },
  computed: {
    favoriteDrinks () {
      return this.$store.state.favoriteDrinkIds
    }
  },
  methods:{
    searchByName: function(name){
      this.collection = [];
      searchDrinksByName(name)
        .then(this._processSearchRequest.bind(this))
    },
    searchByIngredient: function(ing){
      this.collection = [];
      searchDrinksByIng(ing)
        .then(this._processSearchRequest.bind(this))
    },
    _processSearchRequest(response){
      this.collection = response.data.drinks
        ? response.data.drinks
        : [];
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
