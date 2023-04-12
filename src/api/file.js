import service from '@/utils/request'

//获取文件
export const uploadFile = (data) => {
  return service({
    url: '/file/upload',
    method: 'post',
    data: data
  })
}
