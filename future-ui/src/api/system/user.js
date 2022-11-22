import request from '@/utils/request'

// 新建用户
export function createUser(data) {
  return request({
    url: '/api/v1/system/user',
    method: 'post',
    data
  })
}

// 更新用户
export function updateUser(id, data) {
  return request({
    url: `/api/v1/system/user/${id}`,
    method: 'put',
    data
  })
}

// 用户列表
export function userList(params) {
  return request({
    url: '/api/v1/system/user',
    method: 'get',
    params
  })
}

// 删除用户
export function deleteUser(id) {
  return request({
    url: `/api/v1/system/user/${id}`,
    method: 'delete'
  })
}
