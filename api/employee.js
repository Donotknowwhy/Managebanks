import request from "../utils/request"

export function getEmployee(params) {
    return request({
        url: '/employee',
        method: 'get',
        params,
        headers: {
            'Content-type': 'application/json',
        },
    })
}

export function postEmployee(data){
    return request({
        url: '/employee',
        method: 'post',
        data,
    });
}

export function deleteEmployee(data){
    return request({
        url: `/employee/${data}`,
        method: 'delete',
      });
}