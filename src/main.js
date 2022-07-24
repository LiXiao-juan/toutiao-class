import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/fonts/iconfont.css'
import Vant from 'vant'
import 'vant/lib/index.css'
// import moment from 'moment'
// 引入rem适配
import 'amfe-flexible/index.min.js'
import '@/utils/dayjs'

// console.log(dayjs().format('YYYY/MM/DD'))
Vue.use(Vant)
// Vue.use(moment)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
