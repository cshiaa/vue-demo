import service from '@/utils/request'

//获取配置信息列表
export const getConfigList = () => {
  return service({
    url: '/config/list',
    method: 'get',
  })
}

export const saveConfig = (data) => {
    return service({
      url: '/config/update',
      method: 'post',
      data: data
    })
}