<template>
  <div class='favorite-drinks'>
    <div class="favorite-drinks__head">
      <h3 class='favorite-drinks__title'>Your favorite drinks</h3>
    </div>
    <drinks-list
      class='favorite-drinks__list'
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
  data(){
    return {
      // .slice is used to prevent further changes in the array when drinks are disliked
      favoriteDrinkIds: this.$store.state.favorites.favoriteDrinkIds.slice()
    }
  }
}
</script>

<style lang="scss" scoped>
  .favorite-drinks{
    &__title{
      display: inline-block;
    }
    &__head{
      min-height: 24px;
    }
    &__restore{
      margin-left: 1em;
      padding: 3px 6px;
      font-size: 0.8em;
      border: 1px solid #ccc;
      background: #eee;
      border-radius: 3px;
    }
    .favorite-drinks__list{
      margin: 1em 0;
    }

    .fade-leave-active, .fade-enter-active {
      transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to{
      opacity: 0;
    }
  }
</style>


