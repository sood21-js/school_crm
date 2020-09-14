/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import { getCookie } from '#src/helpers/cookie';


export const fetchApi = (data: any, url: string): any => {
    const token = getCookie('school_auth')
    return axios.post(url, data, {
        headers: {'Authorization': token} 
    }).then((res: any) => {
        console.log(res.data)
        return res
    })
}