import Vue from 'vue'
import Vuex from 'vuex'
import favorites from './favorites.module'
import searching from './searching.module'
import ingredients from './ingredients.module'
import drinks from './drinks.module'

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    favorites,
    searching,
    ingredients,
    drinks
  },
})