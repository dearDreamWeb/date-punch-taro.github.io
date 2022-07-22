import { useEffect, useState } from 'react'
import { View, Input, Picker, Text, Button } from '@tarojs/components'
import { showToast, navigateTo,removeStorageSync } from '@tarojs/taro'
import { isLogin } from '../../api/user'
import moment from 'moment';
import './my.less'

export default function My() {
  useEffect(()=>{
    isLogin({})
  },[])

  const logout = ()=>{
    removeStorageSync('token')
    removeStorageSync('isLogin')
    navigateTo({
      url:'/pages/index/index'
    })
  }

  return (
    <View className='myBox'>
      <View className='logoutBox'>
        <Button className='logout' type='primary' onClick={logout}>退出登录</Button>
      </View>
    </View>
  )
}
