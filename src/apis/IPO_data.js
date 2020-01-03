import { get } from "axios";
import Config from "../config/config";

export function get_data(url,keywords){   
    return get(Config.API_POINT+url,{params:keywords})
}
