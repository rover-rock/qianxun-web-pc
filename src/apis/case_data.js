import { get } from "axios";
import Config from "../config/config";

export const get_case_search_data = (params) => {
    return get(Config.API_POINT + '/case/search',{params:params})
}

export const get_total = (params) => {
    return get(Config.API_POINT + '/case/search_total',{params:params})
}

export function get_latest_replies(){
    return get(Config.API_POINT + '/case/latest-replies')
}

export function get_one_case(params){
    return get(Config.API_POINT + '/case/get_one_case',{params:params})
}
