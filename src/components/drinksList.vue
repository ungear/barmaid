<template>
  <div class='found-drinks'>
    <div>Count: {{drinksRawData.length}}</div>
    <drink-snippet class='found-drinks__item' :drinkId="x" v-for="x in drinkIds" v-bind:key="x"></drink-snippet>
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
  computed: mapState({
    drinksRawData(state){
      return this.drinkIds.map(x => state.drinks.fullData[x]).filter(x => x)
    }
  }),
  created(){
    this.drinkIds.forEach(id => {
      if(!this.drinksRawData[id]){
        this.$store.dispatch('loadDrinkFullData', id)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .found-drinks{
    padding: 1em 0;
    .found-drinks__item{
      display: flex;
    }
    .found-drinks__item + .found-drinks__item {
      padding-top: 1em;
      border-top: 1px solid #ccc;
      margin-top: 1em;
    }
  }
</style>
