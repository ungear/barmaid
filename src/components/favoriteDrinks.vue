<template>
  <div class='favorite-drinks'>
    <div class="favorite-drinks__head">
      <h3 class='favorite-drinks__title'>Your favorite drinks</h3>
      <transition name="fade">
        <button 
          class='favorite-drinks__restore' 
          v-if='someDrinksWereDisliked'
          @click='onRestoreClick()'>Restore</button>
      </transition>
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
  computed: mapState({
    favoriteDrinkIds: state => state.favorites.favoriteDrinkIds,
    someDrinksWereDisliked: state => state.favorites.dislikedDrinkIds.length > 0
  }),
  methods:{
    onRestoreClick(){
      this.$store.dispatch('restoreDislikedDrinks')
    }
  }
}
</script>

<style lang="scss" scoped>
  .favorite-drinks{
    &__title{
      display: inline-block;
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


