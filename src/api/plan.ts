import request from '../utils/request'
import { BaseCallBack } from './index'

export interface SearchAllPlanCallBackItem{
  plan_id: string;
  user_id: string;
  plan_name: string;
  plan_start_date: string;
  plan_end_date: string;
  phone_number: string;
  todayPunch: boolean;
  planExpired: boolean;
}
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
interface SearchAllPlanCallBack extends BaseCallBack {
  data: {
    list: SearchAllPlanCallBackItem[]
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

/**
 * 查询指定日期计划
 * @param data
 * @returns
 */
export const searchAllPlan = (data): Promise<SearchAllPlanCallBack> => {
  return new Promise(async (resolve) => {
    const res = await request({
      url: '/plans/searchAllPlan',
      data,
    })
    resolve(res)
  })
}

/**
 * 创建计划
 * @param data
 * @returns
 */
export const createPlan = (data): Promise<BaseCallBack> => {
  return new Promise(async (resolve) => {
    const res = await request({
      url: '/plans/createPlan',
      data,
    })
    resolve(res)
  })
}

/**
 * 创建计划
 * @param data
 * @returns
 */
export const deletePlan = (data): Promise<BaseCallBack> => {
  return new Promise(async (resolve) => {
    const res = await request({
      url: '/plans/deletePlan',
      data,
    })
    resolve(res)
  })
}

