<template>
  <div class="searching" v-if="isIngredientsLoaded">
    <ingredients-picker
      @select="onIngredientsSelected($event)"></ingredients-picker>
    <div class="searching__results">
      <transition name="fade">
        <drinks-list 
          v-if="searchingStage == searchingStages.drinksFound" 
          :drinks="result"></drinks-list>
      </transition>
      <spinner 
        class="searching__loader"
        v-if="searchingStage == searchingStages.inProgress"></spinner>
      <div 
        v-if="searchingStage === searchingStages.noResults">Drinks not found</div>
    </div>
  </div>
  <spinner v-else></spinner>
</template>

<script>
import { DRINK_SEARCHING_STAGES, GET_INGREDIENTS_STAGES } from "../consts/consts";
import { searchDrinksByIng } from "../services/apiService";
import IngredientsPicker from "./ingredients-picker.vue";
import DrinksList from "./drinksList.vue";
import Spinner from "./spinner.vue";
import { mapState } from "vuex";

export default {
  name: "search-by-ingredients",
  data: function() {
    return {
      searchingStage: DRINK_SEARCHING_STAGES.notStartedYet,
      result: null
    };
  },
  components: { IngredientsPicker, DrinksList, Spinner },
  created() {
    this.searchingStages = DRINK_SEARCHING_STAGES;
    if(!this.isIngredientsLoaded){
      this.$store.dispatch("getAllIngredients");
    }
  },
  computed: mapState({
    isIngredientsLoaded: state => state.ingredients.gettingIngredientsStatus === GET_INGREDIENTS_STAGES.dataReceived
  }),
  methods: {
    onIngredientsSelected: function(selectedIngs) {
      if (!selectedIngs.length) {
        this.result = null;
        this.searchingStage = DRINK_SEARCHING_STAGES.notStartedYet;
        return;
      }
      this.searchingStage = DRINK_SEARCHING_STAGES.inProgress;
      let ingIds = selectedIngs.map(x => x._id);
      searchDrinksByIng(ingIds).then(drinks => {
        if (drinks.length === 0) {
          this.searchingStage = DRINK_SEARCHING_STAGES.noResults;
          return;
        }

        this.searchingStage = DRINK_SEARCHING_STAGES.drinksFound;
        this.result = drinks;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.searching {
  padding-top: 10px;
  &__results {
    margin-top: 10px;
  }
  &__loader {
    margin: auto;
  }
}
</style>

