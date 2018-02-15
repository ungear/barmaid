<template>
  <header class='header-row'>
    <div class='container header__header-container'>
      <div class='header-row__item'>
        <router-link :to="{name:'search'}">Search</router-link>
      </div>
      <div class='header-row__item marked-item'>
        <router-link :to="{name:'favorite'}">Favorite</router-link>
        <div class='marked-item__number-container' v-if='favoriteDrinksnumber > 0'>
          <span class='marked-item__number'>
            {{favoriteDrinksnumber}}
          </span>
        </div>
      </div>
      <div class='header-row__item'>
        <router-link :to="{name:'statistics'}">Statistics</router-link>
      </div>
      <div class='header-row__item'>
        <router-link :to="{name:'about'}">About</router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app-header',
  computed: mapState({
    favoriteDrinksnumber: state => state.favorites.favoriteDrinkIds.length
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
    .header-row__item a{
      color:#fff;
      text-decoration: none;
      font-weight: 600;
      position: relative;
      padding-bottom: 2px;
      &::after{
        content:'';
        position: absolute;
        left: 50%;
        bottom:0;
        width:0;
        height: 2px;
        background: #fff;
        transition: all .3s;
        margin-top: 5px;
      }
      &:hover::after, &.router-link-exact-active::after{
        left:0;
        width: 100%
      } 
    }
    .header-row__item + .header-row__item{
      margin-left: 0.5em;
    }
    .marked-item{
      display: flex;
      align-items: center;
      &__number-container{
        display: flex;
        align-items: center;
        width: 15px;
        height: 15px;
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


