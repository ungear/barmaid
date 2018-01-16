<template>
  <div>
    <app-header></app-header>
    <transition name="fade">
      <router-view id='main'></router-view>
    </transition>
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
  @import '../colorScheme.scss';
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

  .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter-active{
    transition: opacity .3s;
    transition-delay: .4s; 
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
</style>


