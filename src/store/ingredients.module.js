import { getIngredients } from '../services/apiService';

const state = {
  flatNamesList: [],
  gettingIngredientsStatus: null
}

const actions = {
  getAllIngredients:({ commit, state }) => {
    if(state.flatNamesList.length === 0){
      getIngredients()
        .then(ingredients => commit('receiveFlatIngredientsList', ingredients))
        .catch(function (error) {})
    }
  }
}

const mutations = {
  receiveFlatIngredientsList(state, ingredients){
    state.flatNamesList = ingredients;
  },
}

export default {
  state,
  //getters,
  actions,
  mutations
}