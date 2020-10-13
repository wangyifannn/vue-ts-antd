import Vue from 'vue'

import 'normalize.css'
// import ElementUI from 'element-ui'
import SvgIcon from 'vue-svgicon'

// import '@/styles/element-variables.scss'
import '@/styles/index.scss'

import Antd from 'ant-design-vue';
import { message } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import '@/icons/components'
import '@/permission'
import '@/utils/error-log'
import '@/pwa/register-service-worker'
// import * as directives from '@/directives'
import * as filters from '@/filters'
// Vue.use(ElementUI)
Vue.use(Antd)
// Vue.use(Scrollbar)

Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

// Register global directives
// Object.keys(directives).forEach(key => {
//   Vue.directive(key, (directives as { [key: string ]: DirectiveOptions })[key])
// })

// Register global filter functions
Object.keys(filters).forEach(key => {
  Vue.filter(key, (filters as { [key: string ]: Function })[key])
})

Vue.config.productionTip = false
Vue.prototype.$message = message;
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
