<template>
  <div class="journal">
    <el-row :gutter="20" :xs="15" :sm="18" :md="19" :lg="20" :xl="20">
      <el-col>
        <el-form :inline="true" :model="journalForm">
          <el-form-item label="警号">
            <el-input v-model="journalForm.policeNo" placeholder="根据账号(警号)查询" />
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
              v-model="dateRange"
              type="datetimerange"
              align="right"
              value-format="timestamp"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2"
            />
          </el-form-item>

          <el-form-item label="执行结果">
            <el-select v-model="journalForm.operationResult">
              <el-option label="全部" value="" />
              <el-option v-for="item in journalDict" :key="item.code" :label="item.codeInfo" :value="item.code" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">查询</el-button>
            <!-- <el-button type="primary" @click="resetJournalForm">重置</el-button> -->
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="20" :xs="15" :sm="18" :md="19" :lg="20" :xl="20">
      <el-col>
        <el-table :data="journalList">
          <el-table-column prop="policeNo" label="警号" align="center" />
          <el-table-column prop="createdBy" label="姓名" align="center" />
          <el-table-column prop="createdTime" label="操作时间" align="center">
            <template slot-scope="scope">
              {{ scope.row.createdTime | dateformat }}
            </template>
          </el-table-column>
          <el-table-column prop="ipAddress" label="ip地址" align="center" />
          <el-table-column prop="serverName" label="操作实例" align="center" />
          <el-table-column prop="operationTypeName" label="操作类型" align="center" />
          <el-table-column prop="operationResult" label="执行结果" align="center" />
        </el-table>
      </el-col>
    </el-row>
    <pagination
      :page.sync="pageNo"
      :total="total"
      :limit.sync="resultSize"
      :layout="layout"
      @pagination="pagination"
    />
  </div>
</template>

<script>
import { getJourmalList, getJourmalCode } from '@/api/basic/jourmal.js'
import Pagination from '@/components/Pagination'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      journalForm: {
        policeNo: '',
        operationResult: '',
        startTime: '',
        endTime: ''
      },
      journalDict: [],
      dateRange: '',
      layout: 'prev, pager, next, jumper, sizes',
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
      journalList: [],
      pageNo: 1,
      resultSize: 10,
      total: 0
    }
  },
  watch: {
    dateRange: {
      handler(val) {
        this.timeFormat(val)
      },
      deep: true
    }
  },
  mounted() {
    getJourmalCode().then(data => {
      this.journalDict = data
    })
    getJourmalList({
      pageNo: this.pageNo,
      resultSize: this.resultSize
    }).then(data => {
      this.total = data.total
      this.journalList = data.records
    })
  },
  methods: {
    submit() {
      const params = Object.assign({
        pageNo: this.pageNo,
        resultSize: this.resultSize
      }, this.journalForm)
      this.getJourmalList(params)
    },
    getJourmalList(params) {
      getJourmalList(params).then(data => {
        this.total = data.total
        this.journalList = data.records
      })
    },
    timeFormat(dateRange) {
      if (dateRange.length > 0) {
        this.journalForm.startTime = dateRange[0]
        this.journalForm.endTime = dateRange[1]
      } else {
        this.journalForm.startTime = ''
        this.journalForm.endTime = ''
      }
    },
    resetJournalForm() {
      this.journalForm = {
        id: '',
        date: '',
        result: ''
      }
    },
    pagination(val) {
      const params = Object.assign(val, this.journalForm)
      this.getJourmalList(params)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.journal {
  padding: 24px;
  background-color: #fff;
}
</style>
