import { createStore } from 'vuex'
import favorites from './favorites.module'
import searching from './searching.module'
import ingredients from './ingredients.module'
import drinks from './drinks.module'

export default createStore({
  modules: {
    favorites,
    searching,
    ingredients,
    drinks
  },
})