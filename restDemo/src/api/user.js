import request from '@/utils/request'

export function getUserList(params) {
  return request({
    url: '/api/users/',
    method: 'get',
    params
  })
}

export function getUser(userId) {
  return request({
    url: `/api/users/${userId}/`,
    method: 'get'
  })
}

export function modifyUser(id, data) {
  return request({
    url: `/api/users/${id}/`,
    method: 'patch',
    data
  })
}

export function addUser(data) {
  return request({
    url: `/api/userReg/`,
    method: 'post',
    data
  })
}
