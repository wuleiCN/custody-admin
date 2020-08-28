<!--分页-->
<template>
  <el-pagination
    :current-page.sync="page.count"
    :page-size="page.size"
    layout="prev, pager, next, jumper"
    :total="page.total"
    style="margin: 10px 70px 0 0"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>
<script>
// import { pagination } from '@crud/crud'
export default {
  // mixins: [pagination()]
  data() {
    return {
      page: {
        size: 100,
        count: 1,
        total: 4000
      }
    }
  },
  methods: {
    handleSizeChange() {
      console.log(123)
    },
    handleCurrentChange() {
      console.log(321)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-pagination {
  display: flex;
  justify-content: flex-end;
  ::v-deep .btn-prev,
  ::v-deep .btn-next,
  ::v-deep .el-pager > li {
    width: 30px;
    height: 30px;
    border: 1px solid rgba(204, 204, 204, 1);
    border-radius: 3px;
    margin-right: 5px;
  }
}
</style>
