import Vue from 'vue'
import Vuex from 'vuex'
import * as favoriteDrinksStorage from '../services/favoriteDrinksService'
import {SEARCH_BY} from '../consts/consts'


Vue.use(Vuex)

const state = {
  favoriteDrinkIds: favoriteDrinksStorage.getFavoriteDrinkIds(),
  searching:{ 
    param: null, 
    searchBy: SEARCH_BY.name,
    results: []
  }
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

  startDrinkSearching: ({ commit, state }, {param, searchBy}) => {
    console.log(param, searchBy)
    commit('changeSearchingParams', {param, searchBy})
  }
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
  changeSearchingParams(state, {param, searchBy}){
    state.searching.param = param;
    state.searching.searchBy = searchBy;
  },

  // increment (state) {
  //   state.count++
  // },
  // decrement (state) {
  //   state.count--
  // }
}

const getters = {
  isSearchingByName: state => state.searching.searchBy === SEARCH_BY.name,
  isSearchingByIngredient: state => state.searching.searchBy === SEARCH_BY.ingredient,
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})