<template>
  <header class='header-row'>
    <img class='header-row__item' :src="require('../assets/glass_n1_32.png')">
    <router-link class='header-row__item' :to="{name:'home'}">Home</router-link>
    <router-link class='header-row__item' :to="{name:'favorite'}">Favorite</router-link>
  </header>
</template>

<script>
export default {
  name: 'app-header',
}
</script>

<style lang="scss" scoped>
  @import '../colorScheme.scss';
  header.header-row{
    padding: 0.5em;
    background: $blueMunsell;
    flex: 0 0 52px;
    display: flex;
    align-items: center;
    .header-row__item{

    }
    a{
      color:#fff;
      text-decoration: none;
      font-weight: 900;

    }
    a + a {
      margin-left: 0.5em;
    }
  }
</style>


