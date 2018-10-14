<template>
  <div class="drink-searching">
    <ul class="tabs">
      <li class="tabs__tab">Search by name</li>
      <li class="tabs__tab">Search by ingredients</li>
    </ul>
    <h3 class='drink-searching__title'>Search drinks</h3>
    <search-bar class='drink-searching__searchbar'></search-bar>
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
import SearchBar from "./search-bar.vue";
import DrinksList from "./drinksList.vue";
import Spinner from "./spinner.vue";
import { mapState } from "vuex";
import { DRINK_SEARCHING_STAGES } from "../consts/consts";

export default {
  name: "search",
  components: { SearchBar, DrinksList, Spinner },
  computed: mapState({
    searchingStage: state => state.searching.searchingStage,
    result: state => state.searching.result
  }),
  created() {
    this.searchingStages = DRINK_SEARCHING_STAGES;
  }
};
</script>

<style lang="scss" scoped>
$tabs-border-color: #ccc;
.tabs {
  list-style: none;
  display: flex;
  &__tab {
    border: 1px solid $tabs-border-color;
    border-radius: 5px;
    border-bottom-color: transparent;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    padding: 5px 10px;
  }
}

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
</style>
