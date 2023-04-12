import service from '@/utils/request'

//获取Deployment列表
export const getDeploymentList = () => {
  return service({
    url: '/kubernetes/resources/get',
    method: 'get',
  })
}

