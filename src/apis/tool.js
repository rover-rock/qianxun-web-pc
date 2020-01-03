import { get, post } from "axios";
import Config from "../config/config";

export const get_kdi = ( data ) => {
    return post(Config.API_POINT + '/tool/package/get',data,{
        timeout: 2000
    }).catch(error => {
          console.log(error)
        })
}