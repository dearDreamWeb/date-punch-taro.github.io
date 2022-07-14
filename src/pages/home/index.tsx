import { useState, useEffect, useRef } from 'react'
import { View, Text, Picker, Image, Button } from '@tarojs/components'
import moment from 'moment';
import './index.less'
import arrowLeft from '../../assets/images/arrow-left.png';
import arrowRight from '../../assets/images/arrow-right.png';

interface DateItem {
  value: number;
  isNowMonth: boolean;
  select?: boolean;
  isDay?: boolean;
}

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<string>(moment().format('YYYY-MM-DD'));
  const [dateArr, setDateArr] = useState<DateItem[][]>([[]]);
  const [dateTitle] = useState<string[]>(['日', '一', '二', '三', '四', '五', '六'])
  const [nowDay] = useState<string>(moment().format('YYYY-MM-DD'))

  useEffect(() => {
    // setDate(moment())

    displayDate()
  }, [selectedDate])

  const displayDate = () => {
    const { selectedYear, selectedMonth, selectedDay } = parseDate(selectedDate.replace(/-/g, '/'))
    let date = new Date(selectedYear, selectedMonth, 0);
    let days = date.getDate(); // 获取这个月有多少天
    // 选择的月份第一天
    let date1 = new Date(selectedYear, (selectedMonth - 1));
    let week = date1.getDay();  // 获取这个月的一号是星期几
    console.log(week);
    // 上个月月末的最后一天
    let date2 = new Date(selectedYear, (selectedMonth - 1), 0);
    let lastMonthDays = date2.getDate(); // 获取上个月总共有多少天
    let arr: DateItem[][] = [];
    let rawArr: DateItem[] = [];
    let dayIndex = 1;
    let nextMonthDay = 1;

    let nowYear = new Date(nowDay).getFullYear();
    let nowMonth = new Date(nowDay).getMonth() + 1;
    let nowDayDate = new Date(nowDay).getDate();

    for (let i = 0; i < 7; i++) {
      if (i < week) {
        rawArr.push({
          value: lastMonthDays - week + i + 1,
          isNowMonth: false
        })
      } else {
        rawArr.push({
          value: dayIndex,
          isNowMonth: true,
          select: selectedDay === dayIndex,
          isDay: selectedYear === nowYear && selectedMonth === nowMonth && nowDayDate === dayIndex
        })
        dayIndex++
      }
    }
    arr.push(rawArr)

    const count = Math.ceil((days - dayIndex + 1) / 7);
    for (let j = 0; j < count; j++) {
      let rawArr1: DateItem[] = [];
      for (let k = 0; k < 7; k++) {
        if (dayIndex <= days) {
          rawArr1.push({
            value: dayIndex,
            isNowMonth: true,
            select: selectedDay === dayIndex,
            isDay: selectedYear === nowYear && selectedMonth === nowMonth && nowDayDate === dayIndex
          });
          dayIndex++;
        } else {
          rawArr1.push({
            value: nextMonthDay,
            isNowMonth: false
          });
          nextMonthDay++
        }

      }
      arr.push(rawArr1)
    }
    console.log(arr)
    setDateArr(arr)
  }

  const parseDate = (targetDate) => {
    const selectedYear = new Date(targetDate).getFullYear();
    const selectedMonth = new Date(targetDate).getMonth() + 1;
    const selectedDay = new Date(targetDate).getDate();
    return { selectedYear, selectedMonth, selectedDay }
  }

  /**
   * 日期选择器改变日期
   * @param e
   */
  const onDateChange = (e) => {
    setSelectedDate(e.detail.value)
  }

  /**
   * 点击当月日期改变日期
   * @param item
   */
  const changeDate = (item) => {
    setSelectedDate(`${selectedDate.split('-')[0]}-${selectedDate.split('-')[1]}-${item.value.toString().padStart(2, '0')}`)
  }

  /**
   * 上个月或者下个月
   */
  const changeMonth = (type: 'prev' | 'next') => {
    let year = Number(selectedDate.split('-')[0]);
    let month = Number(selectedDate.split('-')[1]);
    const day = selectedDate.split('-')[2];
    if (type === 'prev') {
      if (month === 1) {
        month = 12;
        year--
      } else {
        month--
      }
    } else {
      if (month === 12) {
        month = 1;
        year++
      } else {
        month++
      }
    }
    setSelectedDate(`${year}-${month.toString().padStart(2, '0')}-${day}`)
  }

  /***
   * 回到今天
   */
  const returnDay = ()=>{
    setSelectedDate(moment().format('YYYY-MM-DD'))
  }

  return (
    <View className='contentBox'>
      <View className='header'>
        <View className='contentCenter'>
          <Image src={arrowLeft} mode='aspectFit' className='iconArrow' onClick={() => changeMonth('prev')} />
          <Picker value={selectedDate} mode='date' onChange={onDateChange}>
            <View className='picker'>
              {selectedDate}<Text className='sign'>▼</Text>
            </View>
          </Picker>
          <Image src={arrowRight} className='iconArrow' onClick={() => changeMonth('next')} />
        </View>
        <Button size='mini' className='returnDay' onClick={returnDay}>回到今天</Button>
      </View>
      <View className='dateBox'>
        {dateTitle.map((item, index) => (
          <View key={index} className='dateItemTitle'>{item}</View>
        ))}
        {dateArr.flat().map((item, index) => (
          <View key={index} className='dateItem'>
            <View onClick={() => item.isNowMonth && changeDate(item)} className={`dataItemText ${item.isNowMonth ? 'isNowMonth' : ''} ${item.isDay ? 'isDay' : ''} ${item.select ? item.isDay ? 'selectDay' : 'select' : ''}`}>{item.value}</View>
          </View>))}
      </View>

    </View>
  )
}
