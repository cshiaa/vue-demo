import service from '@/utils/request'

//获取配置信息列表
export const getConfigList = () => {
  return service({
    url: '/api/config/list',
    method: 'get',
  })
}

export const saveConfig = (data) => {
    return service({
      url: '/api/config/update',
      method: 'post',
      data: data
    })
}