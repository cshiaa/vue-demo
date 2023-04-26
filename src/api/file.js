import service from '@/utils/request'

//上传文件
export const uploadFile = (data) => {
  return service({
    url: '/file/upload',
    method: 'post',
    data: data
  })
}


//获取文件
export const getConfigFile = () => {
  return service({
    url: '/file/getConfigFile',
    method: 'get',
  })
}
