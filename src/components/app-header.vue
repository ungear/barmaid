<template>
  <header class='header-row'>
    <div class='container header__header-container'>
      <router-link class='header-row__item' :to="{name:'search'}">Search</router-link>
      <router-link class='header-row__item marked-item' :to="{name:'favorite'}">
        <span>Favorite</span>
        <div class='marked-item__number-container' v-if='favoriteDrinksnumber > 0'>
          <span class='marked-item__number'>
            {{favoriteDrinksnumber}}
          </span>
        </div>
      </router-link>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app-header',
  computed: mapState({
    favoriteDrinksnumber: state => state.favoriteDrinkIds.length
  }),
}
</script>

<style lang="scss" scoped>
  @import '../colorScheme.scss';
  header.header-row{
    padding: 0.5em 0;
    background: $blueMunsell;
    .header__header-container{
      display: flex;
      align-items: center;
      height: 32px;
      background-image: url('../assets/glass_n1_32.png');
      background-repeat: no-repeat;
      padding-left: 40px;
    }
    .header-row__item{
      color:#fff;
      text-decoration: none;
      font-weight: 900; 
    }
    .header-row__item + .header-row__item{
      margin-left: 0.5em;
    }
    .marked-item{
      display: flex;
      align-items: center;
      &__number-container{
        display: flex;
        width: 15px;
        height: 15px;
        align-items: center;
        justify-content: center;
        margin: 0 0 10px 0px;
        border-radius: 50%;
        background: #f5af47;
        font-size: 0.7em;
        padding: 3px;
        color: #7e375f;
      }
    }
  }
</style>


