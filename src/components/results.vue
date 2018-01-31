<template>
  <div class='found-drinks'>
    <drink-snippet class='found-drinks__item' :drinkId="x" v-for="x in resultIds" v-bind:key="x"></drink-snippet>
  </div>
</template>

<script>
import DrinkSnippet from './drinkSnippet.vue'
import { mapState } from 'vuex'

export default {
  name: 'results',
  components: {DrinkSnippet},
  computed: mapState({
    resultIds: state => state.searching.resultIds
  }),
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
