import { get_audit_fees, get_audit_fees_total, get_wenda, get_wenda_total, get_data } from "@/apis/audit_data";
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
        get_audit_fees_records({commit},keywords){
            commit('set_keywords',keywords)
            get_audit_fees(keywords).then(res => {
                let data = res.data
                commit('set_records',data)
            })
            get_audit_fees_total(keywords).then(res => {
                commit('set_total',res.data[0].total)
            })
        },
        async get_wenda_records({commit},keywords){
            commit('set_keywords',keywords)
            await get_wenda(keywords).then(res => {
                let data = res.data
                data.data.map(item => {
                    Vue.set(item, "collapsed", true);
                    Vue.set(item, "checked", false);
                    return item;
                });
                commit('set_records',data.data)
                commit('set_total',data.total)
            })
        },
        get_keyaudit({commit},keywords){
            commit('set_keywords',keywords)
            get_data('/audit-data/keyaudit',keywords).then(res => {   
                let data = res.data
                data.map(item => {
                    Vue.set(item, "collapsed", true);
                    Vue.set(item, "checked", false);
                    return item;
                });
                commit('set_records',data)
            })
            get_data('/audit-data/keyaudit-total',keywords).then(res => {
                commit('set_total',res.data[0].total)
            })
        },
        get_feibiao({commit},keywords){
            commit('set_keywords',keywords)
            get_data('/audit-data/feibiao',keywords).then(res => {   
                let data = res.data
                data.map(item => {
                    Vue.set(item, "collapsed", true);
                    Vue.set(item, "checked", false);
                    return item;
                });
                commit('set_records',data)
            })
            get_data('/audit-data/feibiao-total',keywords).then(res => {
                commit('set_total',res.data[0].total)
            })
        },
        get_equity({commit},keywords){
            commit('set_keywords',keywords)
            get_data('/audit-data/equity',keywords).then(res => {   
                let data = res.data
                data.map(item => {
                    Vue.set(item, "collapsed", true);
                    Vue.set(item, "checked", false);
                    return item;
                });
                commit('set_records',data)
            })
            get_data('/audit-data/equity-total',keywords).then(res => {
                commit('set_total',res.data[0].total)
            })
        },
        get_repurchase({commit},keywords){
            commit('set_keywords',keywords)
            get_data('/audit-data/repurchase',keywords).then(res => {   
                let data = res.data
                data.map(item => {
                    Vue.set(item, "collapsed", true);
                    Vue.set(item, "checked", false);
                    return item;
                });
                commit('set_records',data)
            })
            get_data('/audit-data/repurchase-total',keywords).then(res => {
                commit('set_total',res.data[0].total)
            })
        },
        get_forecast({commit},keywords){
            commit('set_keywords',keywords)
            get_data('/audit-data/forecast',keywords).then(res => {   
                let data = res.data
                data.map(item => {
                    Vue.set(item, "collapsed", true);
                    Vue.set(item, "checked", false);
                    return item;
                });
                commit('set_records',data)
            })
            get_data('/audit-data/forecast-total',keywords).then(res => {
                commit('set_total',res.data[0].total)
            })
        },
        get_disclosure({commit},keywords){
            commit('set_keywords',keywords)
            get_data('/audit-data/disclosure',keywords).then(res => {   
                let data = res.data
                data.map(item => {
                    Vue.set(item, "collapsed", true);
                    Vue.set(item, "checked", false);
                    return item;
                });
                commit('set_records',data)
            })
            get_data('/audit-data/disclosure-total',keywords).then(res => {
                commit('set_total',res.data[0].total)
            })
        },
    }
}