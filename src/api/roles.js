import request from '@/utils/request'
/**
 * 获取角色列表
 * @returns
 */
export const getRolesList = () => {
  return request({
    url: 'roles'
  })
}

/**
 * 请求添加角色
 * @param {角色名称} roleName
 * @param {角色描述} roleDesc
 * @returns
 */
export const addRole = ({ roleName, roleDesc }) => {
  return request({
    url: 'roles',
    method: 'POST',
    data: {
      roleName,
      roleDesc
    }
  })
}

/**
 * 删除角色指定的权限
 * @param {角色id} roleId
 * @param {权限id} rightId
 * @returns
 */
export const delRoleRights = ({ roleId, rightId }) => {
  return request({
    method: 'DELETE',
    url: `roles/${roleId}/rights/${rightId}`
  })
}

/**
 * 根据角色id删除角色
 * @param {角色id} id
 * @returns
 */
export const delRole = (id) => {
  return request({
    method: 'DELETE',
    url: `roles/${id}`
  })
}
