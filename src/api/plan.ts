import request from '../utils/request'
import { BaseCallBack } from './index'

export interface SearchPlanCallBackItem{
  plan_id: string;
  user_id: string;
  plan_name: string;
  plan_start_date: string;
  plan_end_date: string;
  phone_number: string;
  todayPunch: boolean;
}

interface SearchPlanCallBack extends BaseCallBack {
  data: {
    list: SearchPlanCallBackItem[]
  }
}
export const searchPlan = (data): Promise<SearchPlanCallBack> => {
  return new Promise(async (resolve) => {
    const res = await request({
      url: '/plans/searchPlan',
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
