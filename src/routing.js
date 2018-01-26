import VueRouter from 'vue-router'

import Search from './components/search.vue'
import Drink from './components/drink.vue'

const lazyFavoriteDrinks = () => import(/* webpackChunkName: "favoriteDrinks" */'./components/favoriteDrinks.vue')

const routes = [
  { path: '/', name: 'search', component: Search },
  { path: '/favorite-drinks', name: 'favorite', component: lazyFavoriteDrinks },
  { path: '/drink/:link', name: 'drink',component: Drink },
  { path: '*', redirect: { name: 'search'} },
]
export default new VueRouter({
  routes
})