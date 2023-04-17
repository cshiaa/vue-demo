import service from '@/utils/request'

//动态路由获取Menu
export const asyncMenu = () => {
  return service({
    url: '/menu/asyncMenu',
    method: 'post',
  })
}

//获取菜单列表
export const getAllMenu = () => {
    return service({
      url: '/menu/allMenu',
      method: 'get',
    })
}

//获取用户菜单列表
export const getUserMenu = (id) => {
  return service({
    url: '/menu/getUserMenu',
    method: 'post',
    params: id
  })
}

//获取用户菜单列表
export const updateUserMenu = (id, data) => {
  return service({
    url: '/menu/updateUserMenu',
    method: 'post',
    data: data,
    params: id
  })
}
