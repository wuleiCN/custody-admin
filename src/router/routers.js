import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout/index'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    meta: { title: '登录', noCache: true },
    component: resolve => require(['@/views/login'], resolve),
    hidden: true
  },
  // {
  //   path: '/404',
  //   component: resolve => require(['@/views/features/404'], resolve),
  //   hidden: true
  // },
  // {
  //   path: '/401',
  //   component: resolve => require(['@/views/features/401'], resolve),
  //   hidden: true
  // },
  // {
  //   path: '/redirect',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: '/redirect/:path*',
  //       component: resolve => require(['@/views/features/redirect'], resolve)
  //     }
  //   ]
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [
      {
        path: 'dashboard',
        component: resolve => require(['@/views/home'], resolve),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'home', affix: true, noCache: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'false',
    children: [
      {
        path: 'center',
        component: resolve => require(['@/views/system/user/center'], resolve),
        name: '个人中心',
        meta: { title: '个人中心' }
      }
    ]
  },
  {
    path: '/basic',
    component: Layout,
    hidden: false,
    // redirect: 'noredirect',
    name: '基础信息管理岗',
    meta: {
      title: '基础信息管理岗',
      icon: 'index'
    },
    children: [
      {
        path: 'info',
        component: resolve => require(['@/views/basicInfo/user'], resolve),
        name: '基础信息管理岗',
        meta: { title: '用户管理' }
      },
      {
        path: 'role',
        component: resolve =>
          require(['@/views/basicInfo/role/index'], resolve),
        name: '基础信息管理岗',
        meta: { title: '角色管理' }
      },
      {
        path: 'dict',
        component: resolve =>
          require(['@/views/basicInfo/dict/index'], resolve),
        name: '基础信息管理岗',
        meta: { title: '字典管理' }
      },
      {
        path: 'prison',
        component: resolve =>
          require(['@/views/basicInfo/prison/index'], resolve),
        name: '基础信息管理岗',
        meta: { title: '监室管理' }
      },
      {
        path: 'journal',
        component: resolve =>
          require(['@/views/basicInfo/journal/index'], resolve),
        name: '基础信息管理岗',
        meta: { title: '日志管理' }
      }
    ]
  },
  {
    path: '/casehandle',
    component: Layout,
    hidden: false,
    // redirect: 'noredirect',
    meta: {
      title: '办案管理'
    },
    children: [
      {
        path: 'statistics',
        component: resolve => require(['@/views/custody/casehandle/statistics'], resolve),
        name: '办案统计',
        meta: { title: '办案统计' }
      },
      {
        path: 'person',
        component: resolve => require(['@/views/custody/casehandle/person'], resolve),
        name: '办案人员管理',
        meta: { title: '办案人员管理' }
      }
    ]
  },
  {
    path: '/interrogation',
    component: Layout,
    hidden: false,
    // redirect: 'noredirect',
    name: '提讯接待岗系统',
    meta: {
      title: '提讯接待岗系统'
    },
    children: [
      {
        path: 'register',
        component: resolve =>
          require(['@/views/custody/interrogation/register/index'], resolve),
        name: '提讯接待岗系统',
        meta: { title: '提讯登记' }
      },
      {
        path: 'info',
        component: resolve =>
          require(['@/views/custody/interrogation/room/index'], resolve),
        name: '提讯接待岗系统',
        meta: { title: '安排提讯室' }
      },
      {
        path: 'account',
        component: resolve =>
          require(['@/views/custody/interrogation/account/index'], resolve),
        name: '提讯接待岗系统',
        meta: { title: '提讯台账' }
      },
      {
        path: 'statistics',
        component: resolve =>
          require(['@/views/custody/interrogation/statistics/index'], resolve),
        name: '提讯接待岗系统',
        meta: { title: '提讯统计' }
      }
    ]
  },
  {
    path: '/manage',
    component: Layout,
    hidden: false,
    // redirect: 'noredirect',
    meta: {
      title: '收押管理'
    },
    children: [
      {
        path: 'account',
        component: resolve => require(['@/views/custody/manage/account'], resolve),
        name: '超期督办',
        meta: { title: '超期督办' }
      },
      {
        path: 'info',
        component: resolve => require(['@/views/custody/manage/info'], resolve),
        name: '超期羁押统计',
        meta: { title: '超期羁押统计' }
      },
      {
        path: 'register',
        component: resolve => require(['@/views/custody/manage/register'], resolve),
        name: '超期羁押统计',
        meta: { title: '超期羁押统计' }
      },
      {
        path: 'statistics',
        component: resolve => require(['@/views/custody/manage/statistics'], resolve),
        name: '超期羁押统计',
        meta: { title: '超期羁押统计' }
      }
    ]
  },
  {
    path: '/overcustody',
    component: Layout,
    hidden: false,
    // redirect: 'noredirect',
    meta: {
      title: '超期羁押管理'
    },
    children: [
      {
        path: 'handle',
        component: resolve => require(['@/views/custody/overcustody/handle'], resolve),
        name: '超期督办',
        meta: { title: '超期督办' }
      },
      {
        path: 'statistics',
        component: resolve => require(['@/views/custody/overcustody/statistics'], resolve),
        name: '超期羁押统计',
        meta: { title: '超期羁押统计' }
      }
    ]
  }
]

export default new Router({
  mode: 'hash',
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
