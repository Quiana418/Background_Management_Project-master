/* eslint-disable camelcase */
import request from '@/utils/request'
/**
 * 获取动态/静态参数列表
 * @param {类ID} id
 * @param {[many]} sel
 * @returns
 */
export const getCategoryParams = (id, sel) => {
  return request({
    url: `categories/${id}/attributes?sel=${sel}`
  })
}

/**
 * 添加动态参数
 * @param {类ID} id
 * @param {参数名称} _attr_name
 * @param {[only,many]} attr_sel====activeName
 * @param {如果是 many 就需要填写值的选项，以逗号分隔} attr_vals
 * @returns
 */

export const addDynamicParams = (data) => {
  return request({
    url: `categories/${data.id}/attributes`,
    method: 'POST',
    data
  })
}

/**
 * 提交修改动态参数 或者 静态属性
 * :id分类 ID不能为空携带在url中
 * :attrId属性 ID不能为空携带在url中
 * attr_name新属性的名字不能为空，携带在请求体中
 * attr_sel属性的类型[many 或 only]
 * @param {*} data
 * @returns
 */
export const editParams = (data) => {
  return request({
    method: 'PUT',
    url: `categories/${data.id}/attributes/${data.attrId}`,
    data
  })
}

/**
 * 删除参数
 * @param {*} params
 * @returns
 */
export const delParams = (params) => {
  return request({
    method: 'DELETE',
    url: `categories/${params.id}/attributes/${params.attrid}`
  })
}
