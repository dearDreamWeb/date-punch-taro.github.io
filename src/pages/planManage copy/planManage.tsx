import React, { useEffect, useState } from 'react'
import { View, Image } from '@tarojs/components'
import { showModal } from '@tarojs/taro'
import { searchAllPlan, SearchAllPlanCallBackItem } from '../../api/plan';
import moment from 'moment';
import './planManage.less'
import addIcon from '../../assets/images/add.png'

function PlanManage() {
  const [planList, setPlanList] = useState<SearchAllPlanCallBackItem[]>([])

  useEffect(() => {
    getPlanList()
  }, [])

  /**
   * 获取该用户的所有计划
   * @returns
   */
  const getPlanList = async () => {
    const res = await searchAllPlan({});
    if (!res.success) {
      return;
    }
    setPlanList(res.data.list || [])
  }

  const addPlan = ()=>{
    showModal({title:'添加计划'})
  }

  return (
    <View className='planManageBox'>
      <View className='planManageHeader'>
        <View className='headerText'>计划列表</View>
        <Image className='headerImage' src={addIcon} onClick={addPlan} />
      </View>
      <View className='listBox'>
        {planList.map((item) => (
          <View key={item.plan_id} className='listMain'>
            <View>{item.plan_name}</View>
            <View className={`itemTime ${item.planExpired ? 'planExpired' : ''}`}>{moment(item.plan_start_date).format('YYYY-MM-DD')}至{moment(item.plan_end_date).format('YYYY-MM-DD')}</View>
          </View>
        ))}
      </View>
    </View>
  )
}
export default PlanManage
