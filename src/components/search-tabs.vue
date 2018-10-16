<template>
  <ul class="tabs">
    <li 
      class="tabs__tab" 
      :class="{ 'tabs__tab--active': activeTab === SEARCHING_TABS.name}"
      @click='onTabClick(SEARCHING_TABS.name)'>Search by name</li>
    <li 
      class="tabs__tab"
      :class="{ 'tabs__tab--active': activeTab === SEARCHING_TABS.ingredients}"
      @click='onTabClick(SEARCHING_TABS.ingredients)'>Search by ingredients</li>
  </ul>
</template>

<script>
import { SEARCHING_TABS } from "../consts/consts";

export default {
  name: "search-tabs",
  props: {
    activeTab: String
  },
  data: function(){
    return{
      SEARCHING_TABS: SEARCHING_TABS
    }
  },
  methods:{
    onTabClick: function(tab){
      if(tab !== this.activeTab)
        this.$emit('switchTab', tab)
    }
  }
}
</script>

<style lang="scss" scoped>
$tabs-border-color: #ccc;
.tabs {
  list-style: none;
  display: flex;
  border-bottom: 1px solid $tabs-border-color;
  &__tab {
    border: 1px solid $tabs-border-color;
    border-radius: 5px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    border-bottom-width: 0px;
    padding: 5px 10px;
    background: #eee;
    cursor: pointer;
    &--active{
      margin-bottom: -1px;
      background: #fff;
    }
  }
  &__tab + &__tab{
    margin-left: 10px;
  }
}

</style>


