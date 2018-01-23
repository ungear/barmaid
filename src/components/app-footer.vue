<template>
  <footer class='app-footer'>
    <div class="container app-footer__container">
      <span class='app-footer__segment'>The Barmaid Project</span>
      <span class='app-footer__segment'>
        Based on
        <a href='http://www.thecocktaildb.com'>TheCoccktailDB</a> API
      </span>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.app-footer{
  flex: 0 0 auto;
  padding: 0.5em 0;
  .app-footer__container{
    font-size: 0.8em;
  }
  .app-footer__segment + .app-footer__segment{
    margin-left: 40px;
  }
}
</style>
