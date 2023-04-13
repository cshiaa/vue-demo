import service from '@/utils/request'

//动态路由获取Menu
export const asyncMenu = () => {
  return service({
    url: '/menu/asyncMenu',
    method: 'post',
  })
}

//获取菜单列表
export const getMenuList = () => {
    return service({
      url: '/menu/allMenu',
      method: 'get',
    })
}


