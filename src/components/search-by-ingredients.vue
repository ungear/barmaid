<template>
  <div class="">
    <ingredients-picker
      @select="onIngredientsSelected($event)"></ingredients-picker>
  </div>
</template>

<script>
import IngredientsPicker from "./ingredients-picker.vue";

export default {
  name: "search-by-ingredients",
  components: { IngredientsPicker },
  methods: {
    onIngredientsSelected: function(x){
      console.log(x)
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

