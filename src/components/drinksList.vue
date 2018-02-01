<template>
  <div class='drinks-list'>
    <div>
      Sort by 
      <select 
        v-model='sortBy'>
        <option value="name">Name</option>
        <option value="type">Type</option>
      </select>
    </div>
    <drink-snippet class='drinks-list__item' :drinkId="x.idDrink" v-for="x in processedDrinksData" v-bind:key="x.idDrink"></drink-snippet>
  </div>
</template>

<script>
import DrinkSnippet from './drinkSnippet.vue'
import { mapState } from 'vuex'

export default {
  name: 'drinks-list',
  components: {DrinkSnippet},
  props:{
    drinkIds: Array
  },
  data: function(){
    return {
      sortBy: 'name'
    }
  },
  computed: mapState({
    drinksCache: state => state.drinks.fullData,
    drinksRawData(state){
      return this.drinkIds.map(x => state.drinks.fullData[x]).filter(x => x)
    },
    processedDrinksData(){
      return this.sortBy === 'name'
        ? this.drinksRawData.slice().sort(sortDrinksByName)
        : this.drinksRawData.slice().sort(sortDrinksByTypeThenName)
    }
  }),
  created(){
    this.drinkIds.forEach(id => {
      if(!this.drinksCache[id]){
        this.$store.dispatch('loadDrinkFullData', id)
      }
    })
  }
}

function sortDrinksByName(a,b){
  if(a.strDrink < b.strDrink) return -1
  else if (a.strDrink > b.strDrink) return 1
  else return 0
}

function sortDrinksByTypeThenName(a,b){
  if(a.strAlcoholic < b.strAlcoholic) return -1
  else if (a.strAlcoholic > b.strAlcoholic) return 1
  else return sortDrinksByName(a,b)
}
</script>

<style lang="scss" scoped>
  .drinks-list{
    &__item{
      display: flex;
    }
    &__item + &__item {
      padding-top: 1em;
      border-top: 1px solid #ccc;
      margin-top: 1em;
    }
  }
</style>
