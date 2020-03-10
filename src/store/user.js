import { get_users } from "@/apis/user";
export default {
    namespaced:true,
    state:{
        users:[]
    },
    mutations:{
        set_users(state,users){
            state.users = users
        }
    },
    actions:{
        get_users({commit}){
            
            get_users().then(res => {
                commit('set_users',res.data)
            })
        }
    }

}

