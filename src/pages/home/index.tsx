import { useState, useEffect, useRef } from 'react'
import { View, Text, Picker } from '@tarojs/components'
import moment from 'moment';
import './index.less'

interface DateItem {
  value: number;
  isNowMonth: boolean;
  select?: boolean;
}

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<string>(moment().format('YYYY-MM-DD'));
  const [dateArr, setDateArr] = useState<DateItem[][]>([[]]);

  useEffect(() => {
    // setDate(moment())

    displayDate()
  }, [])

  const displayDate = () => {
    const { selectedYear, selectedMonth, selectedDay } = parseDate(selectedDate)
    let date = new Date(selectedYear, selectedMonth, 0);
    let days = date.getDate(); // 获取这个月有多少天
    // 选择的月份第一天
    let date1 = new Date(selectedYear, (selectedMonth - 1));
    let week = date1.getDay();  // 获取这个月的一号是星期几
    console.log(week);
    // 上个月月末的最后一天
    let date2 = new Date(selectedYear, (selectedMonth - 1), 0);
    let lastMonthDays = date2.getDate(); // 获取上个月总共有多少天
    let arr: number[][] = [];
    let rawArr: number[] = [];
    let dayIndex = 1;
    for (let i = 0; i < 7; i++) {
      if (i < week) {
        rawArr.push(lastMonthDays - week + i + 1)
      } else {
        rawArr.push(dayIndex)
        dayIndex++
      }
    }
    arr.push(rawArr)
    console.log(days - dayIndex);
    const count = Math.ceil((days - dayIndex+1) / 7);
    for (let j = 0; j < count; j++) {
      let rawArr1: number[] = [];
      for (let k = 0; k < 7; k++) {
        rawArr1.push(dayIndex);
        dayIndex++;
      }
      arr.push(rawArr1)
    }
    console.log(arr)

  }

  const parseDate = (targetDate) => {
    const selectedYear = new Date(targetDate).getFullYear();
    const selectedMonth = new Date(targetDate).getMonth() + 1;
    const selectedDay = new Date(targetDate).getDate();
    return { selectedYear, selectedMonth, selectedDay }
  }

  const onDateChange = (e) => {
    console.log(e);
    setSelectedDate(e.detail.value)
  }

  return (
    <View className='page-section'>
      <Text>日期选择器</Text>
      <View>
        <Picker value={selectedDate} mode='date' onChange={onDateChange}>
          <View className='picker'>
            当前选择：{selectedDate}
          </View>
        </Picker>
      </View>
    </View>
  )
}
