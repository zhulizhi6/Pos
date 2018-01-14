import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Pos from '@/components/common/pos'

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'pos',
      component:Pos
    }
  ]
})
