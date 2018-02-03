import VueRouter from 'vue-router'

const lazySearching = () => import(/* webpackChunkName: "searching" */'./components/search.vue')
const lazyFavoriteDrinks = () => import(/* webpackChunkName: "favoriteDrinks" */'./components/favoriteDrinks.vue')
const lazyDrink = () => import(/* webpackChunkName: "drink" */'./components/drink.vue')
const lazyAbout = () => import(/* webpackChunkName: "about" */'./components/about.vue')

const routes = [
  { path: '/', name: 'search', component: lazySearching },
  { path: '/favorite-drinks', name: 'favorite', component: lazyFavoriteDrinks },
  { path: '/drink/:link', name: 'drink', component: lazyDrink },
  { path: '/about', name: 'about', component: lazyAbout },
  { path: '*', redirect: { name: 'search'} },
]
export default new VueRouter({
  routes
})