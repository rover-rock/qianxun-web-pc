import { get_data } from "@/apis/punish";
import Vue from "vue";
export default {
    state : {
        search_result: [],
        keywords:{}
    },
    mutations:{
        set_search_result(state,data){
            state.search_result = data
        },
        set_keywords(state,keywords){
            state.keywords = keywords
        },
        sort_search_result(state,type){
            state.search_result.sort((a, b) => {
                let res = a.date > b.date;
                if (type === "earlest") return res ? 1 : -1;
                else return res ? -1 : 1;
              });
        },
        clear_search_result(state){
            state.search_result = []
        }
    },
    actions:{
        search_by_keywords({commit},keywords){
            commit('set_keywords',keywords)
            get_data(keywords).then(res => {
                res.data.map(item => {
                    Vue.set(item, "collapsed", true);
                    Vue.set(item, "checked", false);
                    return item;
                })
                commit('set_search_result',res.data)    
            })
        },
        sort_search_result({commit},type){
            commit('sort_search_result',type)
        },
        clear_search_result({commit}){
            commit('clear_search_result')
        }
    }
}