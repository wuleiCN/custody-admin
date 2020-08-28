<template>
  <div class="custody-stat">
    <el-card style="margin-top:23px">
      <el-row :gutter="20">
        <el-col>
          <span>日期：</span>
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            align="right"
            value-format="timestamp"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2"
            style="margin-left:10px"
            @change="timeFormat"
          />

          <!-- <el-form-item class="fr">
            <el-button type="primary" @click="submit">查询</el-button>
            <el-button type="primary" @click="resetJournalForm">重置</el-button>
          </el-form-item> -->

        </el-col>
      </el-row>
    </el-card>
    <el-card style="margin-top:23px">
      <el-row :gutter="20">
        <el-col>
          <el-table
            ref="tableRef"
            v-loading="loading"
            :data="caseHandlerTotalList"
            row-key="id"
            :tree-props="{children: 'children'}"
          >
            <el-table-column type="index" label="序号" align="center" width="70" />
            <el-table-column prop="organizationTypeName" label="办案单位类型" align="center" />
            <el-table-column prop="caseLink" label="办案环节变动" align="center" />
            <el-table-column prop="timeLimit" label="羁押期限变更" align="center" />
            <el-table-column prop="disposeResult" label="处理结果" align="center" />
            <el-table-column prop="leaveStation" label="留守服刑" align="center" />
            <el-table-column prop="total" label="单位类型业务小记" align="center" />
          </el-table>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { caseHandlerTotal } from '@/api/custody/casehandle/statistics.js'
export default {
  components: {
  },
  data() {
    return {
      dateRange: '',
      // 日期选择器配置
      pickerOptions2: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      caseHandlerTotalList: [],
      loading: false
    }
  },
  mounted() {
    this.getCaseHandlerTotal()
  },
  methods: {

    // 日期选择器变更函数
    timeFormat(dateRange) {
      let params = {}
      if (dateRange) {
        params = {
          startTime: dateRange[0],
          endTime: dateRange[1]
        }
      }
      this.getCaseHandlerTotal(params)
    },

    // 获取办案统计数据
    async getCaseHandlerTotal(params) {
      this.loading = false
      const data = await caseHandlerTotal(params)
      this.loading = false
      data.forEach((item, index) => {
        item.id = new Date().getTime() + index
        item.children.map(v => {
          v.id = v.organization
        })
      })
      this.caseHandlerTotalList = data
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.custody-stat {
  // padding: 24px;
  // background-color: unset !important;
}
</style>
