import { useEffect, useState } from 'react'
import { View, Input, Picker, Text, Button } from '@tarojs/components'
import { showToast, switchTab, getCurrentInstance } from '@tarojs/taro'
import { createPlan, updatePlan } from '../../api/plan';
import moment from 'moment';
import './addPlan.less'

export default function AddPlan() {
  const instance: any = getCurrentInstance()

  const [planStartDate, setPlanStartDate] = useState<string>(moment().format('YYYY-MM-DD'))
  const [planEndDate, setPlanEndDate] = useState<string>(moment().format('YYYY-MM-DD'))
  const [planName, setPlanName] = useState<string>('')
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [planId, setPlanId] = useState<string>('');

  useEffect(() => {
    let { data } = instance.router!.params
    setIsUpdate(!!data);
    if (data) {
      data = JSON.parse(data);
      const { plan_id, plan_start_date, plan_end_date, plan_name } = data;
      setPlanName(plan_name)
      setPlanStartDate(moment(plan_start_date).format('YYYY-MM-DD'))
      setPlanEndDate(moment(plan_end_date).format('YYYY-MM-DD'))
      setPlanId(plan_id)
    }
  }, [instance])

  /**
   * 添加计划
   * @returns
   */
  const addPlan = async () => {
    if (!planName) {
      showToast({ title: '请输入计划名', icon: 'none' })
      return;
    }
    if (new Date(planEndDate).getTime() < new Date(planStartDate).getTime()) {
      showToast({ title: '开始时间要小于结束时间', icon: 'none' })
      return;
    }
    const res = await createPlan({ planName, planStartDate, planEndDate });
    if (!res.success) {
      showToast({ title: '添加计划失败', icon: 'error' })
      return;
    }
    showToast({ title: '添加计划成功', icon: 'success' })
    await new Promise((resolve) => setTimeout(resolve, 1500))
    switchTab({
      url: '/pages/planManage/planManage'
    })
  }

  /**
 * 修改计划
 * @returns
 */
  const updatePlanHandler = async () => {
    const res = await updatePlan({
      planId,
      planName,
      planStartDate,
      planEndDate
    })
    if (!res.success) {
      showToast({ title: '修改计划失败', icon: 'error' })
      return;
    }
    showToast({ title: '修改计划成功', icon: 'success' })
    await new Promise((resolve) => setTimeout(resolve, 1500))
    switchTab({
      url: '/pages/planManage/planManage'
    })
  }

  return (
    <View className='addPlanBox'>
      <View className='planItem'>
        <View className='itemLabel'>计划名：</View>
        <Input className='planNameInput' placeholder='请输入计划名' value={planName} onInput={(e) => setPlanName(e.detail.value)} />
      </View>
      <View className='planItem'>
        <View className='itemLabel'>计划开始时间：</View>
        <Picker mode='date' value={planStartDate} onChange={(e) => setPlanStartDate(e.detail.value)}>
          <View className='picker'>
            {planStartDate}<Text className='sign'>▼</Text>
          </View>
        </Picker>
      </View>
      <View className='planItem'>
        <View className='itemLabel'>计划结束时间：</View>
        <Picker mode='date' value={planEndDate} onChange={(e) => setPlanEndDate(e.detail.value)}>
          <View className='picker'>
            {planEndDate}<Text className='sign'>▼</Text>
          </View>
        </Picker>
      </View>
      <View className='planItem'>
        <Button type='primary' onClick={() => isUpdate ? updatePlanHandler() : addPlan()}>{isUpdate ? '确认修改' : '确认添加'}</Button>
      </View>
    </View>
  )
}
