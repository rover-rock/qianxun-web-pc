import { get } from "axios";
import Config from "../config/config";

export function get_IPO_queue_data(keywords){   
    return get(Config.API_POINT+'/IPO/search',{params:keywords})
}

