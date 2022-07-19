import { useEffect, useState, useLayoutEffect } from 'react'
import { View, Image } from '@tarojs/components'
import { showModal, showToast, navigateTo, useDidShow } from '@tarojs/taro'
import { searchAllPlan, deletePlan, SearchAllPlanCallBackItem } from '../../api/plan';
import moment from 'moment';
import './planManage.less'
import addIcon from '../../assets/images/add.png'
import editIcon from '../../assets/images/edit.png'
import deleteIcon from '../../assets/images/delete.png'

function PlanManage() {
  const [planList, setPlanList] = useState<SearchAllPlanCallBackItem[]>([])

  useDidShow(() => {
    getPlanList()
  })

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

  /**
   * 添加计划，跳转到添加计划页面
   */
  const addPlan = () => {
    navigateTo({
      url: '/pages/addPlan/addPlan'
    })
  }

  /**
   *  删除计划
   * @param planId
   */
  const deletePlanHandler = async (planId) => {
    showModal({
      title: '确定删除该计划？',
      async success({ confirm }) {
        if (!confirm) {
          return;
        }
        const res = await deletePlan({ planId })
        if (!res.success) {
          return;
        }
        showToast({ title: "删除计划成功", icon: 'none' })
        getPlanList()
      }
    })
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
            <View className='itemTop'>
              <View>{item.plan_name}</View>
              <View className='iconBox'>
                <Image className='itemIcon' src={editIcon} />
                <Image className='itemIcon' src={deleteIcon} onClick={() => deletePlanHandler(item.plan_id)} />
              </View>
            </View>
            <View className={`itemTime ${item.planExpired ? 'planExpired' : ''}`}>{moment(item.plan_start_date).format('YYYY-MM-DD')}至{moment(item.plan_end_date).format('YYYY-MM-DD')}</View>
          </View>
        ))}
      </View>
    </View>
  )
}
export default PlanManage
