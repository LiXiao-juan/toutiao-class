// 引入dayjs
import dayjs from 'dayjs'

const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn') // 全局使用简体中文

export default dayjs
