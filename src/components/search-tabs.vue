<template>
  <ul class="tabs">
    <li 
      class="tabs__tab" 
      :class="{ 'tabs__tab--active': activeTab === 'name'}"
      @click='onTabClick("name")'>Search by name</li>
    <li 
      class="tabs__tab"
      :class="{ 'tabs__tab--active': activeTab === 'ingredients'}"
      @click='onTabClick("ingredients")'>Search by ingredients</li>
  </ul>
</template>

<script>
export default {
  name: "search-tabs",
  props: {
    activeTab:String
  },
  methods:{
    onTabClick: function(tabName){
      if(tabName !== this.activeTab)
        this.$emit('switchTab', tabName)
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
    border-bottom-color: transparent;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    padding: 5px 10px;
    background: #fff;
    cursor: pointer;
    &--active{
      margin-bottom: -1px;
    }
  }
  &__tab + &__tab{
    margin-left: 10px;
  }
}

</style>


