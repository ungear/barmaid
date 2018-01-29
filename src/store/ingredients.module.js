import { getIngredients } from '../services/apiService';
import { GET_INGREDIENTS_STAGES } from '../consts/consts';

const state = {
  flatNamesList: [],
  gettingIngredientsStatus: GET_INGREDIENTS_STAGES.notStartedYet
}

const actions = {
  getAllIngredients:({ commit, state }) => {
    if(state.flatNamesList.length === 0){
      commit('changeRequestStage', GET_INGREDIENTS_STAGES.inProgress)
      getIngredients()
        .then(ingredients => {
          commit('changeRequestStage', GET_INGREDIENTS_STAGES.dataReceived)
          commit('receiveFlatIngredientsList', ingredients)
        })
        .catch(function (error) {
          commit('changeRequestStage', GET_INGREDIENTS_STAGES.failed)
        })
    }
  }
}

const mutations = {
  receiveFlatIngredientsList(state, ingredients){
    state.flatNamesList = ingredients;
  },
  changeRequestStage(state, currentStage){
    state.gettingIngredientsStatus = currentStage;
  }
}

export default {
  state,
  //getters,
  actions,
  mutations
}