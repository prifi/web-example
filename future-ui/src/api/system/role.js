import request from '@/utils/request'

// 新建角色
export function createRole(data) {
  return request({
    url: '/api/v1/system/role',
    method: 'post',
    data
  })
}

// 编辑角色
export function updateRole(id, data) {
  return request({
    url: `/api/v1/system/role/${id}`,
    method: 'put',
    data
  })
}

// 角色列表
export function roleList(params) {
  return request({
    url: '/api/v1/system/role',
    method: 'get',
    params
  })
}

// 删除角色
export function deleteRole(id) {
  return request({
    url: `/api/v1/system/role/${id}`,
    method: 'delete'
  })
}
