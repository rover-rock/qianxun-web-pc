import { post,get } from "axios";
import Config from "../config/config";

export const login = (params) => {
    return post(Config.API_POINT + '/login',params,{ headers: { 'Content-type':'application/json'}})
}

export const register = (params) => {
    return post(Config.API_POINT + '/register',params,{ headers: { 'Content-type':'application/json'}})
}

export const get_user_info = ( token ) => {
    return post(Config.API_POINT + '/get_user_info',{ token })
}

export const get_verify_code = ( phone ) => {
    return post(Config.API_POINT + '/get_verify_code',{ phone })
};

export const get_users = ( ) => {
    return get(Config.API_POINT + '/admin/get_users')
};
