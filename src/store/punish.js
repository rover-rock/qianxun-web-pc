import { get_data,get_total } from "@/apis/punish";
import Vue from "vue";
export default {
    namespaced:true,
    state : {
        search_result:[],
        keywords:{},
        total:0,
        spinShow:false
    },
    mutations:{
        set_search_result(state,data){
            state.search_result = data
        },
        set_keywords(state,keywords){
            state.keywords = keywords
        },
        clear_search_result(state){
            state.search_result = []
        },
        set_total(state,total){
            state.total = total
        },
        set_spin(state,show){
            state.spinShow = show
        }
        
    },
    actions:{
        async search({ commit, state }, keywords ){
            let res = await get_data( keywords )
                
                commit('set_keywords',keywords)
                let data = res.data
                data.map(item => {
                    Vue.set(item, "collapsed", true);
                    Vue.set(item, "checked", false);
                    return item;
                });
                commit('set_search_result',data)
        },
        get_total({commit}, keywords){
            get_total(keywords).then(res => {
                commit('set_total',res.data[0].total)
            })
        },
        
        clear_search_result({commit}){
            commit('clear_search_result')
        }
    }
}