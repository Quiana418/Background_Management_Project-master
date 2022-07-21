import request from '@/utils/request'
// get delete====Params
// post put patch===data
/**
 * 登录的接口
 * @param {*} param0
 * @returns
 */
export const login = ({ username, password }) => {
  return request({
    method: 'POST',
    url: 'login',
    data: {
      username,
      password
    }
  })
}

/**
 * 获取用户数据列表
 * @param {query:查询参数，pagenum：当前页码，pagesize：每页显示条数 } param0
 * @returns
 */
export const getUserList = ({ query, pagenum, pagesize }) => {
  return request({
    url: 'users',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}

/**
 * 修改用户Switch开关状态
 * @param {用户id} id
 * @param {控制开关状态mg_state} type
 * @returns
 */
export const editUserState = ({ uId, type }) => {
  return request({
    url: `users/${uId}/state/${type}`,
    method: 'PUT'
  })
}

/**
 * 请求添加用户
 * @param {用户名称} username
 * @param {用户密码} password
 * @param {邮箱} email
 * @param {手机号} mobile
 * @returns
 */
export const addUser = ({ username, password, email, mobile }) => {
  return request({
    url: 'users',
    method: 'POST',
    data: {
      username,
      password,
      email,
      mobile
    }
  })
}

/**
 * 点击编辑按钮 请求对应的用户信息 渲染到编辑按钮表单内
 * @param {用户id} id
 * @returns
 */
export const getUserInfoById = (id) => {
  return request({
    url: `users/${id}`
  })
}

/**
 * 编辑用户资料
 * @param {用户id} id
 * @returns
 */
export const editUserInfo = (data) => {
  return request({
    url: `/users/${data.id}`,
    method: 'PUT',
    data
  })
}

/**
 * 根据id删除用户
 * @param {用户id} id
 * @returns
 */
export const delUser = (id) => {
  return request({
    url: `users/${id}`,
    method: 'DELETE'
  })
}

/**
 * 根据id rid分配用户角色
 * @param {用户id} id
 * @returns
 */
export const distributeUserRole = ({ id, rid }) => {
  return request({
    url: `users/${id}/role`,
    method: 'PUT',
    data: {
      rid
    }
  })
}
