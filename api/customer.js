import request from '../utils/request';

export function getListCustomer(params) {
  return request({
    url: '/customer',
    method: 'get',
    params,
    headers: {
      'Content-type': 'application/json',
    },
  });
}

export function postCustomer(data) {
  return request({
    url: '/customer',
    method: 'post',
    data,
  });
}

export function putCustomer(data) {
  return request({
    url: '/customer',
    method: 'put',
    data,
  });
}

export function deleteCustomer(data) {
  return request({
    url: `/customer/${data}`,
    method: 'delete',
  });
}

