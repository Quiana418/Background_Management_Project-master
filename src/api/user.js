import request from '@/utils/request'

/* /**
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
