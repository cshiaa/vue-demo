import service from '@/utils/request'

//获取文件
export const getConfigList = () => {
  return service({
    url: '/api/list',
    method: 'get',
  })
}
