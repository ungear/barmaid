import { getIngredients, getIngredientByName } from '../services/apiService';
import { GET_INGREDIENTS_STAGES } from '../consts/consts';
import Vue from 'vue'

const state = {
  flatNamesList: [],
  gettingIngredientsStatus: GET_INGREDIENTS_STAGES.notStartedYet,
  detailedList: {}
}

const actions = {
  getAllIngredients:({ commit, state }) => {
    if(state.flatNamesList.length === 0){
      commit('changeRequestStage', GET_INGREDIENTS_STAGES.inProgress)
      getIngredients()
        .then(ingredients => {
          commit('changeRequestStage', GET_INGREDIENTS_STAGES.dataReceived)
          commit('saveFlatIngredientsList', ingredients)
        })
        .catch(function (error) {
          commit('changeRequestStage', GET_INGREDIENTS_STAGES.failed)
        })
    }
  },
  getDetailedIngredientByName: ({ commit, state, getters }, name) => {
    let ingredientFromCache = getters.getIngredientByName(name)
    if(ingredientFromCache) 
      return ingredientFromCache
    else
      return getIngredientByName(name).then(ing => {
        commit('saveDetailedIngredient', ing)
      })
  },
}

const mutations = {
  saveFlatIngredientsList(state, ingredients){
    state.flatNamesList = ingredients;
  },
  changeRequestStage(state, currentStage){
    state.gettingIngredientsStatus = currentStage;
  },
  saveDetailedIngredient(state, ingredient){
    Vue.set(state.detailedList, ingredient.strIngredient.toLowerCase(), ingredient)
  }
}

const getters = {
  getIngredientByName: (state) => (name) => state.detailedList[name.toLowerCase()]
}

export default {
  state,
  getters,
  actions,
  mutations
}