<template>
  <div class='found-drinks'>
    <drink-snippet :drink="x" v-for="x in collection" v-bind:key="x.drinkId"></drink-snippet>
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

<style>
</style>
