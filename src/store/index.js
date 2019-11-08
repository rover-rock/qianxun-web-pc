
import Case from './case'
import audit from './audit-data'
import tax from './tax'
import punish from './punish'
import IPO from './IPO'
import report from './report'

import { login, get_user_info } from '@/apis/user'
import { getToken, setToken } from '../libs/util';

import routers from '../router'
import { getMenuByRouter } from '@/libs/util'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      search_history:[],
      user:{
        access:[]
      },
      token:getToken(),
      hasGetUserInfo:false,
      breadCrumbList: []
    },
    getters: {
      menuList: (state) => getMenuByRouter(routers, state.user.access),
    },
    mutations:{
        add_to_search_history (state,keywords) {
            state.search_history.push(keywords)
        },
        set_search_history (state,params){
          state.search_history = params
        },
        set_user(state,user){
          state.user = user
        },
        set_hasGetUserInfo(state,has){
          state.hasGetUserInfo = has
        },
        set_token(state,token){
          state.token = token
          setToken(token)
        },
        setBreadCrumb (state, route) {
          state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
        }
    },
    actions: {
      add_to_search_history ({ commit,state },keywords) {
       keywords.question !== '' && commit('add_to_search_history',keywords.question)
       keywords.comment !== '' && commit('add_to_search_history',keywords.comment)
       localStorage.setItem('search_history',JSON.stringify(state.search_history))
      },
      async handle_login({ commit }, keywords ){
        let res = await login( keywords )
        res = res.data
        if(res.success){
          commit('set_user',res.data)
          commit('set_token',res.token)
          commit('set_hasGetUserInfo',true)
        }
        console.log(res)
        return res        
      },
      async get_user_info({ commit, state }){
        let res = await get_user_info(state.token)
        res = res.data
        commit('set_user',res.data)
        commit('set_hasGetUserInfo',true)
      }
      
    },
    modules:{
        Case,
        audit,
        punish,
        IPO,
        tax,
        report
    }
})


export default store