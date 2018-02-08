<template>
  <div>
    <app-header ></app-header>
    <transition name="fade" mode="out-in">
      <router-view id='main' class='container'></router-view>
    </transition>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from './app-header.vue'
import AppFooter from './app-footer.vue'

export default {
  name: 'root',
  components:{
    AppHeader, AppFooter
  },
}
</script>

<style lang="scss">
  @import '../colorScheme.scss';
  @import '~normalize.css/normalize.css';
  *{
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
  }
  html, body{
    height: 100%
  }
  html{
    font-family: Arial, Helvetica, sans-serif;
  }
  #app{
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  #main{
    flex: 1;
    padding: 0.5em;
  }
  footer{
    background:$lightGray
  }

  .fade-leave-active, .fade-enter-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }

  .container{
    width: 800px;
    margin: auto;
  }
</style>


