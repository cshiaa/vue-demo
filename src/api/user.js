import service from '@/utils/request'

// @Summary 用户登录
// @Produce  application/json
// @Param data body {username:"string",password:"string"}
// @Router /login [post]
export const login = (data) => {
    return service({
      url: '/api/login',
      method: 'post',
      data: data
    })
}

export const register = (data) => {
  return service({
    url: '/api/register',
    method: 'post',
    data: data
  })
}

//获取用户列表
export const getUserList = () => {
  return service({
    url: '/user/list',
    method: 'get',
  })
}
