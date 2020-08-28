<template>
  <div class="custody-info">
    <el-row :gutter="20">
      <el-col>
        <el-form :inline="true" :model="form">
          <el-form-item label="入所时间">
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
          <el-form-item>
            <el-input v-model="form.search" suffix-icon="el-icon-search" placeholder="请输入姓名/证件号码" @change="search" />
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
          <el-table-column prop="index" label="姓名" align="center" />
          <el-table-column prop="caseSegment" label="证件号码" align="center" />
          <el-table-column prop="policeOffice" label="病室号" align="center" />
          <el-table-column prop="procuratorateOffice" label="强戒开始日期" align="center" />
          <el-table-column prop="courtOffice" label="强戒结束日期" align="center" />
          <el-table-column label="操作" width="300" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="showFaceDialog(scope.row)">
                录入人脸
              </el-button>
              <el-button type="text" size="mini" @click="showFingerprintDialog(scope.row)">
                录入指纹
              </el-button>
            </template>
          </el-table-column>
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
    <el-dialog
      title="录入指纹"
      :visible.sync="fingerprintDialog"
      custom-class="fingerprint-dialog"
      width="600px"
      @close="fingerprintDialog = false"
    >
      <el-row style="margin-top:15px">
        <el-col v-for="(item, index) in fingerprintList" :key="index" :span="6" :offset="2">
          <el-row>
            <div class="fingerprint-bg" />
          </el-row>
          <el-row class="fingerprint-desc">
            <span>请按第{{ index + 1 }}次</span>
          </el-row>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="fingerprintDialog = false">
          重按
        </el-button>
        <el-button type="primary" @click="fingerprintDialog = false">
          确定
        </el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="录入人脸"
      :visible.sync="faceDialog"
      custom-class="face-dialog"
      width="600px"
      @close="faceDialog = false"
    >
      <el-row style="margin-top:15px">
        <el-col :span="24">
          <div class="face-bg">
            <i class="el-icon-plus" />
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="faceDialog = false">
          重拍
        </el-button>
        <el-button type="primary" @click="faceDialog = false">
          确定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCustodyStatistics } from '@/api/custody/manage/statistics.js'
import Pagination from '@/components/Pagination'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      form: {
        startDate: '',
        endDate: ''
      },
      dateRange: '',
      layout: 'prev, pager, next, jumper, sizes',
      pageNo: 1,
      resultSize: 10,
      total: 0,
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
      fingerprintDialog: false,
      fingerprintList: ['1', '2', '3'],
      faceDialog: false
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
    timeFormat(dateRange) {
      if (dateRange && dateRange.length > 0) {
        this.form.startDate = dateRange[0]
        this.form.endDate = dateRange[1]
      } else {
        this.form.startDate = ''
        this.form.endDate = ''
      }
      this.getCustodyStatistics(this.form)
    },
    showFaceDialog(data) {
      console.log(data)
    },
    showFingerprintDialog(data) {
      console.log(data)
    },
    search(val) {
      console.log(val)
    },
    pagination(val) {
      const params = Object.assign(val, this.form)
      this.getJourmalList(params)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.custody-info {
  padding: 24px;
  background-color: #fff;
}
.fingerprint-dialog {
  .fingerprint-bg {
    width: 100px;
    height: 100px;
    border:1px solid #e4e4e4;
    border-radius:50%;
    background: url('~@/assets/images/fingerprint.png') no-repeat center;
  }
  .fingerprint-desc {
    margin-top: 33px;
    span {
      margin-left: 18px;
    }
  }
}
.face-dialog {
  .face-bg {
    width: 260px;
    height: 260px;
    margin: 0 auto;
    border:1px solid #C9CFDE;
    border-radius:5px;
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      font-size: 40px;
      color: #E2E6EF;
    }
  }
}
</style>
