import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Questionnaire',
      component: resolve => require(['@/views/questionnaire'], resolve)
    },
    {
      path: '/result',
      name: 'result',
      component: resolve => require(['@/views/result'], resolve)
    }
  ]
})
