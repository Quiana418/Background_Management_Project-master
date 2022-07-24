import request from '@/utils/request'
/**
 * 获取商品分类数据列表
 * @param {*} param0
 * @returns
 */
export const getGoodsCategories = ({ type, pagenum, pagesize }) => {
  return request({
    url: 'categories',
    params: {
      type,
      pagenum,
      pagesize
    }
  })
}

/**
 * 获取分类 回写数据到表单
 * @param {type2} param0
 * @returns
 */
export const getCategoryLevel2 = (params) => {
  return request({
    url: 'categories',
    params
  })
}

/**
 * 添加分类
 * @param {catPid分类父ID，catName分类名称，catevel分类层级} param0
 * @returns
 */
export const addCategory = (data) => {
  return request({
    method: 'POST',
    url: 'categories',
    data
  })
}

/**
 * 删除分类
 * @param {分类 ID} id
 * @returns
 */
export const delCategory = (id) => {
  return request({
    method: 'DELETE',
    url: `categories/${id}`
  })
}

/**
 * 根据id查询商品分类 回写数据
 * @param {分类 ID} id
 * @returns
 */
export const editGoodsCategory = (id) => {
  return request({
    method: 'GET',
    url: `categories/${id}`
  })
}
