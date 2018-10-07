import { getDrinkById } from "../services/apiService";
import Vue from "vue";

const state = {
  fullData: {
    length: 0
  }
};

const actions = {
  loadDrinkFullData: ({ commit, state }, drinkId) => {
    return new Promise((resolve, reject) => {
      getDrinkById(drinkId).then(drinkFull => {
        commit("addDrinkFullData", drinkFull);
        resolve(drinkFull);
      });
    });
  }
};

const mutations = {
  addDrinkFullData(state, drinkData) {
    // Vue can not automatically watch adding new fields to objects,
    // so Vue.set is called to force recalculation of computed fileds
    // See detailed article here: https://vuejs.org/v2/guide/list.html#Object-Change-Detection-Caveats
    Vue.set(state.fullData, drinkData._id, drinkData);
    state.fullData.length++;
  }
};

export default {
  state,
  actions,
  mutations
};
