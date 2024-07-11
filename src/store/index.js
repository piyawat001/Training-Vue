import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user')) || null,
    error: null
  },
  mutations: {
    auth_success(state, { token, user }) {
      state.token = token
      state.user = user
      state.error = null
    },
    auth_error(state, error) {
      state.token = ''
      state.user = null
      state.error = error
    },
    logout(state) {
      state.token = ''
      state.user = null
      state.error = null
    },
    set_user(state, user) {
      state.user = user
    },
    set_error(state, error) {
      state.error = error
    }
  },
  actions: {
  login({ commit }, user) {
    console.log('user data: ', user)
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:3000/api/v1/auth/login', {
        username: user.username, 
        password: user.password
      })
      .then(resp => {
        if (resp.data && resp.data.status === 200 && resp.data.data.token) {
          const token = resp.data.data.token;
          localStorage.setItem('token', token);
          axios.defaults.headers.common['x-auth-token'] = token;
          commit('auth_success', { token, user });
          resolve(resp);
        } else if (resp.data && resp.data.status === 403) {
          commit('auth_error', resp.data.message);
          resolve(resp.data);
        } else {
          throw new Error(resp.data.message || 'Login failed');
        }
      })
      .catch(err => {
        const errorMessage = err.response && err.response.data 
          ? err.response.data.message 
          : 'Login failed';
        commit('auth_error', errorMessage);
        console.error('login failed: ', err)
        localStorage.removeItem('token');
        reject(err);
      });
    });
  }
}
   
    ,
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        console.log('User data:', user); 
        axios.post('http://localhost:3000/api/v1/auth/register', user)
          .then(resp => {
            console.log('Response data:', resp.data);
            if (resp.data && resp.data.status === 200) {
              commit('set_error', null)
              resolve(resp.data)
            } else {
              throw new Error(resp.data.message || 'Registration failed')
            }
          })
          .catch(err => {
            const errorMessage = err.response && err.response.data 
              ? err.response.data.message 
              : 'Registration failed'
            commit('auth_error', errorMessage)
            reject(err)
          })
      })
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        delete axios.defaults.headers.common['x-auth-token']
        resolve()
      })
    },
    validateToken({ commit }) {
      const token = localStorage.getItem('token')
      if (token) {
        axios.defaults.headers.common['x-auth-token'] = token
        return axios.get('http://localhost:3000/api/v1/auth/validate')
          .then(resp => {
            if (resp.data && resp.data.status === 200) {
              commit('set_user', resp.data.data.user)
            } else {
              throw new Error('Token validation failed')
            }
          })
          .catch(() => {
            commit('logout')
          })
      } else {
        commit('logout')
      }
    
  },
  getters: {
    isLoggedIn: state => !!state.token,
    isAdmin: state => state.user && state.user.isAdmin,
    currentUser: state => state.user,
    error: state => state.error
  }
})
