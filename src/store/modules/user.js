// 请求回来的数据放到state里面
import { getUserList } from '@/api/user'
import { Message } from 'element-ui'
const state = {
  //  获取到的数据---用户数据列表
  userList: []
}

const mutations = {
  setUserList (state, payload) {
    state.userList = payload
  }
}

// 在actions里面发送Ajax请求
const actions = {
  // 请求 获取用户数据列表
  async getUserList (context, params) {
    try {
      const res = await getUserList(params)
      // console.log(res)
      context.commit('setUserList', res.data.data.users)
      console.log(res.data.data.users)
    } catch (err) {
      Message.error(err.message)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
