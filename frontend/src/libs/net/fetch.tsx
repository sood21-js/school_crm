import axios from 'axios';

export const fetchApi = (data: any, url: string): any => {
    return axios.post(url, data)
}