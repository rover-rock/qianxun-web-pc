import { get, post } from "axios";
import Config from "../config/config";

export const get_kdi = ( data ) => {
    return post(Config.API_POINT + '/tool/package/get',data).catch(error => {
          console.log(error)
        })
}

export const check_address = ( data ) => {
    return post(Config.API_POINT + '/tool/hanzheng/get',data).catch(error => {
          console.log(error)
        })
}