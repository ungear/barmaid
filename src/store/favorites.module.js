import * as favoriteDrinksStorage from '../services/favoriteDrinksService'

const state = {
  favoriteDrinkIds: favoriteDrinksStorage.getFavoriteDrinkIds(),
  dislikedDrinkIds: []
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
  restoreDislikedDrinks:({commit, state}) => {
    state.dislikedDrinkIds.forEach(id => commit('likeDrink', id))
    favoriteDrinksStorage.setFavoriteDrinkIds(state.favoriteDrinkIds)
    commit('clearDislikedList')
  }

}

const mutations = {
  likeDrink(state, drinkId){
    state.favoriteDrinkIds.push(drinkId)
  },
  dislikeDrink(state, drinkId){
    let index = state.favoriteDrinkIds.indexOf(drinkId);
    if(index >= 0) state.favoriteDrinkIds.splice(index, 1);
    state.dislikedDrinkIds.push(drinkId)
  },
  clearDislikedList(state){
    state.dislikedDrinkIds = [];
  }
}

export default {
  state,
  //getters,
  actions,
  mutations
}