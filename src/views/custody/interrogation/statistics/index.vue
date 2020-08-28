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
import { getCustodyStatistics } from '@/api/custody/interrogation/statistics.js'

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
      list: [],
      tempList: []
    }
  },
  mounted() {
    this.getCustodyStatistics(this.form)
  },
  methods: {
    getCustodyStatistics(params) {
      getCustodyStatistics(params).then(data => {
        this.tempList = data[data.length - 1 ].columns
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
