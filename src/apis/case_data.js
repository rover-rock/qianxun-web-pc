import { get } from "axios";
import Config from "../config/config";

export const get_case_search_data = (params) => {
    return get(Config.API_POINT + '/case/search',{params:params})
}

export function get_latest_replies(){
    return get(Config.API_POINT + '/case/latest-replies')
}
