<template>
  <div class="drink-searching">
    <search-tabs
      :activeTab="activeTab"
      @switchTab="onTabSwitched($event)"
    ></search-tabs>
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
import SearchTabs from "./search-tabs.vue";
import { mapState } from "vuex";
import { DRINK_SEARCHING_STAGES, SEARCHING_TABS } from "../consts/consts";

export default {
  name: "search",
  data:function() {
    return {
      activeTab: SEARCHING_TABS.name,
    };
  },
  components: { SearchBar, DrinksList, Spinner, SearchTabs },
  computed: mapState({
    searchingStage: state => state.searching.searchingStage,
    result: state => state.searching.result
  }),
  created() {
    this.searchingStages = DRINK_SEARCHING_STAGES;
  },
  methods:{
    onTabSwitched: function(tab){
      this.activeTab = tab
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
</style>
