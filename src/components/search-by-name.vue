<template>
  <div class="drink-searching">
    <div class="searchbar">
      <input class="searchbar__input" type="text" v-model="searchName"/>
      <button class="searchbar__button" @click="onSearchClick()">Search</button>
    </div>
    <drinks-list 
      v-if="searchingStage == searchingStages.drinksFound" 
      class='drink-searching__results'
      :drinks="result"></drinks-list>
    <spinner 
      class='drink-searching__spinner' 
      v-if="searchingStage == searchingStages.inProgress"></spinner>
    <div 
      class='drink-searching__zero-result'
      v-if="searchingStage === searchingStages.noResults">Drinks not found</div>
  </div>
</template>

<script>
import { DRINK_SEARCHING_STAGES } from "../consts/consts";
import { searchDrinksByName } from "../services/apiService";
import DrinksList from "./drinksList.vue";
import Spinner from "./spinner.vue";

export default {
  name: "search-by-name",
  data: function() {
    return {
      searchName: "",
      searchingStage: DRINK_SEARCHING_STAGES.notStartedYet,
      result: null
    };
  },
  components: { DrinksList, Spinner },
  created() {
    this.searchingStages = DRINK_SEARCHING_STAGES;
  },
  methods: {
    onSearchClick: function() {
      this.searchingStage = DRINK_SEARCHING_STAGES.inProgress;
      searchDrinksByName(this.searchName).then(drinks => {
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
.drink-searching {
  .drink-searching__searchbar {
    margin-top: 0.5em;
  }
  .drink-searching__results {
    margin: 1em 0;
  }
  .drink-searching__spinner {
    margin: 20px 0 0 20px;
  }
  .drink-searching__zero-result {
    text-align: center;
    padding-top: 30px;
    font-weight: 600;
  }
}

.searchbar {
  display: flex;
  height: 30px;
  max-width: 300px;
  margin: 10px 0;
  &__input {
    flex: 1;
    padding: 5px;
    border: 1px solid #ccc;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  &__button {
    cursor: pointer;
    padding: 5px;
    border: 1px solid #ccc;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
}
</style>


