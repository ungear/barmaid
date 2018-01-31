<template>
  <div class='drink-snippet'>
    <div class='drink-snippet__thumb'>
      <img class='drink-snippet__thumb-image' :src="drinkShortData.strDrinkThumb" alt="">
    </div>
    <div class='drink-snippet__info'>
      <div class='drink-snippet__row'>
        <router-link class='drink-snippet__name' :to='{name: "drink", params: {link: drinkLinkString}}'>{{drinkShortData.strDrink}}</router-link>
        <favorite-mark :isFavorite="isFavorite" @toggle='toggleFavorite'></favorite-mark>
      </div>
      <div class='drink-snippet__row'>
        <spinner class='drink-snippet__spinner'
          v-if="currentDetailsLoadingStage === detailsLoadingStages.inProgress" ></spinner>
        <div 
          class='drink-snippet__alc-type-icon'
          :class='"drink-snippet__alc-type-icon--" + drinkFullData.strAlcoholic[0].toLowerCase()'
          v-if='drinkFullData && drinkFullData.strAlcoholic' :title='drinkFullData.strAlcoholic'>
          <span>{{drinkFullData.strAlcoholic[0]}}</span>
        </div>
        <div class='drink-snippet__ingredients' v-if="drinkFullData">
          <div class="ingredients-list">
            <span v-for='(ing, key) in drinkFullData.ingredients' 
              class='ingredients-list__tag'
              :key='key'
              >{{ing.name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getDrinkById } from '../services/apiService';
import FavoriteMark from './favorite-mark.vue';
import Spinner from './spinner.vue';
import {DrinkShort} from '../models/drinkShort';

const detailsLoadingStages = {
  inProgress: 0,
  loaded: 1,
  failed: 2
}

export default {
  name: 'drink-snippet',
  components:{ FavoriteMark, Spinner },
  props:{
    drinkId: String,
  },
  methods:{
    toggleFavorite(){
      this.$store.dispatch('toggleFavoriteDrink', this.drinkId)
    }
  },
  computed: mapState({
    drinkShortData(state){
      return state.drinks.shortData[this.drinkId];
    },
    drinkFullData(state){
      return state.drinks.fullData[this.drinkId];
    },
    currentDetailsLoadingStage(){
      return this.drinkFullData
        ? this.detailsLoadingStages.loaded
        : this.detailsLoadingStages.inProgress
    },
    favoriteDrinkIds: state => state.favorites.favoriteDrinkIds,
    isFavorite(state){
      return this.favoriteDrinkIds.indexOf(this.drinkId) >= 0
    },
    drinkLinkString(){
      return [
        this.drinkId,
        this.drinkShortData.strDrink.toLowerCase().replace(/\s/g, '-')
      ].join('-');
    }
  }),
  created(){
    this.detailsLoadingStages = detailsLoadingStages;
  }
}
</script>

<style lang="scss" scoped>
  @import '../colorScheme.scss';
  @import '../functions.scss';

  $alcColor: red;
  $nonAlcColor: green;
  $optionalColor: orange;
  $tagColor: #555;
  .drink-snippet{
    display: flex;
    .drink-snippet__thumb{
      width: 100px;
      height: 100px;
      flex: 0 0 auto;
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
      width: 100%;
      .drink-snippet__row{
        display: flex;
        height: 100%;
        width: 100%;
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
      font-size: 1.3em;
      &:hover{
        color: $blueMunsell;
      }
    }
    .drink-snippet__alc-type-icon{
      border: 1px solid black;
      border-radius: 50%;
      padding: 3px;
      display: flex;
      height: 30px;
      flex: 0 0 30px;
      font-size:0.8em;
      align-items: center;
      justify-content: center;
      cursor: default;
      &--a{
        border-color: $alcColor;
        background-color:tint($alcColor, 80%);
        color: $alcColor;
      }
      &--n{
        border-color: $nonAlcColor;
        background-color:tint($nonAlcColor, 80%);
        color: $nonAlcColor;
      }
      &--o{
        border-color: $optionalColor;
        background-color:tint($optionalColor, 80%);
        color: $optionalColor;
      }
    }
    .drink-snippet__ingredients{
      display: flex;
      flex-wrap: nowrap;
      overflow: hidden;
      margin-left: 10px;
      width: 100%;
    }
    .ingredients-list{   
      .ingredients-list__tag{
        display: inline-block;
        border: 1px solid $tagColor;
        border-radius: 5px;
        background: #eee;
        padding: 0px 7px;
        margin: 5px 10px 0 0;
        color: $tagColor;
      }
    }
  }
</style>


