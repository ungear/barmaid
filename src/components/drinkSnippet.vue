<template>
  <div class='drink-snippet'>
    <div class='drink-snippet__thumb'>
      <img class='drink-snippet__thumb-image' :src="drink.strDrinkThumb" alt="">
    </div>
    <router-link class='drink-snippet__name' :to='{name: "drink", params: {id: drink.idDrink}}'>{{drink.strDrink}}</router-link>
    <favorite-mark :isFavorite="isFavorite" @toggle='toggleFavorite'></favorite-mark>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FavoriteMark from './favorite-mark.vue'

export default {
  name: 'drink-snippet',
  components:{
    FavoriteMark
  },
  props:{
    drink: Object
  },
  methods:{
    toggleFavorite(){
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

<style lang="scss" scoped>
  @import '../colorScheme.scss';
  .drink-snippet{
    display: flex;
    align-items: center;
    .drink-snippet__thumb{
      width: 100px;
      height: 100px;
      background: #ccc;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      .drink-snippet__thumb-image{
        width: 100px;
        height: 100px;
        transition: width .5s, height .5s;
        &:hover{
          width: 120px;
          height: 120px;
        }
      }
    }
    .drink-snippet__name{
      margin-left: 1em;
      text-decoration: none;
      color: #000;
      &:hover{
        color: $blueMunsell;
      }
    }
  }
</style>


