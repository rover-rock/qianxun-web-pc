import { get } from "axios";
import Config from "../config/config";

export function search_company( part,type ){   
    return get(Config.API_POINT+'/auto_complete/search_company',{params:{ part,type }})
}

export function search_agency( part ){   
    return get(Config.API_POINT+'/auto_complete/search_agency',{params:{ part }})
}

export function search_industry( part ){   
    return get(Config.API_POINT+'/auto_complete/search_industry',{params:{ part }})
}