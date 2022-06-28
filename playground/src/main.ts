import routes from 'virtual:generated-pages'
import Starport from 'vue-starport'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import './index.css'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
})

const app = new Vue({
  router,
  render: h => h(App),
})

// app.use(router)
Vue.use(Starport({ keepAlive: true }))
app.$mount('#app')
