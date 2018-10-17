<template>
  <div class="">
    search by ingredients
    <ingredients-picker></ingredients-picker>
  </div>
</template>

<script>
import IngredientsPicker from "./ingredients-picker.vue";

export default {
  name: "search-by-ingredients",
  components: { IngredientsPicker }
};
</script>

<style lang="scss" scoped>
</style>

