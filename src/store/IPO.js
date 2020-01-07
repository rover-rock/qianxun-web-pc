import { get_data } from "@/apis/IPO_data";


export default {
    namespaced:true,
    state: {
        keywords:{},
        search_results:[],
        total:0,
        spinShow:false
    },
    mutations:{
        set_records(state,data){
            state.search_results = data
        },
        set_total(state,total){
            state.total = total
        },
        set_keywords(state , keywords){
            state.keywords = keywords
        },
        set_spin(state, loading){
            state.spinShow = loading
        },
        clear_search_result(state){
            state.search_results = []
        }
    },
    actions:{
        get_sanban({commit},keywords){
            commit('set_keywords',keywords)
            get_data('/IPO/sanban',keywords).then(res => {   
                commit('set_records',res.data)
            })
            get_data('/IPO/sanban-total',keywords).then(res => {
                commit('set_total',res.data[0].total)
            })
        },
        get_kcb({commit},keywords){
            commit('set_keywords',keywords)
            get_data('/IPO/kcb',keywords).then(res => {   
                commit('set_records',res.data)
            })
            get_data('/IPO/kcb-total',keywords).then(res => {
                commit('set_total',res.data[0].total)
            })
        }


    }
}