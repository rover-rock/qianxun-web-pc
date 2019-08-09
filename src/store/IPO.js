import { get_IPO_queue_data } from "@/apis/IPO_data";

export default {
    state:{
        keywords:{},
        search_result:[]
    },
    mutations:{
        set_search_result(state,data){
            state.search_result = data
        }
    },
    actions:{
        get_IPO_queue_data({commit},keywords){
            get_IPO_queue_data(keywords).then(res => {
                commit('set_search_result',res.data)
            })
        }
    }
}