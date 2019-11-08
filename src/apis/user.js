import { post } from "axios";
import Config from "../config/config";

export const login = (params) => {
    return post(Config.API_POINT + '/login',params,{ headers: { 'Content-type':'application/json'}})
}

export const get_user_info = ( token ) => {
    return post(Config.API_POINT + '/get_user_info',{ token })
}