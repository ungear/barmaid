<template>
  <div class='found-drinks'>
    <h3>Your favorite drinks:</h3>
    <div class='found-drinks__list'>
      <drink-snippet :drinkId="x.idDrink" v-for="x in sortedFavoriteDrinks" v-bind:key="x.idDrink"></drink-snippet>
    </div>
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
    favoriteDrinkIds: state => state.favorites.favoriteDrinkIds,
    drinksFullData: state => state.drinks.fullData,
    sortedFavoriteDrinks: function() {
      return this.favoriteDrinks.slice().sort(sortDrinksByName);
    }
  }),
  data: function(){ 
    return{
      favoriteDrinks:[]
    }
  },
  created: function(){
    this.favoriteDrinkIds.forEach(id => {
      if(this.drinksFullData[id])
        this.favoriteDrinks.push(this.drinksFullData[id])
      else {
        this.$store.dispatch('loadDrinkFullData', id).then((drink) => { 
          this.favoriteDrinks.push(drink)
        })
      }
    })
  }
}

function sortDrinksByName(a,b){
  if(a.strDrink < b.strDrink) return -1
  else if (a.strDrink > b.strDrink) return 1
  else return 0
}
</script>

<style lang="scss" scoped>
  .found-drinks{
    .found-drinks__list{
      margin-top: 1em;
    }
  }
  .drink-snippet + .drink-snippet {
    margin-top: 1em;
  }
</style>


