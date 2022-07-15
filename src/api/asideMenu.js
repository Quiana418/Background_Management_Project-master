import request from '@/utils/request'
/**
 * 获取左侧菜单栏
 * @returns
 */
export const getAsideMenu = () => {
  return request({
    url: 'menus'
  })
}
