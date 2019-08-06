import { get_case_search_data } from "@/apis/case_data";
import Vue from 'vue'
export default {
    state:{
        search_result:[],
        keywords:{}
    },
    getters:{
    },
    mutations:{
        set_search_result(state,result){
            state.search_result = result
        },
        set_keywords(state,keywords){
            state.keywords = keywords
        },
        clear_search_result(state){
            state.search_result = []
        }
    },
    actions:{
        search({ commit, state }, keywords ){
            get_case_search_data( keywords ).then(res => {
                
                commit('set_keywords',keywords)
                let data = res.data
                data.map(item => {
                    Vue.set(item, "collapsed", true);
                    Vue.set(item, "checked", false);
                    return item;
                });
                commit('set_search_result',data)
              })
        },
        clear_search_result({commit}){
            commit('clear_search_result')
        }
    }

}

