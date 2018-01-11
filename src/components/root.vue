<template>
  <div>
    <app-header></app-header>
    <router-view></router-view>
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

<style>

</style>


