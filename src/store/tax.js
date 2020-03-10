import { get_data } from "@/apis/tax";
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
        get_laws({commit},keywords){
            commit('set_keywords',keywords)
            get_data('/tax/laws',keywords).then(res => {   
                let data = res.data
                data.map(item => {
                    Vue.set(item, "collapsed", true);
                    Vue.set(item, "checked", false);
                    return item;
                });
                commit('set_records',data)
            })
            get_data('/tax/laws-total',keywords).then(res => {
                commit('set_total',res.data[0].total)
            })
        },
        get_zhunze({commit},keywords){
            commit('set_keywords',keywords)
            get_data('/tax/zhunze',keywords).then(res => {
                let data = res.data
                data.map(item => {
                    Vue.set(item, "collapsed", true);
                    Vue.set(item, "checked", false);
                    return item;
                });
                commit('set_records',data)
            })
            get_data('/tax/zhunze-total',keywords).then(res => {
                commit('set_total',res.data[0].total)
            })
        },
        async get_wenda({commit},keywords){
            commit('set_keywords',keywords)
            await get_data('/tax/wenda',keywords).then(res => {
                let data = res.data
                data.data.map(item => {
                    Vue.set(item, "collapsed", true);
                    Vue.set(item, "checked", false);
                    return item;
                });
                commit('set_records',data.data)
                commit('set_total',data.total)
            })
        }
    }
}