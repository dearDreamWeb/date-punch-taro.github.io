import { request, getStorageSync, setStorageSync, removeStorageSync, navigateTo, showToast } from '@tarojs/taro'

interface RequestProps {
  url: string;
  data: any;
  method?: keyof Taro.request.Method;
}
// 192.168.31.50
const requestApi = ({ url, method = 'POST', data }: RequestProps): Promise<any> => {
  const baseUrl = 'http://192.168.31.50:4396';
  const token = getStorageSync('token');
  let header: any = {}
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
        if (!(res.data.success) && (res.data.code === 401 || res.data.code === 10000)) {
          removeStorageSync('token');
          setStorageSync('isLogin', false)
          showToast({ title: '请重新登录', icon: 'none' })
          navigateTo({
            url: '/pages/index/index'
          })
          return;
        }
        resolve(res.data)
      }
    })
  })
}

export default requestApi
