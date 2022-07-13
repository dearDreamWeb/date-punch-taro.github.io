import { useState } from 'react'
import { View, Text, Picker } from '@tarojs/components'
import './index.less'

interface DateItem {
  value:number;
  isNowMonth: boolean;
  select?:boolean;
}

export default function Home() {
  const [date,setDate] = useState<string>('');
  const [dateArr,setDateArr] = useState<DateItem[][]>([[]]);
  
  const onDateChange = (e)=>{
    console.log(e);
    setDate(e.detail.value)
  }

  return (
    <View className='page-section'>
      <Text>日期选择器</Text>
      <View>
        <Picker value={date} mode='date' onChange={onDateChange}>
          <View className='picker'>
            当前选择：{date}
          </View>
        </Picker>
      </View>
    </View>
  )
}
