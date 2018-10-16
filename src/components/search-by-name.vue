<template>
  <div class="drink-searching">
    <div class="searchbar">
      <input type="text" v-model="searchName"/>
      <button @click="onSearchClick()">search</button>
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
import DrinksList from "./drinksList.vue";
import Spinner from "./spinner.vue";

export default {
  name: "search-by-name",
  data:function() {
    return {
      searchName: "",
      searchingStage:DRINK_SEARCHING_STAGES.notStartedYet,
    };
  },
  components: { DrinksList, Spinner },
  // computed: mapState({
  //   searchingStage: state => state.searching.searchingStage,
  //   result: state => state.searching.result
  // }),
  created() {
    this.searchingStages = DRINK_SEARCHING_STAGES;
  },
  methods:{
    onSearchClick: function(){
      console.log(this.searchName)
    }
  }
}
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


