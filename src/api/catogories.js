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
