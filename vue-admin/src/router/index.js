import Vue from 'vue'
import Router from 'vue-router'

import Layout from '../view/layout/index'
Vue.use(Router)
export const constantRouter = [
  {
    path: '/login',
    name: '登陆',
    component: () => import('@/view/login')
  },{
    path: '/',
    component: Layout,
    meta: { title: '功能模块', icon: 'tree' },
    redirect: 'index',
    children: [
      {
        path: 'index',
        name: '首页',
        component: () => import('@/view/index/index'),
        meta: { title: '首页', icon: 'icon-home' },
        menu: 'article'
      },
    ]
  },
  {
    path:'/test',
    name:'测试',
    component:()=>import('@/components/test'),
    menu: 'article'
  },
  { path: '/404', component: () => import('../components/Page404.vue'), hidden: true },
]
//异步路由表
export const asyncRouterMap = [
  {
    path: '/dispatch',
    component: Layout,
    redirect: '/dispatch/map',
    meta: { title: '派单中心', icon: 'icon-biaodanguanli' },
    children: [
      {
        path: 'map',
        name: '派单地图',
       component:() =>  import('@/view/order/map'),
        meta: { title: '派单地图', icon: 'icon-map' },
        menu: 'map',
        hidden:false
      },
      {
        path: 'index',
        name: '待派单',
        component:() =>import('@/view/order/index'),
        meta: { title: '待派单', icon: 'icon-weijiedan' },
        menu: 'dispatch',
        hidden:false
      },
      {
        path: 'waiting',
        name: '待接单',
       component: () => import('@/view/order/waiting'),
        meta: { title: '待接单', icon: 'icon-zaixianjiedan2xian' },
        menu: 'dispatch',
        hidden:false
      },
      {
        path: 'start',
        name: '维修中',
       component: () => import('@/view/order/start'),
        meta: { title: '维修中', icon: 'icon-weixiushenqing' },
        menu: 'dispatch',
        hidden:false
      },
      {
        path: 'end',
        name: '已结束',
        component: () => import('@/view/order/end'),
        meta: { title: '已结束', icon: 'icon-icon' },
        menu: 'dispatch',
        hidden:false
      },
    ]
  },
  // 用户权限中心 	
  {
    path: '/user',
    component: Layout,
    redirect: '/user/',
    meta: { title: '用户权限', icon: 'icon-iconfonticon-yonghu' },
    children: [
      {
        path: '',
        name: '用户列表',
        component:() =>  import('@/view/user/user'),
        meta: { title: '用户列表', icon: 'icon-yonghuliebiao' },
        menu: 'user',
        hidden:false
      },
      {
        path: 'role',
        name: '角色管理',
        component: () => import('@/view/user/role'),
        meta: { title: '角色管理', icon: 'icon-jiaoseguanli' },
        menu: 'role',
        hidden:false
      },
      {
        path: 'permission',
        name: '权限管理',
        component: () => import('@/view/user/permission'),
        meta: { title: '权限管理', icon: 'icon-quanxianguanli' },
        menu: 'permission',
        hidden:false
      },
    ]
  },
  // 学校用户管理
  {
    path: '/teacher',
    name: '学校用户列表',
    redirect: '/teacher/',
    component: Layout,
    children:[{
      path:'',
      name:'学校用户',
      component:() =>  import('@/view/teacher/index'),
      meta: { title: '学校用户', icon: 'icon-xuexiao_jiaoshi' },
      menu: 'teacher',
      hidden:false
    }]

  },
  // 设备管理
  {
    path: '/equipment',
    component: Layout,
    redirect: '/equipment/',
    meta: { title: '设备管理', icon: 'icon-shebeiguanli' },
    children: [
      {
        path: '',
        name: '设备类型',
        component:() =>  import('@/view/equipment/type'),
        meta: { title: '设备类型', icon: 'icon-ic_configchecklist' },
        menu: 'equipment',
        hidden:false
      },
      {
        path: 'tag',
        name: '故障标签',
        component:() =>  import('@/view/equipment/tag'),
        meta: { title: '故障标签', icon: 'icon-label_icon' },
        menu: 'tag',
        hidden:false
      },
      {
        path: 'list',
        name: '设备列表',
       component:() =>  import('@/view/equipment/device'),
        meta: { title: '设备列表', icon: 'icon-icon1' },
        menu: 'device',
        hidden:false
      },
      {
        path: 'list1',
        name: '故障清单',
       // component:() =>  import('@/view/equipment/equipment'),
        meta: { title: '故障清单', icon: 'icon-guzhangleixing' },
        menu: 'equipmentList',
        hidden:false
      },
      {
        path: 'list2',
        name: '数据分析',
       // component:() =>  import('@/view/equipment/equipment'),
        meta: { title: '数据分析', icon: 'icon-icon-' },
        menu: 'equipmentList',
        hidden:false
      },
    ]
    },

  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
];






export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouter
})
