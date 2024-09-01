export interface MonthData {
  month: string
  data: string[]
}

export interface TableData {
  headers: string[]
  months: MonthData[]
}

export const sleepData: TableData = {
  headers: ['睡眠时间', '优质睡眠', '入睡时间', '心率', '深度睡眠'],
  months: [
    {
      month: '1 月',
      data: [
        // 睡眠时间
        '7:01',
        // 优质睡眠
        '5:48',
        // 入睡时间
        '2:21',
        // 心率
        '59',
        // 深度睡眠
        '2:17',
      ],
    },
    {
      month: '3 月',
      data: [
        // 睡眠时间
        '6:45',
        // 优质睡眠
        '5:36',
        // 入睡时间
        '2:06',
        // 心率
        '63',
        // 深度睡眠
        '2:10',
      ],
    },
    {
      month: '4 月',
      data: [
        // 睡眠时间
        '6:34',
        // 优质睡眠
        '5:36',
        // 入睡时间
        '2:29',
        // 心率
        '61',
        // 深度睡眠
        '2:20',
      ],
    },
    {
      month: '5 月',
      data: [
        // 睡眠时间
        '6:51',
        // 优质睡眠
        '5:44',
        // 入睡时间
        '2:20',
        // 心率
        '59',
        // 深度睡眠
        '2:19',
      ],
    },
    {
      month: '6 月',
      data: [
        // 睡眠时间
        '6:36',
        // 优质睡眠
        '5:48',
        // 入睡时间
        '2:43',
        // 心率
        '58',
        // 深度睡眠
        '2:45',
      ],
    },
    {
      month: '7 月',
      data: [
        // 睡眠时间
        '6:24',
        // 优质睡眠
        '5:48',
        // 入睡时间
        '2:29',
        // 心率
        '60',
        // 深度睡眠
        '3:04',
      ],
    },
    {
      month: '8 月',
      data: [
        // 睡眠时间
        '6:39',
        // 优质睡眠
        '5:59',
        // 入睡时间
        '3:20',
        // 心率
        '59',
        // 深度睡眠
        '3:02',
      ],
    },
  ],
}

export const dietAndExerciseData: TableData = {
  headers: [
    '高糖食物',
    '牛奶',
    '运动',
    '水果',
    '痘痘',
    '保持专注',
    '写博文',
    '阅读',
    '学日语',
    '仰卧起坐&俯卧撑',
  ],
  months: [
    {
      month: '1 月',
      data: [
        // 高糖食物
        '18',
        // 牛奶
        '3',
        // 运动
        '23',
        // 水果
        '27',
        // 痘痘
        '3',
        // 保持专注
        '24',
        // 写博文
        '5',
        // 阅读
        '22',
        // 学日语
        '27',
        // 仰卧起坐&俯卧撑
        '0',
      ],
    },
    {
      month: '3 月',
      data: [
        // 高糖食物
        '24',
        // 牛奶
        '1',
        // 运动
        '15',
        // 水果
        '25',
        // 痘痘
        '5',
        // 保持专注
        '13',
        // 写博文
        '2',
        // 阅读
        '15',
        // 学日语
        '20',
        // 仰卧起坐&俯卧撑
        '7',
      ],
    },
    {
      month: '4 月',
      data: [
        // 高糖食物
        '15',
        // 牛奶
        '3',
        // 运动
        '8',
        // 水果
        '28',
        // 痘痘
        '4',
        // 保持专注
        '27',
        // 写博文
        '1',
        // 阅读
        '23',
        // 学日语
        '25',
        // 仰卧起坐&俯卧撑
        '15',
      ],
    },
    {
      month: '5 月',
      data: [
        // 高糖食物
        '22',
        // 牛奶
        '1',
        // 运动
        '22',
        // 水果
        '26',
        // 痘痘
        '3',
        // 保持专注
        '29',
        // 写博文
        '8',
        // 阅读
        '21',
        // 学日语
        '29',
        // 仰卧起坐&俯卧撑
        '0',
      ],
    },
    {
      month: '6 月',
      data: [
        // 高糖食物
        '12',
        // 牛奶
        '4',
        // 运动
        '10',
        // 水果
        '15',
        // 痘痘
        '9',
        // 保持专注
        '27',
        // 写博文
        '1',
        // 阅读
        '22',
        // 学日语
        '28',
        // 仰卧起坐&俯卧撑
        '1',
      ],
    },
    {
      month: '7 月',
      data: [
        // 高糖食物
        '23',
        // 牛奶
        '0',
        // 运动
        '18',
        // 水果
        '22',
        // 痘痘
        '7',
        // 保持专注
        '28',
        // 写博文
        '8',
        // 阅读
        '26',
        // 学日语
        '28',
        // 仰卧起坐&俯卧撑
        '0',
      ],
    },
    {
      month: '8 月',
      data: [
        // 高糖食物
        '22',
        // 牛奶
        '1',
        // 运动
        '10',
        // 水果
        '13',
        // 痘痘
        '6',
        // 保持专注
        '28',
        // 写博文
        '4',
        // 阅读
        '25',
        // 学日语
        '22',
        // 仰卧起坐&俯卧撑
        '0',
      ],
    },
  ],
}

