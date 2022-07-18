import { Component, useEffect, useState } from 'react'
import { navigateTo, redirectTo, showToast,setStorageSync } from '@tarojs/taro'
import { View, Text, Input, Button, Image } from '@tarojs/components'
import { register, login } from '../../api/user'
import './index.less'
import logo from '../../assets/images/logo.png'

export default function Index() {
  const [loginType, setLoginType] = useState<'login' | 'register'>('login')
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')

  useEffect(() => {

    setAccount('')
    setPassword('')
    setRePassword('')
  }, [loginType])

  const validate = () => {
    let isNoPass = false;
    const phoneReg = /^1\d{10}$/;
    if (!account || !password) {
      isNoPass = true;
      showToast({ title: '请输入完整表单', icon: 'none' })
      return isNoPass;
    }

    if (!phoneReg.test(account)) {
      isNoPass = true;
      showToast({ title: '手机号错误', icon: 'none' })
      return isNoPass;
    }

    if (loginType === 'register') {
      if (rePassword !== password) {
        isNoPass = true;
        showToast({ title: '确认密码和密码不一致', icon: 'none' })
        return isNoPass;
      }
    }
    return isNoPass;
  }

  const loginHandler = async () => {
    const isNoPass = validate();
    if (isNoPass) {
      return;
    }
    const res = await login({
      phoneNumber: account,
      password
    })
    if (!res.success) {
      showToast({ title: res.msg, icon: 'error' })
      return;
    }
    showToast({ title: '登录成功', icon: 'success' })
    setStorageSync('token',res.data.token)
    redirectTo({
      url: '/pages/home/index'
    })
  }

  /**
   * 注册
   */
  const registerHandler = async () => {
    const isNoPass = validate();
    if (isNoPass) {
      return;
    }
    const res = await register({
      phoneNumber: account,
      password
    })
    if (!res.success) {
      showToast({ title: res.msg, icon: 'error' })
      return;
    }
    showToast({ title: '注册成功', icon: 'success' })
    setLoginType('login')
  }

  return (
    <View className='loginBox'>
      <View className='loginMain'>
        <Image className='logoImage' src={logo} />
        {
          loginType === 'login' ? (
            <>
              <Input className='diyInput' type='text' placeholder='请输入手机号' value={account} onInput={(e) => setAccount(e.detail.value)} />
              <Input className='diyInput' type='safe-password' password placeholder='请输入密码' value={password} onInput={(e) => setPassword(e.detail.value)} />
              <Button className='loginBtn' type='primary' onClick={loginHandler}>登录</Button>
              <View className='registerBox'>
                <Text className='registerText' onClick={() => setLoginType('register')}>没有账号？立即注册</Text>
              </View>
            </>) : (
            <>
              <Input className='diyInput' type='text' placeholder='请输入手机号' value={account} onInput={(e) => setAccount(e.detail.value)} />
              <Input className='diyInput' type='safe-password' password placeholder='请输入密码' value={password} onInput={(e) => setPassword(e.detail.value)} />
              <Input className='diyInput' type='safe-password' password placeholder='请输入确认密码' value={rePassword} onInput={(e) => setRePassword(e.detail.value)} />
              <Button className='registerBtn' type='primary' onClick={registerHandler}>注册</Button>
              <View className='registerBox'>
                <Text className='registerText' onClick={() => setLoginType('login')}>已有账号？去登录</Text>
              </View>
            </>
          )
        }
      </View>

    </View>
  )
}
