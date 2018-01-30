<template>
  <div class="search-bar">
    <div class="search-bar__section">
      <label class="search-bar__header search-bar__header--label">
        <input type="radio" name="search-by" v-model='searchBy' :value="searchByTypes.name"> by name
      </label>
      <input 
        class='search-bar__body search-bar__body--first' 
        :disabled='!isSearchNameFieldEnabled' 
        v-model="searchName"
        :placeholder='isSearchNameFieldEnabled ? "Enter a drink name": ""'>
    </div>
    <div class="search-bar__section">
      <label class="search-bar__header search-bar__header--label">
        <input type="radio" name="search-by" v-model='searchBy' :value="searchByTypes.ingredient"> by ingredient
      </label>
      <select 
        class='search-bar__body' 
        :disabled='searchBy !== searchByTypes.ingredient' 
        v-model='searchIngredient'
        v-if='getIngredientsStage === getIngredientsStages.dataReceived'>
        <option v-for="ing in ingredients" v-bind:value="ing" :key='ing'>{{ing}}</option>
      </select>
      <spinner 
        class='search-bar__body search-bar__body--spinner' 
        v-if='getIngredientsStage === getIngredientsStages.inProgress'></spinner>
    </div>
    <div class="search-bar__section">
      <div class="search-bar__header"></div>
      <button class="search-bar__body search-bar__body--button" 
        @click="isSearchButtonActive && onSearchBtnClick()"
        :disabled='!isSearchButtonActive'>Search</button>
    </div>
  </div>
</template>

<script>
import {SEARCH_BY} from '../consts/consts'
import { mapState } from 'vuex'
import { GET_INGREDIENTS_STAGES } from '../consts/consts';
import Spinner from './spinner.vue';

export default {
  name: 'search-bar',
  components: {Spinner}, 
  data: function(){
    return {
      searchName: null,
      searchIngredient: null,
      searchBy: null,
    }
  },
  computed:mapState({
    searchingParamsState: state => state.searching,
    ingredients: state => state.ingredients.flatNamesList,
    getIngredientsStage: state => state.ingredients.gettingIngredientsStatus,
    isSearchButtonActive(){
      return this.searchBy === SEARCH_BY.name
        ? !!this.searchName
        : !!this.searchIngredient
    },
    isSearchNameFieldEnabled(){
      return this.searchBy === this.searchByTypes.name;
    }
  }),
  watch:{
    searchBy: function(newValue, oldValue){
      // clean form feilds
      if(newValue === SEARCH_BY.name) this.searchIngredient = null
      else this.searchName = null
    }
  },
  methods:{
    onSearchBtnClick: function(){
      this.$store.dispatch('startDrinkSearching', {
        param: this.searchBy === SEARCH_BY.name ? this.searchName : this.searchIngredient,
        searchBy: this.searchBy
      })
    }
  },
  created: function(){
    this.searchName = this.$store.getters.isSearchingByName 
      ? this.searchingParamsState.param
      : null;
    this.searchIngredient = this.$store.getters.isSearchingByIngredient 
      ? this.searchingParamsState.param
      : null;
    this.searchBy = this.searchingParamsState.searchBy;
    this.searchByTypes = SEARCH_BY;
    this.getIngredientsStages = GET_INGREDIENTS_STAGES;
    this.$store.dispatch('getAllIngredients')
  }
}

</script>

<style lang="scss" scoped>
  @import '../colorScheme.scss';
  @import '../functions.scss';

  $formBorderRadius: 5px;
  .search-bar{
    display: flex;
  }
  .search-bar__header{
    height: 20px;
    display: block;
    &--label{
      cursor: pointer;
      &:hover{
        color: $blueMunsell;
      }
    }
  }
  .search-bar__body{
    border: 1px solid #ccc;
    display: block;
    height: 30px;
    padding: 5px;
    background:$white;
    transition: background-color 0.2s;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    &:disabled{
      background: #eee;
    }
    &--first{
      border-top-left-radius: $formBorderRadius;
      border-bottom-left-radius: $formBorderRadius;
    }
    &--button{
      cursor: pointer;
      border-top-right-radius: $formBorderRadius;
      border-bottom-right-radius: $formBorderRadius;
      padding: 6px 12px;
      &:hover{
        background: #eee;
      };
      &:disabled{
        cursor: not-allowed;
      }
    }
    &--spinner{
      height: 30px !important;
      width: 120px !important;
      background: #eee;
    }
  }
</style>
