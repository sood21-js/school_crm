/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import { getCookie } from '#src/helpers/cookie';
import config from '#src/config.app'

export const fetchApi = (data: any, url: string): any => {
    const token = getCookie(config.cookie.name)
    return axios.post(url, data, {
        headers: {'Authorization': token} 
    }).then((res: any) => {
        return res
    })
}