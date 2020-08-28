import { constantRouterMap } from '@/router/routers'
import Layout from '@/layout/index'
import Empty from '@/components/Empty'

const permission = {
  state: {
    originRouters: [],
    routers: [],
    addRouters: [],
    curRouteChildren: [],
    position: [],
    curBasePath: '',
    curSecondPath: ''
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = state.originRouters.concat(routers)
    },
    SET_CURROUTECHILDREN: (state, routeChildren) => {
      state.curRouteChildren = routeChildren
    },
    SET_SECONDROUTES: (state, routers) => {
      state.originRouters = constantRouterMap
      state.routers = state.originRouters.concat(routers)
    },
    SET_CURBASEPATH: (state, basePath) => {
      state.curBasePath = basePath
    },
    SET_CURSECONDPATH: (state, secondPath) => {
      state.curSecondPath = secondPath
    },
    SET_POSITION: (state, position) => {
      state.position = position
    }
  },
  actions: {
    setPosition({ commit }, position) {
      commit('SET_POSITION', position)
    },
    setSecondRoutes({ commit }, position) {
      commit('SET_SECONDROUTES', position)
    },
    GenerateRoutes({ commit }, asyncRouter) {
      commit('SET_ROUTERS', asyncRouter)
    },
    setCurRouteChildren({ commit }, routeChildren) {
      commit('SET_CURROUTECHILDREN', routeChildren)
    },
    setCurBasePath({ commit }, basePath) {
      commit('SET_CURBASEPATH', basePath)
    },
    setCurSecondPath({ commit }, secondPath) {
      commit('SET_CURSECONDPATH', secondPath)
    }
  }
}

export const filterAsyncRouter = (routers) => { // 遍历后台传来的路由字符串，转换为组件对象
  return routers.filter(router => {
    delete router.redirect
    if (router.component) {
      if (router.component === 'Layout') { // Layout组件特殊处理
        router.component = Layout
      } else if (router.component === 'Empty') {
        router.component = Empty
      } else {
        const component = router.component
        router.component = loadView(component)
      }
    }
    if (router.children && router.children.length) {
      router.children = filterAsyncRouter(router.children)
    }
    return true
  })
}

export const loadView = (view) => {
  return (resolve) => require([`@/views/${view}`], resolve)
}

export default permission
