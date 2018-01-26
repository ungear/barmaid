import Vue from 'vue'
import Vuex from 'vuex'
import * as favoriteDrinksStorage from '../services/favoriteDrinksService'
import {SEARCH_BY, DRINK_SEARCHING_STAGES} from '../consts/consts'
import { searchDrinksByName, searchDrinksByIng } from '../services/apiService';
import {DrinkShort} from '../models/drinkShort';

Vue.use(Vuex)

const state = {
  favoriteDrinkIds: favoriteDrinksStorage.getFavoriteDrinkIds(),
  searching:{ 
    param: null, 
    searchBy: SEARCH_BY.name,
    searchingStage: DRINK_SEARCHING_STAGES.notStartedYet,
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
    commit('setDrinkSearchingFlag', DRINK_SEARCHING_STAGES.inProgress)
    commit('changeSearchingParams', {param, searchBy})
    commit('setDrinkSearchingResults', [])
    
    let searching = searchBy === SEARCH_BY.name
      ? searchDrinksByName(param)
      : searchDrinksByIng(param)
    searching.then(response => {
      let drinks = response.data.drinks.map(x => new DrinkShort(x))
      commit('setDrinkSearchingFlag', drinks.length === 0 
        ? DRINK_SEARCHING_STAGES.noResults
        : DRINK_SEARCHING_STAGES.drinksFound)
      commit('setDrinkSearchingResults', drinks)
    })
    .catch(x => commit('setDrinkSearchingFlag', DRINK_SEARCHING_STAGES.failed))
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
  setDrinkSearchingFlag(state, newStage){
    state.searching.searchingStage = newStage;
  },
  setDrinkSearchingResults(state, results){
    state.searching.results = results;
  }

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