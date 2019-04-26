// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// vuex
import store from './store/index'
// request 
import request from './utils/request'
// element-ui
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// animate.css
import './assets/animate.min.css'
// babel-polyfill 兼容ie11
import 'babel-polyfill'
// v-charts
import Vcharts from 'v-charts'
Vue.use(Vcharts)

// 用户权限
import './permission'
// 高德地图加载
// let createMap=()=>{
//   return new Promise((resolve,reject)=>{
//     let script = document.createElement('script');
//     script.type="text/javascript";
//     script.src="https://webapi.amap.com/maps?v=1.4.13&key=a206b32562c37e92a3171b701695a4e8&plugin=AMap.DistrictSearch";
//     document.body.appendChild(script);
//     if (script.nodeName === 'SCRIPT') {
//       resolve()
//     } else {
//       reject(new Error('Could not script image at ' + script.src))
//     }
//   })
// }
// createMap().then(res=>{
//   console.log('读取高德地图成功')
// }).catch(err=>{
//   console.log(err)
// })
import service from './utils/service'

// websocket 
// import VueSocketio from 'vue-socket.io';
// import socketio from 'socket.io-client';

// Vue.use(VueSocketio, socketio(service.api));

Vue.config.productionTip = false
Vue.prototype.$http = request
Vue.use(elementUi)
// element ui 公共方法
import './utils/element'

// websocket 

import {hasPermission} from './utils/element'
Vue.prototype.hasPer = hasPermission;
// 全局混入一些方法,有一定的风险,慎重使用



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})