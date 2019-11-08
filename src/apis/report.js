import { get } from "axios";
import Config from "../config/config";

export const get_reports = (params) => {
    return get(Config.API_POINT + '/report/reports',{params:params})
}

export const get_reports_total = (params) => {
    return get(Config.API_POINT + '/report/reports-total',{params:params})
}

export const get_one_report = (params) => {
    return get(Config.API_POINT + '/report/one-report',{params:params})
}