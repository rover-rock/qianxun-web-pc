import { get } from "axios";
import Config from "../config/config";

export const get_laws = (params) => {
    return get(Config.API_POINT + '/tax/laws',{params:params})
}

export const get_laws_total = (params) => {
    return get(Config.API_POINT + '/tax/laws-total',{params:params})
}

export const get_wenda = (params) => {
    return get(Config.API_POINT + '/tax/wenda',{params:params})
}

export const get_wenda_total = (params) => {
    return get(Config.API_POINT + '/tax/wenda-total',{params:params})
}