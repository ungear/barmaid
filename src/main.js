import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import Root from './components/root.vue'
import store from './store'
import router from './routing'

Vue.use(VueRouter)

// reguster the root component before initialize the Vue application
Vue.component(Root.name, Root)

// initialize the Vue application
new Vue({
  router,
  store
}).$mount('#app')
