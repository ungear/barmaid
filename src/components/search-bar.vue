<template>
  <div class="search-bar">
    <div class="search-bar__section">
      <label class="search-bar__header">
        <input type="radio" name="search-by" v-model='searchBy' value="name"> by name
      </label>
      <div class="">
        <input :disabled='searchBy !== "name"' v-model="searchName">
      </div>
    </div>
    <div class="search-bar__section">
      <label class="search-bar__header">
        <input type="radio" name="search-by" v-model='searchBy' value="ingedient"> by ingredient
      </label>
      <div class="">
        <select :disabled='searchBy !== "ingedient"' v-model='searchIngredient'>
          <option v-for="ing in ingredients" v-bind:value="ing">{{ing}}</option>
        </select>
      </div>
    </div>
    <div class="search-bar__section">
      <div class="search-bar__header"></div>
      <div class="">
        <button @click="onSearchBtnClick">Search</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getIngredients } from '../services/apiService';

export default {
  name: 'search-bar',
  data: function(){
    return{
      searchName: '',
      searchIngredient: '',
      searchBy: 'name',
      ingredients: [],
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
  created(){
    getIngredients()
      .then(ingredients => this.ingredients = ingredients)
      .catch(function (error) {})
  }
}

</script>

<style>
  .search-bar{
    display: flex;
  }
  .search-bar__header{
    height: 20px;
  }
  .search-bar__switcher{}
</style>
