<template>
  <div class='drink-snippet'>
    <div class='drink-snippet__thumb'>
      <img class='drink-snippet__thumb-image' :src="drink.strDrinkThumb" alt="">
    </div>
    <div class='drink-snippet__info'>
      <div class='drink-snippet__row'>
        <router-link class='drink-snippet__name' :to='{name: "drink", params: {id: drink.idDrink}}'>{{drink.strDrink}}</router-link>
        <favorite-mark :isFavorite="isFavorite" @toggle='toggleFavorite'></favorite-mark>
      </div>
      <div class='drink-snippet__row'>
        <spinner class='drink-snippet__spinner'
          v-if="currentDetailsLoadingStage == detailsLoadingStages.inProgress" ></spinner>
        <span v-if='drinkDetails.strAlcoholic === "Alcoholic"'>A</span>
        <span v-if='drinkDetails.strAlcoholic === "Non alcoholic"'>N</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getDrinkById } from '../services/apiService';
import FavoriteMark from './favorite-mark.vue';
import Spinner from './spinner.vue';

const detailsLoadingStages = {
  inProgress: 0,
  loaded: 1,
  failed: 2
}

export default {
  name: 'drink-snippet',
  components:{ FavoriteMark, Spinner },
  props:{
    drink: Object
  },
  data: function(){
    return {
      drinkDetails: {},
      currentDetailsLoadingStage: null
    }
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
  created(){ this.detailsLoadingStages = detailsLoadingStages},
  mounted(){
    this.currentDetailsLoadingStage = this.detailsLoadingStages.inProgress;
    getDrinkById(this.drink.idDrink).then(drink => {
      this.drinkDetails = drink;
      this.currentDetailsLoadingStage = this.detailsLoadingStages.loaded;
    })
  }
}
</script>

<style lang="scss" scoped>
  @import '../colorScheme.scss';
  .drink-snippet{
    display: flex;
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
    .drink-snippet__info{
      display: flex;
      flex-direction: column;
      margin-left: 1em;
      .drink-snippet__row{
        display: flex;
        height: 100%;
        align-items: center;
      }
    }
    .drink-snippet__spinner{
      transform: scale(0.5);
    }
    .drink-snippet__name{
      text-decoration: none;
      color: #000;
      font-weight: 700;
      &:hover{
        color: $blueMunsell;
      }
    }
  }
</style>


