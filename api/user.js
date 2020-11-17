import request from '../utils/request';

export function getUser(params){
    return request({
        url: 'https://randomuser.me/api',
        method: 'get',
        type: 'json',
        params,
        headers: {
            'Content-type': 'application/json',
        },
    })
}