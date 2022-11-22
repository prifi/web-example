import request from '@/utils/request'

// 权限树
export function getPermissions() {
  return request({
    url: '/api/v1/system/permissions',
    method: 'get'
  })
}

// 所有权限
export function getALLPermissions(params) {
  return request({
    url: '/api/v1/system/all-permissions',
    method: 'get',
    params
  })
}

// 新建权限
export function createPermission(data) {
  return request({
    url: '/api/v1/system/permission',
    method: 'post',
    data
  })
}

// 编辑权限
export function updatePermission(id, data) {
  return request({
    url: `/api/v1/system/permission/${id}`,
    method: 'put',
    data
  })
}

// 删除权限
export function deletePermission(id) {
  return request({
    url: `/api/v1/system/permission/${id}`,
    method: 'delete'
  })
}

// 更新角色权限
export function updateRolePermissions(id, data) {
  return request({
    url: `/api/v1/system/role/permission/${id}`,
    method: 'put',
    data
  })
}

// 获取当前用户页面标签权限
export function getUserPermissions() {
  return request({
    url: `/api/v1/system/user/permission`,
    method: 'get'
  })
}
