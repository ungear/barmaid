<template>
  <span class='favorite-mark' 
    :class="isFavorite ? 'favorite-mark--favorite' : ''" 
    :title='title'
    @click='toggle'></span>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'favorite-mark',
  props:{
    drinkId: String
  },
  computed: mapState({
    title(){
      return this.isFavorite
        ? 'Delete from the Favorite list'
        : 'Add to the Favotire list'
    },
    favoriteDrinkIds: state => state.favorites.favoriteDrinkIds,
    isFavorite(state){
      return this.favoriteDrinkIds.includes(this.drinkId)
    },
  }),
  methods:{
    toggle(){
      this.$store.dispatch('toggleFavoriteDrink', this.drinkId)
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
    font-family: 'barmaid';
    font-style: normal;
    font-weight: normal;
    content: '\e80f';
  }
  .favorite-mark--favorite::before{
    font-family: 'barmaid';
    font-style: normal;
    font-weight: normal;
    content: '\e80e';
    color: $gold;
  }
</style>


