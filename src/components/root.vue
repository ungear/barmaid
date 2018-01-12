<template>
  <div>
    <app-header></app-header>
    <router-view id='main'></router-view>
    <footer>footer</footer>
  </div>
</template>

<script>
import AppHeader from './app-header.vue'

export default {
  name: 'root',
  components:{
    AppHeader,
  },
}
</script>

<style lang="scss">
  #app{
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  #main{
    flex: 1
  }
  footer{
    background:#C9CCD4
  }
</style>


