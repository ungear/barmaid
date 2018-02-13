<template>
  <div>
    <h3>About</h3>
    <p>
      This project has been made in educational purposes to gain experiance working fith the 
      <a href='https://vuejs.org/'>Vue.js</a>
      framework and demonstrate some of its features.
    </p>
    <p>
      The source code could be found in <a href='https://github.com/ungear/barmaid'>the Github repo</a>
    </p>
    <p>
      All the drink related data are taken from
      <a href='http://www.thecocktaildb.com/index.php'>TheCocktailDB API</a>.
    </p>
  </div>
</template>
<script>
export default {
  name: 'about'  
}
</script>
<style lang="scss" scoped>
  h3{
    padding: 20px 0;
  }
  p{
    padding: 10px 0;
  }
</style>


