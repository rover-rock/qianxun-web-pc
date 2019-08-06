import { get_audit_fees } from "@/apis/audit_data";
export default {
    state: {
        keywords:{},
        search_results:[],
        active_component:''
    },
    mutations:{
        set_audit_fees_records(state,data){
            state.search_results = data
        },
        set_active_component(state,component){
            state.active_component = component
        }
    },
    actions:{
        get_audit_fees_records({commit},keywords){
            get_audit_fees(keywords).then(res => {
                let data = res.data
                commit('set_audit_fees_records',data)
            })
        }
    }
}