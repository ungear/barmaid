<template>
  <div>
    <div class="ings-picker">
      <div class="ings-picker__column">
        <input 
          v-model="filterPattern"
          class="ings-picker__filter-input" placeholder="Filter ingredients">
        <div class="ings-picker__list">
          <div 
            class="ings-picker__list-item"
            :class="{'hidden': !visibleIngIds.includes(x._id)}"
            v-for="x in ingredients"
            v-bind:key="x._id"
            @click="onAddIngredientClick(x)">{{x.ingredientName}}</div>
        </div>
      </div>
      <div class="ings-picker__column ings-picker__column--middle">
        <span>=></span>
        <span><=</span>
      </div>
      <div class="ings-picker__column ings-picker__column--right">
        <div class="ings-picker__list">
          <div 
            class="ings-picker__list-item"
            v-for="x in selectedIngs"
            v-bind:key="x._id"
            @click="onRemoveIngredientClick(x)">{{x.ingredientName}}</div>
        </div>
      </div>
    </div>
    <div class="buttons">
      <button class="buttons__search" @click="onSearchButtonClick()">Search</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ingredients-picker",
  data: function() {
    return {
      selectedIngs: [],
      filterPattern: "",
    };
  },
  computed: mapState({
    ingredients: state => state.ingredients.ingredientsList,
    visibleIngIds: function(){
      let visibleIngObjects = this.filterPattern && this.filterPattern !== ""
        ? this.ingredients.filter(x => x.ingredientName.indexOf(this.filterPattern) === 0)
        : this.ingredients

      return visibleIngObjects.map(x => x._id)
    }
  }),
  methods: {
    onAddIngredientClick: function(ing) {
      if (!this.selectedIngs.includes(ing)) this.selectedIngs.push(ing);
    },
    onRemoveIngredientClick(x) {
      this.selectedIngs.splice(this.selectedIngs.indexOf(x), 1);
    },
    onSearchButtonClick() {
      this.$emit("select", this.selectedIngs);
    },   
  }
};
</script>

<style lang="scss" scoped>
.ings-picker {
  display: flex;
  &__column{
    flex: 1;
    max-width: 250px;
    height: 200px;
    display: flex;
    flex-direction: column;
    &--middle{
      flex: 0 0 30px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    &--right{
      padding-top: 30px;
    }
  }

  &__list {
    height: 100%;
    border: 1px solid #ccc;
    padding: 5px;
    border-radius: 5px;

    overflow-y: auto;
  }

  &__list-item {
    cursor: pointer;
    &.hidden{
      display: none;
    }
  }
  &__middle {
    width: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  &__filter-input{
    height: 25px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
    padding: 3px;
    border-radius: 5px;
  }
}
.buttons {
  margin-top: 10px;
}
</style>


