<template>
  <div class="searching">
    <ingredients-picker
      @select="onIngredientsSelected($event)"></ingredients-picker>
    <div class="searching__results">
      <drinks-list 
        v-if="searchingStage == searchingStages.drinksFound" 
        :drinks="result"></drinks-list>
      <spinner 
        class="searching__loader"
        v-if="searchingStage == searchingStages.inProgress"></spinner>
      <div 
        v-if="searchingStage === searchingStages.noResults">Drinks not found</div>
    </div>
  </div>
</template>

<script>
import { DRINK_SEARCHING_STAGES } from "../consts/consts";
import { searchDrinksByIng } from "../services/apiService";
import IngredientsPicker from "./ingredients-picker.vue";
import DrinksList from "./drinksList.vue";
import Spinner from "./spinner.vue";

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
  },
  methods: {
    onIngredientsSelected: function(selectedIngs) {
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
  &__results{
    margin-top: 10px;
  }
  &__loader{
    margin: auto;
  }
}
</style>

