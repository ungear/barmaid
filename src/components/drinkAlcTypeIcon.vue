<template>
  <div 
    class="drink-alc-type-icon"
    :class='"drink-alc-type-icon--" + this.alcType[0].toLowerCase()'>
    {{this.alcType[0].toUpperCase()}}</div>
</template>

<script>
export default {
  name: 'drink-alc-type-icon',
  props:{
    alcType: String
  }
}
</script>

<style lang="scss" scoped>
  @import '../colorScheme.scss';
  @import '../functions.scss';

  $alcColor: red;
  $nonAlcColor: green;
  $optionalColor: orange;

  .drink-alc-type-icon{
    border: 1px solid black;
    border-radius: 50%;
    display: flex;
    font-size:0.8em;
    align-items: center;
    justify-content: center;
    cursor: default;
    &--a{
      border-color: $alcColor;
      background-color:tint($alcColor, 80%);
      color: $alcColor;
    }
    &--n{
      border-color: $nonAlcColor;
      background-color:tint($nonAlcColor, 80%);
      color: $nonAlcColor;
    }
    &--o{
      border-color: $optionalColor;
      background-color:tint($optionalColor, 80%);
      color: $optionalColor;
    }
  }
</style>

