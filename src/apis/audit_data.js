import { get } from "axios";
import Config from "../config/config";

export const get_audit_fees = (params) => {
    return get(Config.API_POINT + '/audit-data/fees',{params:params})
}

export const get_audit_fees_total = (params) => {
    return get(Config.API_POINT + '/audit-data/fees-total',{params:params})
}

export const search_cpa = (params) => {
    return get(Config.API_POINT + '/audit-data/search-cpa',{params:params})
}

export const get_wenda = (params) => {
    return get(Config.API_POINT + '/audit-data/wenda',{params:params})
}

export const get_wenda_total = (params) => {
    return get(Config.API_POINT + '/audit-data/wenda-total',{params:params})
}

export const get_data = (url,params) => {
    return get(Config.API_POINT + url,{params:params})
}