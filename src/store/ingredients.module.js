import { getIngredients } from "../services/apiService";
import { GET_INGREDIENTS_STAGES } from "../consts/consts";

const state = {
  ingredientsList: [],
  gettingIngredientsStatus: GET_INGREDIENTS_STAGES.notStartedYet
};

const actions = {
  getAllIngredients: ({ commit, state }) => {
    if (state.ingredientsList.length === 0) {
      commit("changeRequestStage", GET_INGREDIENTS_STAGES.inProgress);
      getIngredients()
        .then(ingredients => {
          commit("changeRequestStage", GET_INGREDIENTS_STAGES.dataReceived);
          commit("saveIngredientsList", ingredients);
        })
        .catch(function(error) {
          commit("changeRequestStage", GET_INGREDIENTS_STAGES.failed);
        });
    } else {
      commit("changeRequestStage", GET_INGREDIENTS_STAGES.dataReceived);
    }
  }
};

const mutations = {
  saveIngredientsList(state, ingredients) {
    state.ingredientsList = ingredients;
  },
  changeRequestStage(state, currentStage) {
    state.gettingIngredientsStatus = currentStage;
  }
};

export default {
  state,
  actions,
  mutations
};
