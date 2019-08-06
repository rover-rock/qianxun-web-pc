import { get } from "axios";
import Config from "../config/config";

export function get_IPO_queue_data(){
    return get(Config.API_POINT+'/IPO/cat/shangjiaosuo/type/yupilu')
}