export const booksAndMediaData: TableData = {
  headers: ['书', '影', '音', '听'],
  months: [
    {
      month: '1 月',
      data: [
        // 书
        '1',
        // 影
        '4',
        // 音
        '3',
        // 听
        '0',
      ],
    },
    {
      month: '3 月',
      data: [
        // 书
        '1',
        // 影
        '5',
        // 音
        '2',
        // 听
        '0',
      ],
    },
    {
      month: '4 月',
      data: [
        // 书
        '1',
        // 影
        '2',
        // 音
        '2',
        // 听
        '9',
      ],
    },
    {
      month: '5 月',
      data: [
        // 书
        '1',
        // 影
        '8',
        // 音
        '3',
        // 听
        '0',
      ],
    },
    {
      month: '6 月',
      data: [
        // 书
        '4',
        // 影
        '8',
        // 音
        '1',
        // 听
        '11',
      ],
    },
    {
      month: '7 月',
      data: [
        // 书
        '2',
        // 影
        '9',
        // 音
        '2',
        // 听
        '6',
      ],
    },
    {
      month: '8 月',
      data: [
        // 书
        '1',
        // 影
        '1',
        // 音
        '3',
        // 听
        '6',
      ],
    },
  ],
}

const parseTime = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

export const calculateChanges = (months: MonthData[]): string[][] => {
  const changes: string[][] = []
  for (let i = 1; i < months.length; i++) {
    const currentMonth = months[i].data
    const previousMonth = months[i - 1].data
    const change = currentMonth.map((value, index) => {
      if (value.includes(':') && previousMonth[index].includes(':')) {
        const diff = parseTime(value) - parseTime(previousMonth[index])
        if (isNaN(diff) || diff === 0) return '-'
        return (diff > 0 ? '+' : '') + diff
      }
      const diff = parseFloat(value) - parseFloat(previousMonth[index])
      if (isNaN(diff) || diff === 0) return '-'
      return (diff > 0 ? '+' : '') + diff
    })
    changes.push(change)
  }
  return changes
}

const formatTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}:${mins.toString().padStart(2, '0')}`
}

export const calculateAverage = (months: MonthData[]): string[] => {
  const average: string[] = []
  for (let i = 0; i < months[0].data.length; i++) {
    let sum = 0
    let count = 0
    for (let j = 0; j < months.length; j++) {
      const value = months[j].data[i]
      if (value.includes(':')) {
        sum += parseTime(value)
      } else {
        const numValue = parseFloat(value)
        if (!isNaN(numValue)) {
          sum += numValue
        }
      }
      count++
    }
    const avg = sum / count
    if (months[0].data[i].includes(':')) {
      average.push(formatTime(Math.round(avg)))
    } else {
      average.push(avg.toFixed(2))
    }
  }
  return average
}
