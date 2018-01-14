<template>
  <div class="search-bar">
    <div class="search-bar__section">
      <label class="search-bar__header">
        <input type="radio" name="search-by" v-model='searchBy' value="name"> by name
      </label>
      <input class='search-bar__body' :disabled='searchBy !== "name"' v-model="searchName">
    </div>
    <div class="search-bar__section">
      <label class="search-bar__header">
        <input type="radio" name="search-by" v-model='searchBy' value="ingedient"> by ingredient
      </label>
      <select class='search-bar__body' :disabled='searchBy !== "ingedient"' v-model='searchIngredient'>
        <option v-for="ing in ingredients" v-bind:value="ing">{{ing}}</option>
      </select>
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
import { getIngredients } from '../services/apiService';

export default {
  name: 'search-bar',
  data: function(){
    return{
      searchName: null,
      searchIngredient: null,
      searchBy: 'name',
      ingredients: [],
    }
  },
  computed:{
    isSearchButtonActive(){
      return this.searchBy === 'name'
        ? !!this.searchName
        : !!this.searchIngredient
    }
  },
  watch:{
    searchBy: function(newValue, oldValue){
      if(newValue === 'name') this.searchIngredient = null
      else this.searchName = null
    }
  },
  methods:{
    onSearchBtnClick: function(){
      if(this.searchBy === 'name')
        this.$emit('searchByName', this.searchName);
      else
        this.$emit('searchByIngredient', this.searchIngredient);
    }
  },
  created: function(){
    getIngredients()
      .then(ingredients => this.ingredients = ingredients)
      .catch(function (error) {})
  }
}

</script>

<style lang="scss" scoped>
  @import '../colorScheme.scss';

  .search-bar{
    display: flex;
  }
  .search-bar__header{
    height: 20px;
    display: block;
  }
  .search-bar__switcher{}
  .search-bar__body{
    border: 1px solid $aurometalsaurus;
    display: block;
    height: 20px;
    background:$white;
    &:disabled{
      background: $lightGray;
    }
    &.search-bar__body--button{
      cursor: pointer;
      &:disabled{
        cursor: not-allowed;
      }
    }
  }
</style>
