<template>
  <header>
    <router-link :to="{name:'home'}">Home</router-link>
    <router-link :to="{name:'favorite'}">Favorite</router-link>
  </header>
</template>

<script>
export default {
  name: 'app-header',
}
</script>

<style lang="scss" scoped>
  header{
    padding: 0.5em;
    background: #148faa;
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


