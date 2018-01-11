<template>
  <div class='drink-snippet'>
    <img class='drink-snippet__thumb' :src="drink.strDrinkThumb" alt="">
    <router-link class='drink-snippet__name' :to='{name: "drink", params: {id: drink.idDrink}}'>{{drink.strDrink}}</router-link>
    <span class='drink-snippet__fav' :class="isFavorite ? 'drink-snippet__fav--favorite' : ''" @click='toggleFavoriteDrink'></span>
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
    favoriteDrinkIds: state => state.favoriteDrinkIds,
    isFavorite(state){
      return state.favoriteDrinkIds.indexOf(this.drink.idDrink) >= 0
    }
  }),
}
</script>

<style>
  .drink-snippet__thumb{
    width: 100px;
    height: 100px;
    background: #ccc;
  }
  .drink-snippet__fav{
    cursor: pointer
  }
  .drink-snippet__fav::before{
    content: '☆'
  }
  .drink-snippet__fav--favorite::before{
    content: '★'
  }
</style>


