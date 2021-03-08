/* eslint-disable react-hooks/rules-of-hooks */
import axios, { AxiosResponse } from 'axios';
import { getCookie } from '#src/utils/cookie';
import config from '#src/config.app'
import { TResponse } from '#src/redux/types/common_types';

export const fetchApi = (data: any, url: string): Promise<TResponse> => {
    const token = getCookie(config.cookie.name)
    return axios.post(url, data, {
        headers: {'Authorization': token}
    }).then((result: AxiosResponse<TResponse>) => result.data)
}