import request from '@/utils/request'

// 模型分类
export function createModelGroup(data) {
  return request({
    url: '/api/v1/system/user',
    method: 'post',
    data
  })
}
