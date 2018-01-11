<template>
  <div class='drink-snippet'>
    <img class='drink-snippet__thumb' :src="drink.strDrinkThumb" alt="">
    <router-link class='drink-snippet__name' :to='{name: "drink", params: {id: drink.idDrink}}'>{{drink.strDrink}}</router-link>
    <button class='drink-snippet__fav' :class="favoriteDrinkIds.indexOf(drink.idDrink) >= 0 ? 'favorite' : ''" @click='toggleFavoriteDrink'>&#x02606</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'drink-snippet',
  props:{
    drink: Object
  },
  methods:{
    toggleFavoriteDrink(drinkId){
      this.$store.dispatch('toggleFavoriteDrink', this.drink.idDrink)
    }
  },
  computed: mapState({
    favoriteDrinkIds: state => state.favoriteDrinkIds
  }),
}
</script>

<style>
  .drink-snippet__thumb{
    width: 100px;
    height: 100px;
    background: #ccc;
  }
</style>


