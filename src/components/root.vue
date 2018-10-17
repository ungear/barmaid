<template>
  <div>
    <app-header ></app-header>
    <transition name="fade" mode="out-in">
      <span v-if='getIngredientsStage === getIngredientsStages.inProgress'>loading</span>
      <router-view 
        v-if='getIngredientsStage === getIngredientsStages.dataReceived' 
        id='main' 
        class='container'></router-view>
    </transition>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from "./app-header.vue";
import AppFooter from "./app-footer.vue";
import { GET_INGREDIENTS_STAGES } from "../consts/consts";
import { mapState } from "vuex";

export default {
  name: "root",
  components: {
    AppHeader,
    AppFooter
  },
  computed: mapState({
    getIngredientsStage: state => state.ingredients.gettingIngredientsStatus
  }),
  created: function() {
    this.getIngredientsStages = GET_INGREDIENTS_STAGES;
    this.$store.dispatch("getAllIngredients");
  }
};
</script>

<style lang="scss">
@import "../colorScheme.scss";
@import "~normalize.css/normalize.css";
* {
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
}
html,
body {
  height: 100%;
}
html {
  font-family: Arial, Helvetica, sans-serif;
}
#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
#main {
  flex: 1;
  padding: 0.5em;
}
footer {
  background: $lightGray;
}

.fade-leave-active,
.fade-enter-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

input:focus,
button:focus {
  outline: none;
}

@media (min-width: 800px) {
  .container {
    width: 800px;
    margin: auto;
  }
}

@font-face {
  font-family: "barmaid";
  src: url("../assets/barmaid.eot");
  src: url("../assets/barmaid.eot#iefix") format("embedded-opentype"),
    url("../assets/barmaid.woff") format("woff"),
    url("../assets/barmaid.ttf") format("truetype"),
    url("../assets/barmaid.svg#barmaid") format("svg");
  font-weight: normal;
  font-style: normal;
}
</style>


