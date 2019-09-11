import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    errors: []
  },
  mutations: {
    // 收到設置User data
    SET_USER_DATA (state, userData) {
      // 設置state
      state.user = userData
      // 並設置在localstorage達到自動登入
      localStorage.setItem('user', JSON.stringify(userData))
      // 設置在每一次axoios的header Authorization 為 Bearer XXXXTOKEN
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
    },
    CLEAR_USER_DATA (state) {
      // 清除本地端user資料防止loggedIn再讀取到
      localStorage.removeItem('user')
      // reload這個頁面 重置所有vue檔案
      window.location.reload()
    },
    SET_ERROR_DATA (state, error) {
      // 設置state
      state.errors.push({
        id: state.errors.length,
        content: error
      })
      setTimeout(() => {
        state.errors.reverse()
        state.errors.pop()
        state.errors.reverse()
      }, 2000)
    }
  },
  actions: {
    pushError ({ commit }, credentials) {
      commit('SET_ERROR_DATA', credentials)
    },
    // 組建呼叫此register credentials就是我們帶入的data
    register ({ commit }, credentials) {
      // 回傳axios此一回傳 可用then串起來
      return axios.post('//localhost:3000/api/register', credentials)
    },
    login ({ commit }, credentials) {
      // 回傳axios此一回傳 可用then串起來
      return axios.post('//localhost:3000/api/login', credentials).then(
        // 回來的資料就commit到mutations修改state
        ({ data }) => {
          commit('SET_USER_DATA', data)
        }
      )
    },
    updateUserInfo ({ commit, state }) {
      return axios
        .get('//localhost:3000/api/userInfo', state.user)
        .then(({ data }) => {
          commit('SET_USER_DATA', data)
        })
    },
    // 登出方法
    logout ({ commit }) {
      commit('CLEAR_USER_DATA')
    }
  },
  // 創造一個Getter取值
  getters: {
    loggedIn: state => {
      // 判斷是否有user 確定是否為登入狀態
      return !!state.user
    },
    userInfo: state => {
      return state.user
    }
  }
})
