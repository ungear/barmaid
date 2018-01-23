<template>
  <div class='drink-snippet'>
    <div class='drink-snippet__thumb'>
      <img class='drink-snippet__thumb-image' :src="drinkBaseData.strDrinkThumb" alt="">
    </div>
    <div class='drink-snippet__info'>
      <div class='drink-snippet__row'>
        <router-link class='drink-snippet__name' :to='{name: "drink", params: {id: drinkBaseData.idDrink}}'>{{drinkBaseData.strDrink}}</router-link>
        <favorite-mark :isFavorite="isFavorite" @toggle='toggleFavorite'></favorite-mark>
      </div>
      <div class='drink-snippet__row'>
        <spinner class='drink-snippet__spinner'
          v-if="currentDetailsLoadingStage == detailsLoadingStages.inProgress" ></spinner>
        <div 
          class='drink-snippet__alc-type-icon'
          v-if='drinkDetails.strAlcoholic' :title='drinkDetails.strAlcoholic'>{{drinkDetails.strAlcoholic[0]}}</div>
        <div class='drink-snippet__ingredients'>
          <div class="ingredients-list">
            <span v-for='(ing, key) in drinkDetails.ingredients' 
              class='ingredients-list__tag'
              :key='ing.name'
              >{{ing.name}}</span>
          </div>
          <div class='drink-snippet__ingredients-shadow'></div>
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
import {DrinkFull} from '../models/drinkFull';

const detailsLoadingStages = {
  inProgress: 0,
  loaded: 1,
  failed: 2
}

export default {
  name: 'drink-snippet',
  components:{ FavoriteMark, Spinner },
  props:{
    drinkShort: DrinkShort,
    drinkFull: DrinkFull
  },
  data: function(){
    return {
      drinkDetails: {},
      currentDetailsLoadingStage: null
    }
  },
  methods:{
    toggleFavorite(){
      this.$store.dispatch('toggleFavoriteDrink', this.drinkBaseData.idDrink)
    }
  },
  computed: mapState({
    drinkBaseData(){
      let dataSource = this.drinkFull ? this.drinkFull : this.drinkShort;
      return new DrinkShort(dataSource)
    },
    favoriteDrinkIds: state => state.favoriteDrinkIds,
    isFavorite(state){
      return state.favoriteDrinkIds.indexOf(this.drinkBaseData.idDrink) >= 0
    }
  }),
  created(){
    this.detailsLoadingStages = detailsLoadingStages;
    if(this.drinkFull){
      this.drinkDetails = this.drinkFull;
      this.currentDetailsLoadingStage = this.detailsLoadingStages.loaded;
    }
    else {
      this.currentDetailsLoadingStage = this.detailsLoadingStages.inProgress;
      getDrinkById(this.drinkBaseData.idDrink).then(drinkFull => {
        this.drinkDetails = drinkFull;
        this.currentDetailsLoadingStage = this.detailsLoadingStages.loaded;
      })
    }
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
      background: #ccc;
      padding: 3px;
      display: inline-block;
      width: 20px;
      height: 20px;
      flex: 0 0 20px;
      font-size:0.8em;
      text-align: center;
    }
    .drink-snippet__ingredients{
      display: flex;
      flex-wrap: nowrap;
      overflow: hidden;
      margin-left: 10px;
      position: relative;
      width: 100%;
      .drink-snippet__ingredients-shadow{
        position: absolute;
        right: 0;
        width: 50px;
        height: 100%;
        background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
      }
    }
    .ingredients-list{   
      display: flex;
      flex: 1 0 auto;
      .ingredients-list__tag{
        display: inline-block;
        border: 1px solid black;
        border-radius: 5px;
        background: #ccc;
        padding: 0px 3px;
      }
      .ingredients-list__tag + .ingredients-list__tag{
        margin-left: 10px;
      }
    }
  }
</style>


