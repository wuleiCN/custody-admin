<template>
  <div class="top-title">
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="title dark bold">
      <!-- 大标题 -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import path from 'path'
import breadcrumb from '@/components/Breadcrumb'

export default {
  components: {
    breadcrumb
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
.top-title {
  .title {
    margin-left: 32px;
    font-size: 20px;
  }
}
</style>
