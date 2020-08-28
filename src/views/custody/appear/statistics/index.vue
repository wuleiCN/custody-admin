<template>
  <div class="custody-stat">
    <el-row :gutter="20">
      <el-col>
        <el-form :inline="true" :model="form">
          <el-form-item label="时间">
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
              @change="timeFormat"
            />
          </el-form-item>
          <!-- <el-form-item class="fr">
            <el-button type="primary" @click="submit">查询</el-button>
            <el-button type="primary" @click="resetJournalForm">重置</el-button>
          </el-form-item> -->
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col>
        <el-table :data="list">
          <el-table-column type="index" label="序号" align="center" />
          <el-table-column prop="caseSegment" label="办案环节" align="center" />
          <el-table-column prop="policeOffice" label="公安机关" align="center" />
          <el-table-column prop="procuratorateOffice" label="检察院" align="center" />
          <el-table-column prop="courtOffice" label="法院" align="center" />
          <el-table-column prop="securityOffice" label="安全机关" align="center" />
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getCustodyStatistics } from '@/api/custody/manage/statistics.js'

export default {
  components: {
  },
  data() {
    return {
      form: {
        startDate: '',
        endDate: ''
      },
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
      list: []
    }
  },
  mounted() {
    this.getCustodyStatistics(this.form)
  },
  methods: {
    getCustodyStatistics(params) {
      getCustodyStatistics(params).then(data => {
        this.list = data
      })
    },
    editUserDialog(id) {
      this.isShowUserDialog = true
    },
    timeFormat(dateRange) {
      if (dateRange && dateRange.length > 0) {
        this.form.startDate = dateRange[0]
        this.form.endDate = dateRange[1]
      } else {
        this.form.startDate = ''
        this.form.endDate = ''
      }
      this.getCustodyStatistics(this.form)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.custody-stat {
  padding: 24px;
}
</style>
