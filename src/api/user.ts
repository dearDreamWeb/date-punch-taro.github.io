import request from '../utils/request'
import { BaseCallBack } from './index'

interface LoginCallBack extends BaseCallBack {
  data: {
    token: string
  }
}
export const login = (data): Promise<LoginCallBack> => {
  return new Promise(async (resolve) => {
    const res = await request({
      url: '/users/login',
      data,
    })
    resolve(res)
  })
}
export const register = (data): Promise<BaseCallBack> => {
  return new Promise(async (resolve) => {
    const res = await request({
      url: '/users/register',
      data,
    })
    resolve(res)
  })
}
