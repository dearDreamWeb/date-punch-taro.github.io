import { Component,useEffect } from 'react'
import {navigateTo,redirectTo} from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'

export default function Index(){
  useEffect(()=>{
    redirectTo({
      url: '/pages/home/index'
    })
  },[])
  return (
    <View>123</View>
  )
}
