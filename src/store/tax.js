import { get_laws, get_laws_total, get_wenda, get_wenda_total } from "@/apis/tax";
export default {
    namespaced:true,
    state: {
        keywords:{},
        search_results:[],
        total:0,
        spinShow:false
    },
    mutations:{
        set_search_result(state,data){
            state.search_results = data
        },
        set_active_component(state,component){
            state.active_component = component
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
        async get_laws({commit},keywords){
            commit('set_keywords',keywords)
            await get_laws(keywords).then(res => {
                let data = res.data
                data.map(item => {
                    Vue.set(item, "collapsed", true);
                    Vue.set(item, "checked", false);
                    return item;
                });
                commit('set_search_result',data)
            })
        },
        get_laws_total({commit}, keywords){
            get_laws_total(keywords).then(res => {
                commit('set_total',res.data[0].total)
            })
        },
        async get_wenda({commit},keywords){
            commit('set_keywords',keywords)
            await get_wenda(keywords).then(res => {
                let data = res.data
                data.map(item => {
                    Vue.set(item, "collapsed", true);
                    Vue.set(item, "checked", false);
                    return item;
                });
                commit('set_search_result',data)
            })
        },
        get_wenda_total({commit}, keywords){
            get_wenda_total(keywords).then(res => {
                commit('set_total',res.data[0].total)
            })
        }
    }
}