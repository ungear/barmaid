<template>
<div class="">
  <search-bar  @searchByName="searchByName" @searchByIngredient='searchByIngredient'></search-bar>
  <results :collection="collection"></results>
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

<style>

</style>
