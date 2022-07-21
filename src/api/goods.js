import request from '@/utils/request'
/**
 * 商品列表数据
 * @param {pagenum当前页码} param0
 * @param {pagesize每页显示条数} param0
 * @returns
 */
export const getGoodsList = ({ pagenum, pagesize }) => {
  return request({
    url: 'goods',
    params: {
      pagenum,
      pagesize
    }
  })
}
