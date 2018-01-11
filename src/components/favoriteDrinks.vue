<template>
  <div class='found-drinks'>
    <h4>Your favorite drinks:</h4>
    <drink-snippet :drink="x" v-for="x in collection" v-bind:key="x.drinkId"></drink-snippet>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DrinkSnippet from './drinkSnippet.vue'

export default {
  name: 'favoriteDrinks',
  components: {DrinkSnippet},
  computed: mapState({
    favoriteDrinkIds: state => state.favoriteDrinkIds
  }),
}
</script>

<style>

</style>


