<template>
  <div class='found-drinks'>
    <drink-snippet class='found-drinks__item' :drinkShort="x" v-for="x in collection" v-bind:key="x.idDrink"></drink-snippet>
  </div>
</template>

<script>
import DrinkSnippet from './drinkSnippet.vue'

export default {
  name: 'results',
  components: {DrinkSnippet},
  props:{
    collection: Array
  },
}
</script>

<style lang="scss" scoped>
  .found-drinks{
    .found-drinks__item + .found-drinks__item {
      margin-top: 1em;
    }
  }
</style>
