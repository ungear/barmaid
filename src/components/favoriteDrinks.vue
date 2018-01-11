<template>
  <div class='found-drinks'>
    <h4>Your favorite drinks:</h4>
    <drink-snippet :drink="x" v-for="x in favoriteDrinks" v-bind:key="x.drinkId"></drink-snippet>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DrinkSnippet from './drinkSnippet.vue'
import { getDrinkById } from '../services/apiService';

export default {
  name: 'favoriteDrinks',
  components: {DrinkSnippet},
  computed: mapState({
    favoriteDrinkIds: state => state.favoriteDrinkIds,
  }),
  data: function(){ 
    return{
      favoriteDrinks:[]
    }
  },
  created: function(){
    this.favoriteDrinkIds.forEach(id => {
      getDrinkById(id).then(drink => this.favoriteDrinks.push(drink))
    })
  }
}
</script>

<style>

</style>


