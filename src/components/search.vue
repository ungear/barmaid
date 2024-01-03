<template>
  <div>
    <search-tabs
      :activeTab="activeTab"
      @switchTab="onTabSwitched($event)"
    ></search-tabs>
    <search-by-name v-if="activeTab === SEARCHING_TABS.name"></search-by-name>
    <search-by-ingredients v-else></search-by-ingredients>
  </div>
</template>

<script>
import SearchTabs from "./search-tabs.vue";
import SearchByName from "./search-by-name.vue";
import SearchByIngredients from "./search-by-ingredients.vue";
import { SEARCHING_TABS } from "../consts/consts";

export default {
  name: "search",
  data: function() {
    return {
      SEARCHING_TABS: SEARCHING_TABS,
      activeTab: SEARCHING_TABS.name
    };
  },
  components: { SearchTabs, SearchByName, SearchByIngredients },
  methods: {
    onTabSwitched: function(tab) {
      this.activeTab = tab;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
