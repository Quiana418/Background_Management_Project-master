import request from '@/utils/request'

/**
 * 获取所有权限列表
 * @param {值 list 或 tree , list 列表显示权限, tree 树状显示权限} list
 * @returns
 */
export const getRightsList = (list) => {
  return request({
    method: 'GET',
    url: `rights/${list}`
  })
}
