import request from '@/utils/request'
/**
 * 获取订单数据列表
 * @param {*} params
 * @returns
 */
export const getOrderList = (params) => {
  return request({
    url: 'orders',
    params
  })
}
