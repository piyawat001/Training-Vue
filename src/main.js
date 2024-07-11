import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

// Set up axios
axios.defaults.baseURL = 'http://localhost:5000/api'
const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['x-auth-token'] = token
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')