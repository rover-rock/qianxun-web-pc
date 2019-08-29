
import Case from './case'
import audit from './audit-data'
import tax from './tax'
import punish from './punish'
import IPO from './IPO'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      search_history:[],
      user:{}
    },
    mutations:{
        add_to_search_history (state,keywords) {
            state.search_history.push(keywords)
        },
        set_search_history (state,params){
          state.search_history = params
        }
    },
    actions: {
      add_to_search_history ({ commit,state },keywords) {
       keywords.question !== '' && commit('add_to_search_history',keywords.question)
       keywords.comment !== '' && commit('add_to_search_history',keywords.comment)
       localStorage.setItem('search_history',JSON.stringify(state.search_history))
      },
      handle_login({ commit }, keywords ){
        
      }
    },
    modules:{
        Case,
        audit,
        punish,
        IPO,
        tax
    }
})


export default store