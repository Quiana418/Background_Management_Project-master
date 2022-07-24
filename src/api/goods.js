import request from '@/utils/request'
/**
 * 商品列表数据
 * @param {pagenum当前页码} param0
 * @param {pagesize每页显示条数} param0
 * @returns
 */
export const getGoodsList = ({ query, pagenum, pagesize }) => {
  return request({
    url: 'goods',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}

/**
 * 添加商品
 *  goods_name,
  goods_cat,
  goods_price,
  goods_number,
  goods_weight,
  goods_introduce,
  pics,
  attrs
 * @param {商品名称，以为','分割的分类列表，价格，数量，重量，介绍，上传的图片临时路径（对象），商品的参数（数组）} param0
 * @returns
 */
export const addGoods = (data) => {
  return request({
    method: 'POST',
    url: 'goods',
    data
  })
}

/**
 * 删除商品
 * @param {商品 ID} id
 * @returns
 */
export const delGoods = (id) => {
  return request({
    method: 'DELETE',
    url: `goods/${id}`
  })
}

/**
 * 编辑提交商品
 * @param {*} data
 * @returns
 */
export const editGoods = (data) => {
  return request({
    method: 'PUT',
    url: `goods/${data.id}`,
    data
  })
}
