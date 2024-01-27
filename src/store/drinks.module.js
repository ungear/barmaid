import { getDrinkFullDataById, getAllDrinks } from "../services/apiService";
import Vue from "vue";

const state = {
  fullData: {
    length: 0
  }
};

const actions = {
  loadDrinkFullData: ({ commit, state }, drinkId) => {
    return new Promise((resolve, reject) => {
      getDrinkFullDataById(drinkId).then(drinkFull => {
        commit("addDrinkFullData", drinkFull);
        resolve(drinkFull);
      });
    });
  },
  loadAllDrinks:({ commit, state }) => {
    return new Promise((resolve, reject) => {
      getAllDrinks().then(allDrinks => {
        allDrinks.map(x => {
          commit("addDrinkFullData", x);
        })
        resolve(allDrinks);
      });
    });
  },
};

const mutations = {
  addDrinkFullData(state, drinkData) {
    state.fullData = {...state.fullData, [drinkData._id] : drinkData};
    state.fullData.length++;
  }
};

export default {
  state,
  actions,
  mutations
};
