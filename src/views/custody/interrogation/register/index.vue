<template>
  <div class="app-container">
    <div class="head-container">
      <div class="left">
        <span style="font-size: 13px;">搜索：</span>
        <el-input
          v-model="query"
          style="width:200px"
          clearable
          size="small"
          placeholder="输入姓名或证件号"
          autocomplete="off"
          @change="selectQuery"
        />
      </div>
      <div class="right">
        <!-- <el-button type="primary" icon="el-icon-search" @click="selectQuery">查询</el-button> -->
        <el-button type="default" @click="reset">重置</el-button>
      </div>
    </div>
    <!--表格渲染-->
    <el-card class="flex-table">
      <div class="t-title">数据列表 ({{ page.total }}条)</div>
      <el-table ref="table" v-loading="loading" :data="tableData" style="width: 100%;">
        <el-table-column prop="personName" label="姓名" width="100">
          <template slot-scope="scope">
            {{ scope.row.personCustodyInformationDTO.personName }}
          </template>
        </el-table-column>
        <el-table-column prop="certificateNumber" label="证件号码" align="center">
          <template slot-scope="scope">
            {{ scope.row.personCustodyInformationDTO.certificateNumber }}
          </template>
        </el-table-column>
        <el-table-column prop="caseHandlingUnitId" label="监号室" align="center">
          <template slot-scope="scope">
            {{ scope.row.personCustodyInformationDTO.custodyWardName }}
          </template>
        </el-table-column>
        <el-table-column prop="caseHandlingUnitId" label="入所日期" align="center">
          <template slot-scope="scope">
            {{ scope.row.personCustodyInformationDTO.enteringInstituteDate|parseTime }}
          </template>
        </el-table-column>
        <el-table-column prop="caseHandlingUnitId" label="关押截止日期" align="center">
          <template slot-scope="scope">
            {{ scope.row.personCustodyInformationDTO.custodyDateEnd|parseTime }}
          </template>
        </el-table-column>
        <el-table-column prop="caseHandlingUnitId" label="办案环节" align="center">
          <template slot-scope="scope">
            {{ scope.row.personCustodyInformationDTO.caseSegmentName }}
          </template>
        </el-table-column>
        <el-table-column prop="caseHandlingUnitId" label="办案单位" align="center">
          <template slot-scope="scope">
            {{ scope.row.personCustodyInformationDTO.caseHandlingUnitName }}
          </template>
        </el-table-column>
        <el-table-column prop="caseHandlingUnitId" label="预约状态" align="center" width="90px">
          <template slot-scope="scope">
            <span class="tipsRound" :class="{red: scope.row.appointmentState == 1 || scope.row.appointmentState == null, green: scope.row.appointmentState !== 1 && scope.row.appointmentState != null}" />
            <span>{{ scope.row.appointmentState | status }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right" style="background-color: #F2F2F2" width="90px">
          <template slot-scope="scope">
            <el-button v-if="scope.row.appointmentState === 1 || scope.row.appointmentState == null" type="text" size="mini" @click="showDialog(scope.row, 'add')">登记</el-button>
            <el-button v-if="scope.row.appointmentState === 2" type="text" size="mini" @click="showDialog(scope.row, 'audit')">预约审核</el-button>
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
    <custom-dialog :id="activeId" :type="custodyType" :default-data="activeData" :show.sync="addFormDialog" @success="getList" />

  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import CustomDialog from '../components/CustomDialog'
import { getList } from '@/api/custody/interrogation/public'
import { parseTime } from '@/utils'
export default {
  name: 'RegisterIndex',
  components: { Pagination, CustomDialog },
  filters: {
    parseTime,
    status(val) {
      // 预约状态，1未预约，2已预约，3预约通过
      if (val === 1 || val === null) {
        return '未预约'
      } else if (val === 2) {
        return '已预约'
      } else if (val === 3) {
        return '预约通过'
      }
      return val
    }
  },
  data() {
    return {
      activeData: {},
      page: {
        pageNo: 1,
        resultSize: 10,
        total: 0
      },
      query: '',
      tableData: [],
      activeId: '',
      custodyType: 'add',
      addFormDialog: false,
      loading: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    reset() {
      this.query = ''
      this.selectQuery()
    },
    selectQuery() {
      this.page.pageNo = 1
      this.getList()
    },
    getList() {
      this.loading = false
      getList({
        pageNo: this.page.pageNo,
        resultSize: this.page.resultSize,
        key: this.query,
        registerType: 1
      }).then(res => {
        this.loading = false
        this.page.total = res.total
        this.tableData = res.records
      })
    },
    showDialog(data, type) {
      const { personCustodyInformationDTO } = data
      this.custodyType = type
      this.activeId = data.id
      this.activeData = {
        'custodyId': data.custodyId,
        'patienCertificateNumber': personCustodyInformationDTO.certificateNumber, // 病人证件号码
        'patientId': personCustodyInformationDTO.patientId, // 病人id
        'patientName': personCustodyInformationDTO.personName, // 姓名
        'personSex': personCustodyInformationDTO.personSex, // 病人性别
        'custodyWardId': personCustodyInformationDTO.custodyWardId, // 监室id
        'custodyWardName': personCustodyInformationDTO.custodyWardName // 监室名称
      }
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

.head-container {
  width: 100%;
  &::after {
    content: '';
    clear: both;
    display: block;
  }
  .left {
    float: left;
  }
  .right {
    float: right;
  }
}
.tipsRound {
  display: inline-block;
  width:6px;
  height:6px;
  margin-right: 2px;
  border-radius:4px;
  vertical-align: middle;
  &.red {
    background:rgba(234,99,77,1);
  }
  &.green {
    background:rgba(84,217,165,1);
  }
}
.tipsRound +span {
  vertical-align: middle;
}

</style>
