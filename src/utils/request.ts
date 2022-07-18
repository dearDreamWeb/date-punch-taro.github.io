import { request, getStorageSync, setStorageSync } from '@tarojs/taro'

interface RequestProps {
  url: string;
  data: any;
  method?: keyof Taro.request.Method;
}

const requestApi = ({ url, method = 'POST', data }: RequestProps):Promise<any> => {
  const baseUrl = 'http://localhost:4396';
  const token = getStorageSync('token');
  let header:any = {}
  if (token) {
    header.authorization = token
  }
  return new Promise((resolve) => {
    request({
      url: `${baseUrl}${url}`,
      method,
      data,
      header,
      success: function (res) {
        resolve(res.data)
      }
    })
  })
}

export default requestApi
