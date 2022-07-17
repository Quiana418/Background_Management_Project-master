
import { getUserList, editUserInfo, getUserInfoById } from '@/api/user'
import { Message } from 'element-ui'
// 请求回来的数据放到state里面
const state = {
  //  获取到的数据---用户数据列表
  userList: {},
  // 获取到的 渲染到编辑按钮弹出框内的 用户资料
  editForm: {},
  // 点击编辑按钮 获取到的用户邮箱 电话 渲染到表单中
  userInfos: {}
}

const mutations = {
  setUserList (state, payload) {
    state.userList = payload
  },
  setEditForm (state, payload) {
    state.editForm = payload
  },
  setUserInfos (state, payload) {
    state.userInfos = payload
  }
}

// 在actions里面发送Ajax请求
const actions = {
  // 请求 获取用户数据列表
  async getUserList (context, params) {
    try {
      const res = await getUserList(params)
      // console.log(res)
      // 存数据
      context.commit('setUserList', res.data.data)
    } catch (err) {
      Message.error(err.message)
    }
  },
  // 编辑用户资料
  async editUserInfo (context, data) {
    try {
      const res = await editUserInfo(data)
      // console.log(res)
      context.commit('setEditForm', res.data.data)
    } catch (err) {
      console.log(err)
    }
  },
  // 根据用户id获取用户信息 渲染到编辑按钮的表单内  编辑用户资料
  async getUserInfoById (context, params) {
    try {
      const res = await getUserInfoById(params)
      // console.log(res)
      context.commit('setUserInfos', res.data.data)
    } catch (err) {
      console.log(err)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
