<template>
  <div class="app-container">
    <div class="head-container">
      <el-form
        :model="queryForm"
        :inline="true"
        style="width:100%"
        label-width="96px"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="办案环节">
              <el-select v-model="queryForm.caseSegmentId" @change="search">
                <el-option label="全部" value="" />
                <el-option v-for="item in caseSegament" :key="item.id" :label="item.dictionaryName" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="办案单位">
              <el-select v-model="queryForm.caseHandlingUnitId" @change="search">
                <el-option label="全部" value="" />
                <el-option v-for="item in works" :key="item.id" :label="item.dictionaryName" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="收押结果">
              <el-select v-model="queryForm.custodyStatus" @change="search">
                <!--:1-已收押未入监室，2-关押中，3-收押登记，4-暂缓收押，5-不予收押-->
                <el-option label="全部" value="" />
                <el-option label="已收押未入监室" value="1" />
                <el-option label="关押中" value="2" />
                <el-option label="收押登记" value="3" />
                <el-option label="暂缓收押" value="4" />
                <el-option label="不予收押" value="5" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="入所日期">
              <el-date-picker
                v-model="queryForm.date"
                type="daterange"
                align="right"
                value-format="yyyy/MM/dd"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions2"
                @change="search"
              />
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="queryForm.key"
                placeholder="输入姓名或证件号码查询"
                suffix-icon="el-icon-search"
                @change="search"
              />

              <!-- <el-button type="primary" @click="search">查询</el-button> -->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!--表格渲染-->
    <el-table
      v-loading="tableLoading"
      :data="tableData"
      header-cell-class-name="header-row"
      style="width: 100%;font-size:11px;"
    >
      <el-table-column label="姓名" prop="personName" />
      <el-table-column label="证件号" prop="certificateNumber" />
      <el-table-column label="监室号" prop="custodyWardName" />
      <el-table-column label="入所日期" prop="enteringInstituteDate">
        <div slot-scope="scope">
          {{ scope.row.enteringInstituteDate | parseTime }}
        </div>
      </el-table-column>
      <el-table-column label="关押截止日期" prop="custodyDateEnd">
        <div slot-scope="scope">
          {{ scope.row.custodyDateEnd | parseTime }}
        </div>
      </el-table-column>
      <el-table-column label="涉嫌罪名" prop="accusation" />
      <el-table-column label="办案环节 " prop="caseSegmentName" />
      <el-table-column label="办案单位" prop="caseHandlingUnitName" />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.custodyStatus !== 5" type="text" @click="editCustomtDialog(scope.row.id)">
            修改
          </el-button>
          <el-button v-else type="text">
            <span style="color: red">已拒收</span>
          </el-button>

          <el-button type="text" @click="showCustomtDialog(scope.row.id)">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      style="bottom:15px"
      :page.sync="pageNo"
      :total="total"
      :limit.sync="resultSize"
      :layout="layout"
      @pagination="paginationChange"
    />
    <!-- 修改信息表单 -->
    <custom-dialog :id="activeId" :type="activeType" :show.sync="editFormDialog" @success="getList" />
  </div>
</template>

<script>

import customDialog from '../components/CustomDialog'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { getList } from '@/api/custody/account/index.js'
import Pagination from '@/components/Pagination'
import { parseTime } from '@/utils'
import { getDictDesc } from '@/api/basic/dict'

// import { mapState } from 'vuex'

export default {
  name: 'Page',
  components: { customDialog, Pagination },
  filters: {
    parseTime
  },
  data() {
    return {
      tableLoading: false,
      activeId: '',
      activeType: '',
      queryForm: {
        caseSegmentId: '',
        custodyStatus: '',
        caseHandlingUnitId: '',
        date: [],
        key: ''
      },

      layout: 'prev, pager, next, jumper, sizes',
      pageNo: 1,
      resultSize: 10,
      total: 0,
      tableData: [],
      // 日期选择器配置项
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
      editFormDialog: false,
      species: [],
      works: [],
      caseSegament: []
    }
  },
  computed: {

  },
  created() {
    this.getList()

    getDictDesc({ id: 1597741230171 }).then(data => {
      this.species = data.dic
    })

    getDictDesc({ id: 10200821000005 }).then(data => {
      this.works = data.dic
    })
    getDictDesc({ id: 1000000000082 }).then(data => {
      this.caseSegament = data.dic
    }) // 办案环节
  },
  methods: {
    search() {
      this.pageNo = 1
      this.getList()
    },
    paginationChange(val) {
      this.pageNo = val.pageNo
      this.resultSize = val.resultSize
      this.getList()
    },
    getList() {
      this.tableloading = false
      getList(Object.assign({
        pageNo: this.pageNo,
        resultSize: this.resultSize,
        startDate: this.queryForm.date && this.queryForm.date[0] ? new Date(this.queryForm.date[0]).getTime() : '',
        endDate: this.queryForm.date && this.queryForm.date[1] ? new Date(this.queryForm.date[1]).getTime() : ''
      }, this.queryForm)).then(data => {
        this.tableLoading = false
        this.tableData = data.records
        this.total = data.total
      })
    },
    showCustomtDialog(id) {
      this.activeId = id
      this.activeType = 'detail'
      this.editFormDialog = true
    },
    editCustomtDialog(id) {
      this.activeId = id
      this.activeType = 'edit'
      this.editFormDialog = true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.title {
  span {
    margin-left: 15px;
    &::before {
      content: '';
      position: absolute;
      left: 7px;
      background-color: #0070f4;
      height: 20px;
      width: 2px;
    }
  }
}

.el-input, .el-select {
  width: 260px;
}

</style>
