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

export function putContent(data) {
  return request({
    url: '/post-composite-service/api/v1/posts',
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

export function getPreSign(params) {
  return request({
    url: '/image-service/api/images/presigned_url',
    method: 'get',
    params,
  });
}

