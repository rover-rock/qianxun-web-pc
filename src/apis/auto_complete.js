import { get } from "axios";
import Config from "../config/config";

export function search_company( part ){   
    return get(Config.API_POINT+'/auto_complete/search_company',{params:{ part : part }})
}

export function search_agency( part ){   
    return get(Config.API_POINT+'/auto_complete/search_agency',{params:{ part : part }})
}