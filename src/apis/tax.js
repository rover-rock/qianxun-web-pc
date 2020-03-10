import { get } from "axios";
import Config from "../config/config";

export const get_data = (url,params) => {
    return get(Config.API_POINT + url,{params:params})
}

export const get_one_zhunze = (params) => {
    return get(Config.API_POINT + '/tax/one-zhunze',{params:params})
}