<template>
  <div :class="{ 'has-logo': showLogo }">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- <div @click="toggle()">
        <svg-icon class-name="menu-icon" icon-class="menu" />
      </div> -->
      <!-- <div class="sidebar-title">戒毒所</div> -->
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
        <el-menu-item
          v-for="(item, index) in permission_position"
          :key="item.path"
          :index="index.toString()"
          :class="{ 'job-sidebar-active': index == curIndex }"
        >
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import variables from '@/assets/styles/variables.scss'

export default {
  data() {
    return {
      curIndex: 0
    }
  },
  computed: {
    ...mapGetters(['permission_position']),
    activeMenu() {
      //   const route = this.$route
      //   const { meta, path } = route
      //   // if set path, the sidebar will highlight the path you set
      //   if (meta.activeMenu) {
      //     return meta.activeMenu
      //   }
      //   return path
      return null
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    }
  },
  watch: {
    $route(val) {
      this.changeActiveMenu(val)
    }
  },
  mounted() {
    this.changeActiveMenu(this.$route)
  },
  methods: {
    select(index, indexPath) {
      this.curIndex = index
      this.$store.dispatch('setSecondRoutes', this.permission_position[index].children)
      this.$store.dispatch('setCurBasePath', this.permission_position[index].path)
    },
    changeActiveMenu(val) {
      const index = this.permission_position.findIndex(item => {
        if (val.fullPath.indexOf(item.path) > -1) {
          return true
        } else {
          return false
        }
      })
      if (index > -1) {
        this.curIndex = index
        this.$store.dispatch('setSecondRoutes', this.permission_position[index].children)
        this.$store.dispatch('setCurBasePath', this.permission_position[index].path)
      } else if (val.name === 'Dashboard') {
        this.$store.dispatch('app/setCurMenu', 'Dashboard')
        this.$store.dispatch('setCurRouteChildren', [])
      }
    },
    toggle() {
      // this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>
