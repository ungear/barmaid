<template>
  <div class='favorite-drinks'>
    <div class="favorite-drinks__head">
      <h3 class='favorite-drinks__title'>Your favorite drinks</h3>
    </div>
    <drinks-list
      class='favorite-drinks__list'
      :drinks="favoriteDrinksData"
      v-if='favoriteDrinkIds.length && ingredients.length'></drinks-list>
    <div 
      class='favorite-drinks__empty' 
      v-if='favoriteDrinkIds.length === 0'>It seams that your Favorite list is empty so far</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import DrinksList from "./drinksList.vue";
import { getDrinkFullDataById } from "../services/apiService";

export default {
  name: "favoriteDrinks",
  components: { DrinksList },
  computed: mapState({
    ingredients: state => state.ingredients.ingredientsList
  }),
  data() {
    return {
      // .slice is used to prevent further changes in the array when drinks are disliked
      favoriteDrinkIds: this.$store.state.favorites.favoriteDrinkIds.slice(),
      favoriteDrinksData: []
    };
  },
  created() {
    this.$store.dispatch("getAllIngredients");
    Promise.all(this.favoriteDrinkIds.map(x => getDrinkFullDataById(x))).then(data => {
      this.favoriteDrinksData = data;
    });
  }
};
</script>

<style lang="scss" scoped>
.favorite-drinks {
  &__title {
    display: inline-block;
  }
  &__head {
    min-height: 24px;
  }
  &__restore {
    margin-left: 1em;
    padding: 3px 6px;
    font-size: 0.8em;
    border: 1px solid #ccc;
    background: #eee;
    border-radius: 3px;
  }
  .favorite-drinks__list {
    margin: 1em 0;
  }
  .favorite-drinks__empty {
    padding-top: 30px;
  }
  .fade-leave-active,
  .fade-enter-active {
    transition: opacity 0.3s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>


