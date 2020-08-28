<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="$store.state.settings.uniqueOpened"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
        @select="select"
      >
        <sidebar-item
          v-for="route in permission_routers"
          :key="route.name"
          :item="route"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/assets/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      curIndex: -1
    }
  },
  computed: {
    ...mapGetters(['permission_routers', 'sidebar', 'curMenu', 'curBasePath']),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  watch: {
    permission_routers(val) {
      // const item = val.find(item => {
      //   if (this.$route.name === item.name) {
      //     return true
      //   } else if (this.$route.matched[1].name === item.name) {
      //     return true
      //   } else {
      //     return false
      //   }
      // })
      // if (item) {
      //   this.$store.dispatch('app/setCurMenu', item.name)
      //   this.setCurMenu(item)
      // }
    }
  },
  methods: {
    setCurMenu(route) {
      // this.$store.dispatch('app/setCurMenu', route)
      if ((route.children && route.children.length === 1) || !route.children) {
        this.$store.dispatch('setCurSecondPath', '')
        this.$store.dispatch('setCurRouteChildren', [])
      } else {
        this.$store.dispatch('setCurSecondPath', route.path)
        this.$store.dispatch('setCurRouteChildren', route.children)
      }
    },
    select(index, indexPath) {
      this.$store.dispatch('setCurBasePath', indexPath[0])
    }
  }
}
</script>
