<template>
  <div>
    <el-row>
      <el-col :offset="15">
        <el-pagination
          :current-page.sync="propCurrentPage"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      required: true
    }
  },
  data() {
    return {

    }
  },
  computed: {
    propCurrentPage: {
      get() {
        return this.currentPage
      },
      set(v) {
        this.$emit('handleCurrentChange', v)
      }
    }
  },
  methods: {
    handleCurrentChange(v) {
      this.$emit('handleCurrentChange', v)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 ::v-deep .btn-prev,
  ::v-deep .btn-next,
  ::v-deep .el-pager > li {
    width: 30px;
    height: 30px;
    border: 1px solid rgba(204, 204, 204, 1);
    border-radius: 3px;
    margin-right: 5px;
  }
  ::v-deep .el-pager li.active+li {
    border: 1px solid rgba(204, 204, 204, 1);
  }
  ::v-deep .el-pager li {
    &:first-child {
      margin-left: 5px;
    }
  }
</style>
