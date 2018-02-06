import * as favoriteDrinksStorage from '../services/favoriteDrinksService'

const state = {
  favoriteDrinkIds: favoriteDrinksStorage.getFavoriteDrinkIds(),
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
  
}

const mutations = {
  likeDrink(state, drinkId){
    state.favoriteDrinkIds.push(drinkId)
  },
  dislikeDrink(state, drinkId){
    let index = state.favoriteDrinkIds.indexOf(drinkId);
    if(index >= 0) state.favoriteDrinkIds.splice(index, 1);
  }
}

export default {
  state,
  //getters,
  actions,
  mutations
}