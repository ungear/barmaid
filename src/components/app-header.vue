<template>
  <header class='header-row'>
    <div class='container header__header-container'>
      <router-link class='header-row__item' :to="{name:'home'}">Home</router-link>
      <router-link class='header-row__item' :to="{name:'favorite'}">Favorite</router-link>
    </div>
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

    }
    a{
      color:#fff;
      text-decoration: none;
      font-weight: 900; 
    }
    a + a{
      margin-left: 0.5em;
    }

  }
</style>


