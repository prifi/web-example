import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/v1/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/api/v1/system/user/details',
    method: 'get'
  })
}
