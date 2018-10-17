<template>
  <div class="ings-picker">
    <div class="ings-picker__list">
      <div 
        class="ings-picker__list-item"
        v-for="x in ingredients"
        v-bind:key="x._id"
        @click="onAddIngredientClick(x)">{{x.ingredientName}}</div>
    </div>
    <div class="ings-picker__list">
      <div 
        class="ings-picker__list-item"
        v-for="x in selectedIngs"
        v-bind:key="x._id"
        @click="onRemoveIngredientClick(x)">{{x.ingredientName}}</div>
    </div>
  </div>  
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ingredients-picker",
  data: function() {
    return {
      selectedIngs: []
    };
  },
  computed: mapState({
    ingredients: state => state.ingredients.ingredientsList
  }),
  methods: {
    onAddIngredientClick: function(ing) {
      if (!this.selectedIngs.includes(ing)) this.selectedIngs.push(ing);
    },
    onRemoveIngredientClick(x) {
      this.selectedIngs.splice(this.selectedIngs.indexOf(x), 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.ings-picker {
  display: flex;
  &__list {
    flex: 1;
    border: 1px solid #ccc;
    padding: 5px;
    border-radius: 5px;
    max-width: 250px;
    height: 300px;
    overflow-y: auto;
  }

  &__list + &__list {
    margin-left: 10px;
  }

  &__list-item {
    cursor: pointer;
  }
}
</style>


