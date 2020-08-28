<template>
  <!-- 超期羁押统计 -->
  <div class="custody-stat">

    <el-row :gutter="20">
      <el-col>
        <el-table
          :data="list"
          row-key="id"
        >
          <!-- <el-table-column type="index" label="序号" align="center" /> -->
          <!-- <el-table-column prop="dictionaryName" label="办案单位类型" align="center" /> -->
          <!-- <el-table-column prop="value2" label="羁押剩余七天" align="center" />
          <el-table-column prop="value1" label="羁押剩余三天" align="center" />
          <el-table-column prop="value0" label="羁押到期" align="center" />
          <el-table-column prop="value3" label="超期羁押" align="center" />
          <el-table-column v-for="v in list.columns" :key="v" :label="v" align="center" />
          <el-table-column prop="other" label="单位小记" align="center">
            <template slot-scope="scope">
              {{ scope.row.value }}
            </template>
          </el-table-column> -->
          <el-table-column type="index" label="序号" align="center" />
          <el-table-column prop="dictionaryName" label="办案单位类型" align="center" />
          <el-table-column v-for="(v,i) in tempList" :key="v.id" :label="v.dictionaryName" align="center">
            <template slot-scope="scope">
              {{ scope.row.columns[i].value }}
            </template>
          </el-table-column>
          <el-table-column prop="other" label="单位小记" align="center">
            <template slot-scope="scope">
              {{ scope.row.value }}
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

  </div>
</template>

<script>

import { superviseHandleHistoryStatistics } from '@/api/custody/overcustody/handle'

export default {
  components: {
  },
  data() {
    return {
      // 分页参数
      pageNo: 1,
      resultSize: 10,
      total: 100,
      // 分页配置项
      layout: 'prev, pager, next, jumper, sizes',

      // 日期选择器配置
      list: [],
      tempList: []
    }
  },
  created() {
    this.getSuperviseHandleHistoryStatistics()
  },
  mounted() {
  },
  methods: {

    // 分页函数
    pagination(val) {
      console.log(val)
    },
    // 获取超期羁押统计
    async getSuperviseHandleHistoryStatistics() {
      const data = await superviseHandleHistoryStatistics()
      // data.forEach(item => {
      //   item.columns.forEach((v, i) => {
      //     item['value' + i] = item.columns[i].value
      //   })
      // })
      // data.forEach(item => {
      //   if (!item.children) {
      //     delete item.children
      //   } else {
      //     item.children.forEach((v, i) => {
      //       v.columns.forEach((items, indexs) => {
      //         v['value' + indexs] = v.columns[indexs].value
      //       })
      //     })
      //   }
      // })
      // data.forEach(item => {
      //   item.columns.forEach(v => {
      //     if (!v.columns) {
      //       delete v.columns
      //     }
      //   })
      // })
      this.tempList = data[data.length - 1 ].columns
      this.list = data
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.custody-stat {
  padding: 24px;
}
</style>
