import { get } from "axios";
import Config from "../config/config";

export const get_data = (params) => {
    return get(Config.API_POINT + '/punish/search',{params:params})
}

export const get_total = (params) => {
    return get(Config.API_POINT + '/punish/search_total',{params:params})
}

export function get_one_record(params){
    return get(Config.API_POINT + '/punish/get_one_record',{params:params})
}