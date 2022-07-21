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

/**
 * 根据id获取角色信息 渲染到角色对话框
 * @param {角色id} id
 * @returns
 */
export const getRoleInfo = (id) => {
  return request({
    url: `roles/${id}`
  })
}

/**
 * 编辑角色 提交
 * @param {角色id} id
 * @returns
 */
export const confirmEditRole = ({ id, roleName, roleDesc }) => {
  return request({
    method: 'PUT',
    url: `roles/${id}`,
    data: {
      roleName,
      roleDesc
    }
  })
}

/**
 * 角色授权
 * @param {:roleId角色 ID} data
 * @param {rids权限 ID 列表（字符串）} data
 * @returns
 */
export const giveRightsToRole = (data) => {
  return request({
    method: 'POST',
    url: `roles/${data.roleId}/rights`,
    data
  })
}
