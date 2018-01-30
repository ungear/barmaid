import { getDrinkById } from '../services/apiService';
import Vue from 'vue'

const state = {
  shortData:{
    length: 0
  },
  fullData: {
    length: 0
  },
}

const actions = {
  loadDrinkFullData: ({ commit, state }, drinkId) => {
    return new Promise((resolve, reject) => {
      getDrinkById(drinkId).then(drinkFull => {
        commit('addDrinkFullData', drinkFull)
        if(!state.shortData[drinkFull.idDrink])
        commit('addDrinkShortData', drinkFull)
        resolve(drinkFull)
      })

    })
  },
  saveDrinkShortData: ({ commit, state }, drinkShortData) => {
    commit('addDrinkShortData', drinkShortData)
  },
}

const mutations = {
  addDrinkFullData(state, drinkData){
    // Vue can not automatically watch adding new fields to objects, 
    // so Vue.set is called to force recalculation of computed fileds
    // See detailed article here: https://vuejs.org/v2/guide/list.html#Object-Change-Detection-Caveats
    Vue.set(state.fullData, drinkData.idDrink, drinkData)
    state.fullData.length++;

  },
  addDrinkShortData(state, drinkData){
    Vue.set(state.shortData, drinkData.idDrink, drinkData)
    state.shortData.length++;
  },
}

export default {
  state,
  actions,
  mutations
}