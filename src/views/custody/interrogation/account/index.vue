<template>
  <div class="app-container">
    <div class="head-container">
      <div class="filter-item">
        <el-select v-model="appointmentType" placeholder="请选择预约方式">
          <el-option label="全部" value="" />
          <el-option label="窗口" value="1" />
          <el-option label="自助终端" value="2" />
          <el-option label="微信" value="3" />
        </el-select>
        <el-select v-model="caseHandlingUnitId" placeholder="请选择办案单位">
          <el-option label="全部" value="" />
          <el-option
            v-for="item in dict['10200821000005'].dic"
            :key="item.id"
            :label="item.dictionaryName"
            :value="item.id"
          />
        </el-select>
        <el-date-picker
          v-model="times"
          type="daterange"
          value-format="timestamp"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
        <el-input
          v-model="query"
          style="width:200px"
          clearable
          size="small"
          placeholder="输入姓名或证件号"
          autocomplete="off"
        />
        <el-button type="primary" icon="el-icon-search" @click="selectQuery">查询</el-button>
      </div>
    </div>
    <!--表格渲染-->
    <el-card class="flex-table">
      <div class="t-title">数据列表 ({{ page.total }}条)</div>
      <el-table ref="table" v-loading="loading" :data="tableData" style="width: 100%;">
        <el-table-column prop="patientName" label="姓名" width="100" />
        <el-table-column prop="patienCertificateNumber" label="证件号码" align="center" />
        <el-table-column prop="custodyWardName" label="监室" align="center" />
        <el-table-column prop="" label="预约方式" align="center">
          <template slot-scope="scope">
            {{ scope.row.appointmentType | appointmentType }}
          </template>
        </el-table-column>
        <el-table-column label="提讯日期" align="center">
          <template slot-scope="scope">
            {{ scope.row.registerTime | parseTime }}
          </template>
        </el-table-column>
        <el-table-column prop="arraignOffice" label="提讯室" align="center" />
        <el-table-column prop="caseHandlingUnitName" label="办案单位" align="center" />
        <el-table-column label="操作" align="center" fixed="right" style="background-color: #F2F2F2" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="showDialog(scope.row.id)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--分页组件-->
    <Pagination
      style="bottom: 15px"
      :class="{'limit': page.resultSize > 10}"
      :page.sync="page.pageNo"
      :total="page.total"
      :limit.sync="page.resultSize"
      @pagination="getList"
    />
    <custom-dialog :id="activeId" type="detail" :show.sync="addFormDialog" />

  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import CustomDialog from '../components/CustomDialog'
import { getList } from '@/api/custody/interrogation/accout'
import { parseTime } from '@/utils'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AccountIndex',
  components: { Pagination, CustomDialog },
  filters: {
    parseTime,
    appointmentType(val) {
      if (val === 1) {
        return '窗口'
      } else if (val === 2) {
        return '自助终端'
      } else if (val === 3) {
        return '微信'
      }
      return ''
    }
  },
  computed: {
    ...mapGetters(['dict'])
  },
  // eslint-disable-next-line vue/order-in-components
  data() {
    return {
      activeId: '',
      page: {
        pageNo: 1,
        resultSize: 10,
        total: 0
      },
      times: [],
      query: '',
      appointmentType: '',
      caseHandlingUnitId: '',
      tableData: [],
      custodyType: 'add',
      addFormDialog: false,
      loading: false
    }
  },
  mounted() {
    if (!this.dict['10200821000005']) {
      this.getDictDesc(10200821000005)
    }
    this.selectQuery()
  },
  methods: {
    ...mapActions(['getDictDesc']),
    selectQuery() {
      this.page.pageNo = 1
      this.getList()
    },
    getList() {
      this.loading = false
      getList({
        pageNo: this.page.pageNo,
        resultSize: this.page.resultSize,
        caseHandlingUnitId: this.caseHandlingUnitId,
        appointmentType: this.appointmentType,
        arraignDateStart: this.times[0] ? this.times[0] : '',
        arraignDateEnd: this.times[1] ? this.times[1] : '',
        key: this.query,
        registerType: 1
      }).then(res => {
        this.loading = false
        this.page.total = res.total
        this.tableData = res.records
      })
    },
    showDialog(id) {
      this.activeId = id
      this.addFormDialog = true
    }
  }
}
</script>

<style scoped lang="scss">
.t-title {
  padding: 0 0 18px 0;
  font-size: 16px;
}
</style>
