<template>
  <div class="case-handle">
    <div class="header">
      <el-form
        :model="form"
        :inline="true"
        style="width:100%"
        label-width="96px"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="办案单位">
              <el-select v-model="form.caseHandlingUnitId" @change="search">
                <el-option label="全部" value="" />
                <el-option v-for="item in dict['10200821000005']" :key="item.id" :label="item.dictionaryName" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="办案环节">
              <el-select v-model="form.caseSegmentId" @change="search">
                <el-option label="全部" value="" />
                <el-option v-for="item in dict['1000000000082']" :key="item.id" :label="item.dictionaryName" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="搜索">
              <el-input
                v-model="form.key"
                placeholder="输入姓名或证件号码查询"
                suffix-icon="el-icon-search"
                @change="search"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button class="fr" type="default" @click="reset">
              重 置
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="main">
      <el-table ref="table" v-loading="tableLoading" :data="list" style="width: 100%;">
        <el-table-column prop="personName" label="姓名" align="center" />
        <el-table-column prop="certificateNumber" label="证件号码" align="center" />
        <el-table-column prop="custodyWardName" label="监室号" align="center" />
        <el-table-column prop="caseHandlingUnitName" label="办案单位" align="center" />
        <el-table-column prop="enteringInstituteDate" label="入所日期" align="center">
          <template slot-scope="slot">
            <span>{{ slot.row.enteringInstituteDate | parseTime('{y}/{m}/{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="caseHandlingUnitId" label="关押截止日期" align="center">
          <template slot-scope="slot">
            <span>{{ slot.row.custodyDateEnd | parseTime('{y}/{m}/{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="caseSegmentName" label="办案环节" align="center" />
        <el-table-column label="操作" align="center">
          <template slot-scope="slot">
            <el-button type="text" size="mini" @click="getDetail(slot.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页组件-->
    <Pagination
      :page.sync="pageNo"
      :total="total"
      :limit.sync="resultSize"
      @pagination="pagination"
    />
    <case-handle-account-dialog :show.sync="caseDialogShow" :title="dialogTitle" :prisoner="prisoner" />
  </div>
</template>

<script>
// 分页
import Pagination from '@/components/Pagination'
import {
  caseHandlerBook
} from '@/api/custody/casehandle/account'
// 表格
import { mapGetters, mapActions } from 'vuex'
import CaseHandleAccountDialog from '../components/CaseHandleAccountDialog'
export default {
  name: 'CasehandleAccout',
  components: {
    Pagination,
    CaseHandleAccountDialog
  },
  data() {
    return {
      addFormDialog: false,
      caseDialogShow: false,
      dialogTitle: '办案台账详情',
      tableLoading: false,
      prisoner: {},
      // 查询条件
      query: '',
      list: [],
      // 拒收
      form: {
        caseHandlingUnitId: '',
        caseSegmentId: '',
        key: ''
      },
      // 页码
      pageNo: 1,
      resultSize: 10,
      total: 0
    }
  },
  computed: {
    ...mapGetters(['dict'])
  },
  created() {
    const params = {
      pageNo: this.pageNo,
      resultSize: this.resultSize
    }
    this.getList(params)
  },
  mounted() {
    this.getDict()
  },
  methods: {
    ...mapActions(['getDictDesc']),
    // 根据ID获取字典明细
    getDict() {
      // 获取办案环节类型
      if (!this.dict['1000000000082']) {
        this.getDictDesc(1000000000082)
      }
      // 获取办案单位类型
      if (!this.dict['10200821000005']) {
        this.getDictDesc(10200821000005)
      }
    },
    getList(params) {
      this.tableloading = false
      caseHandlerBook(params).then(data => {
        this.tableLoading = false
        this.list = data.records
        this.total = data.total
      })
    },
    getDetail(prisoner) {
      this.prisoner = prisoner
      this.caseDialogShow = true
    },
    pagination(val) {
      const params = Object.assign(val, this.form)
      this.getList(params)
    },
    search() {
      const params = Object.assign({
        pageNo: this.pageNo,
        resultSize: this.resultSize
      }, this.form)
      this.getList(params)
    },
    reset() {
      this.pageNo = 1
      this.resultSize = 10
      this.form = {
        caseHandlingUnitId: '',
        caseHandlingItemId: '',
        key: ''
      }
      const params = {
        pageNo: this.pageNo,
        resultSize: this.resultSize
      }
      this.getList(params)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.case-handle {
  background-color: #f0f2f5 !important;
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    justify-content: flex-start;
    padding: 20px 32px 0 20px;
    background: #fff;
    .search {
      display: flex;
      align-items: center;
    }
    .btns {
      margin-left: 32px;
      .el-button {
        height: 36px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(162, 162, 162, 1);
        border: 1px solid rgba(229, 231, 234, 1);
        border-radius: 5px;
        margin-right: 16px;
      }
      .btn {
        color: #0070f4;
      }
    }
    .filter-item {
      width: 300px;
      height: 36px;
      ::v-deep .el-input__inner {
        border-radius: 16px;
        height: 36px;
      }
    }
  }
  .main {
    margin-top: 20px;
    background: #fff;
    padding: 20px;
    flex: 2 1 auto;
  }
}
</style>
