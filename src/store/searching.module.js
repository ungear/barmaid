import { SEARCH_BY, DRINK_SEARCHING_STAGES } from "../consts/consts";
import { searchDrinksByName, searchDrinksByIng } from "../services/apiService";
import { DrinkShort } from "../models/drinkShort";

const state = {
  param: null,
  searchBy: SEARCH_BY.name,
  searchingStage: DRINK_SEARCHING_STAGES.notStartedYet,
  result: []
};

const actions = {
  startDrinkSearching: ({ commit, state, dispatch }, { param, searchBy }) => {
    commit("setDrinkSearchingFlag", DRINK_SEARCHING_STAGES.inProgress);
    commit("changeSearchingParams", { param, searchBy });
    commit("setDrinkSearchingResults", []);

    let searching =
      searchBy === SEARCH_BY.name
        ? searchDrinksByName(param)
        : searchDrinksByIng(param);
    searching
      .then(drinks => {
        commit(
          "setDrinkSearchingFlag",
          drinks.length === 0
            ? DRINK_SEARCHING_STAGES.noResults
            : DRINK_SEARCHING_STAGES.drinksFound
        );
        commit("setDrinkSearchingResults", drinks);
        //drinks.forEach(d => dispatch("saveDrinkShortData", d));
      })
      .catch(x =>
        commit("setDrinkSearchingFlag", DRINK_SEARCHING_STAGES.failed)
      );
  }
};

const mutations = {
  changeSearchingParams(state, { param, searchBy }) {
    state.param = param;
    state.searchBy = searchBy;
  },
  setDrinkSearchingFlag(state, newStage) {
    state.searchingStage = newStage;
  },
  setDrinkSearchingResults(state, drinks) {
    state.result = drinks;
  }
};

const getters = {
  isSearchingByName: state => state.searchBy === SEARCH_BY.name,
  isSearchingByIngredient: state => state.searchBy === SEARCH_BY.ingredient
};

export default {
  state,
  getters,
  actions,
  mutations
};
