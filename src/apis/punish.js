import { get } from "axios";
import Config from "../config/config";

export const get_data = (params) => {
    return get(Config.API_POINT + '/punish/search',{params:params})
}
