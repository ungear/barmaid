import { getIngredients, getIngredientByName } from "../services/apiService";
import { GET_INGREDIENTS_STAGES } from "../consts/consts";
import { getIngredientKeyByName } from "../services/ingredientsService";
import Vue from "vue";

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
  // getDetailedIngredientByName: ({ commit, state, getters }, name) => {
  //   let ingredientFromCache = getters.getIngredientByName(name);
  //   if (ingredientFromCache) return ingredientFromCache;
  //   else
  //     return getIngredientByName(name).then(ing => {
  //       commit("saveDetailedIngredient", ing);
  //     });
  // }
};

const mutations = {
  saveIngredientsList(state, ingredients) {
    state.ingredientsList = ingredients;
  },
  changeRequestStage(state, currentStage) {
    state.gettingIngredientsStatus = currentStage;
  }
  // saveDetailedIngredient(state, ingredient) {
  //   Vue.set(
  //     state.detailedList,
  //     getIngredientKeyByName(ingredient.strIngredient),
  //     ingredient
  //   );
  // }
};

const getters = {
  // getIngredientByName: state => name =>
  //   state.detailedList[getIngredientKeyByName(name)]
};

export default {
  state,
  getters,
  actions,
  mutations
};
