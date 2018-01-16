<template>
  <span class='favorite-mark' :class="isFavorite ? 'favorite-mark--favorite' : ''" @click='toggle'></span>
</template>

<script>
export default {
  name: 'favorite-mark',
  props:{
    isFavorite: Boolean
  },
  methods:{
    toggle(){
      this.$emit('toggle');
    }
  },
}
</script>

<style lang="scss" scoped>
  @import '../colorScheme.scss';

  .favorite-mark{
    margin-left: 0.5em;
    cursor: pointer;
    font-size: 1.6em;
  }
  .favorite-mark::before{
    content: '☆';
  }
  .favorite-mark--favorite::before{
    content: '★';
    color: $gold;
  }
</style>


