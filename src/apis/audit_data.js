import { get } from "axios";
import Config from "../config/config";

export const get_audit_fees = (params) => {
    return get(Config.API_POINT + '/audit-data/fees',{params:params})
}
