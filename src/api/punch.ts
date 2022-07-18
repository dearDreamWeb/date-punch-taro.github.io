import request from '../utils/request'
import { BaseCallBack } from './index'

/**
 * 打卡
 * @param data
 * @returns
 */
export const createPunch = (data): Promise<BaseCallBack> => {
  return new Promise(async (resolve) => {
    const res = await request({
      url: '/punches/createPunch',
      data,
    })
    resolve(res)
  })
}
