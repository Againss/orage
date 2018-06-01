import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const state = {
  username:""
}
const mutations = {
  setUsername:(state,username)=>{
    state.username = username;
    localStorage.setItem('username', username)
  }
}
const actions = {}
const getters = {
  getterusername:(state)=>localStorage.getItem('username') 
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)


// const state = {
//   count:0
// }
// const mutations = {
//   decrement:state =>{
//     state.count--
//   },
//   increment: state => [
//     state.count++
//   ]
// }
// const actions = {}
// const getters = {}
// export default new Vuex.Store({
//   state,
//   getters,
//   actions,
//   mutations
// })
