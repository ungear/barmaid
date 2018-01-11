import Vue from 'vue'
import Vuex from 'vuex'
import * as favoriteDrinksStorage from '../services/favoriteDrinksService'

Vue.use(Vuex)

const state = {
  favoriteDrinkIds: favoriteDrinksStorage.getFavoriteDrinkIds()
}

const actions = {
  toggleFavoriteDrink:({ commit, state }, drinkId) => {
    let index = state.favoriteDrinkIds.indexOf(drinkId);
    if(index >= 0)
      commit('dislikeDrink', drinkId)
    else{
      commit('likeDrink', drinkId)
    }

    // save to local storage
    favoriteDrinksStorage.setFavoriteDrinkIds(state.favoriteDrinkIds)
  },

  // increment: ({ commit }) => commit('increment'),
  // decrement: ({ commit }) => commit('decrement'),
  // incrementIfOdd ({ commit, state }) {
  //   if ((state.count + 1) % 2 === 0) {
  //     commit('increment')
  //   }
  // },
  // incrementAsync ({ commit }) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       commit('increment')
  //       resolve()
  //     }, 1000)
  //   })
  // }
}

const mutations = {
  likeDrink(state, drinkId){
    state.favoriteDrinkIds.push(drinkId)
  },
  dislikeDrink(state, drinkId){
    let index = state.favoriteDrinkIds.indexOf(drinkId);
    if(index >= 0) state.favoriteDrinkIds.splice(index, 1)
  },

  // increment (state) {
  //   state.count++
  // },
  // decrement (state) {
  //   state.count--
  // }
}

// const getters = {
//   evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
// }

export default new Vuex.Store({
  state,
  //getters,
  actions,
  mutations
})