// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'animate.css'
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

console.log(5555, document.querySelector('.scroll'))
// document.querySelector('body').addEventListener('touchmove', function (ev) {
//   ev.preventDefault()
//   ev.stopPropagation()
// })
