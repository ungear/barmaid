<template>
  <div class='found-drinks'>
    <h3>Your favorite drinks:</h3>
    <drinks-list
      class='found-drinks__list'
      :drinkIds="favoriteDrinkIds"></drinks-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DrinkSnippet from './drinkSnippet.vue'
import DrinksList from './drinksList.vue';
import { getDrinkById } from '../services/apiService';

export default {
  name: 'favoriteDrinks',
  components: {DrinkSnippet,DrinksList},
  computed: mapState({
    favoriteDrinkIds: state => state.favorites.favoriteDrinkIds,
  }),
}
</script>

<style lang="scss" scoped>
  .found-drinks{
    .found-drinks__list{
      margin-top: 1em;
    }
  }
</style>


