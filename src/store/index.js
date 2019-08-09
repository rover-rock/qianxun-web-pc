import Vue from 'vue'
import Vuex from 'vuex'

import Case from './case'
import audit from './audit-data'
import punish from './punish'
import IPO from './IPO'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      search_history:[]
    },
    mutations:{
        add_to_search_history (state,keywords) {
            state.search_history.push(keywords)
          }
    },
    actions: {
      add_to_search_history ({ commit,state },keywords) {
       keywords.question !== '' && commit('add_to_search_history',keywords.question)
       keywords.comment !== '' && commit('add_to_search_history',keywords.comment)
       localStorage.setItem('search_history',JSON.stringify(state.search_history))
      }
    },
    modules:{
        Case,
        audit,
        punish,
        IPO
    }
})


export default store