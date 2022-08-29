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
  const [bgColorList] = useState(['#000', '#3c8518', '#c7d825', '#14bfbf', '#2581d8', '#d82596'])

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
    const list = (res.data.list || []).map((item, index) => {
      return {
        ...item,
        bgColor: bgColorList[(index % bgColorList.length)]
      }
    })
    setPlanList(list)
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

  /**
   * 选中计划
   * @param index
   */
  const selectItem = (index: number) => {
    if (planList[index].select) {
      planList.forEach((item, i) => item.select = false);
    } else {
      planList.forEach((item, i) => item.select = index === i);
    }

    setPlanList([...planList])
  }

  const editPlan = (item: SearchAllPlanCallBackItem) => {
    navigateTo({
      url: `/pages/addPlan/addPlan?data=${JSON.stringify(item)}`
    })
  }

  return (
    <View className='planManageBox'>
      <View className='planManageHeader'>
        <View className='headerText'>计划列表</View>
        <Image className='headerImage' src={addIcon} onClick={addPlan} />
      </View>
      <View className='listBox'>
        {planList.map((item, index) => (
          <View
            key={item.plan_id}
            className='listMain'
            style={{ backgroundColor: item.bgColor }}
            onClick={() => selectItem(index)}
          >
            <View>{item.plan_name}</View>
            <View className='listMainBottom'>
              <View className={`itemTime ${item.planExpired ? 'planExpired' : ''}`}>
                <View>{moment(item.plan_start_date).format('YYYY-MM-DD')}</View>
                <View>{moment(item.plan_end_date).format('YYYY-MM-DD')}</View>
              </View>
              <View className='itemTime'>
                <View>打卡：{item.punchDays}天</View>
                <View>计划：{item.planDays}天</View>
              </View>
            </View>
            <View className='iconBox' style={{ display: item.select ? 'flex' : 'none' }}>
              <Image className='itemIcon' src={editIcon} onClick={() => editPlan(item)} />
              <Image className='itemIcon' src={deleteIcon} onClick={() => deletePlanHandler(item.plan_id)} />
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}
export default PlanManage
