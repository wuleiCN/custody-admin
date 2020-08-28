<template>
  <div v-show="permission_routers_children.length > 0" class="tabs-view">
    <el-tabs v-model="activeTab" tab-position="bottom" @tab-click="handleTabClick">
      <el-tab-pane v-for="(item) in permission_routers_children" :key="item.meta.title" :label="item.meta.title" :name="item.meta.title" />
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import path from 'path'

export default {
  components: {
  },
  data() {
    return {
      activeTab: ''
    }
  },
  computed: {
    ...mapGetters(['permission_routers_children', 'curBasePath', 'curSecondPath'])
  },
  watch: {
    permission_routers_children(val) {
      if (val.length === 0) {
        this.activeTab = ''
        return
      }
      const item = val.find(item => {
        if (this.$route.fullPath.indexOf(item.path) > -1) {
          return true
        } else {
          return false
        }
      })
      if (item) {
        this.activeTab = item.meta.title
      } else {
        this.activeTab = val[0].meta.title
      }
    },
    $route(val) {
      const item = this.permission_routers_children.find(item => {
        if (val.fullPath.indexOf(item.path) > -1) {
          return true
        } else {
          return false
        }
      })
      if (item) {
        this.activeTab = item.meta.title
      }
    }
  },
  methods: {
    handleTabClick(tab) {
      const curItem = this.permission_routers_children.find(item => {
        return item.meta.title === tab.name
      })
      this.$router.push(this.resolvePath(curItem.path))
    },
    resolvePath(routePath) {
      return path.resolve(this.curBasePath, this.curSecondPath, routePath)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.tabs-view {
    margin-top: 8px;
    height: 43px;
    border-bottom: 1px solid #E8E8E8;
    background-color: #fff;
    .el-tabs {
        height: 100%;
        margin-bottom: 0;
        margin-left: 24px;
    }
    ::v-deep .el-tabs__item {
        color: $gray;
    }
    ::v-deep .el-tabs__item.is-active {
        color: $blue;
    }
    ::v-deep .el-tabs__active-bar {
        background-color: $blue;
    }
    ::v-deep .el-tabs__nav-wrap::after {
        content: none;
    }
    ::v-deep .el-tabs--bottom .el-tabs__header.is-bottom {
        margin-top: 2px;
    }
}
</style>
