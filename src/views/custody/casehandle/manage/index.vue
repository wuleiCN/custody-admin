<template>
  <div class="case-handle">
    <div class="header">
      <div class="search">
        <span>搜索：</span>
        <el-input
          v-model="query"
          clearable
          size="small"
          placeholder="输入姓名或证件号"
          class="filter-item"
          autocomplete="off"
        />
      </div>
      <div class="reset">
        <el-button type="default" @click="query = ''">
          重 置
        </el-button>
      </div>
    </div>
    <div class="main">
      <div class="main-top">
        <div><span v-show="total > 0">数据列表 ({{ total }}条)</span></div>
        <el-button-group class="btns">
          <el-button
            v-for="(v, i) in precepts"
            :key="i"
            ref="selected"
            :class="{ btn: selected === i }"
            plain
            @click="selectedValue(i)"
          >{{ v }}</el-button>
        </el-button-group>
      </div>
      <el-table ref="table" v-loading="loading" :data="list" style="width: 100%;">
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
        <el-table-column label="操作" align="center" min-width="200">
          <template slot-scope="slot">
            <el-button v-show="selected === 0" type="text" size="mini" @click="showQrDialog(slot.row.id)">提讯解码</el-button>
            <el-button v-show="selected !== 3" type="text" size="mini" @click="showHistory(slot.row)">历史记录</el-button>
            <el-button v-show="selected === 0" type="text" size="mini" @click="changeCasehandel(slot.row)">环节变动</el-button>
            <el-button v-show="selected === 1" type="text" size="mini" @click="changeCasehandel(slot.row)">期限变更</el-button>
            <el-button v-show="selected === 2" type="text" size="mini" @click="changeCasehandel(slot.row)">处理结果</el-button>
            <el-button v-show="selected === 3" type="text" size="mini" @click="changeCasehandel(slot.row)">留所服刑</el-button>
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
    <qrcode-dialog :id="prisonId" :show.sync="qrcodeShow" />
    <case-handle-dialog :show.sync="caseDialogShow" :type="type" :title="dialogTitle" :prisoner="prisoner" :seleced="selected" />
  </div>
</template>

<script>
// 分页
import Pagination from '@/components/Pagination'
import {
  caseHandlerLink,
  detainTimeLimit,
  disposeResult,
  leaveStationSentence
} from '@/api/custody/casehandle/manage'
// 表格
import { mapGetters } from 'vuex'
import QrcodeDialog from '../components/QrcodeDialog'
import CaseHandleDialog from '../components/CaseHandleDialog'
export default {
  name: 'Page',
  components: {
    Pagination,
    QrcodeDialog,
    CaseHandleDialog
  },
  data() {
    return {
      selected: 0,
      precepts: ['环节变动', '期限变更', '处理结果', '留所服刑'],
      qrcodeShow: false,
      caseDialogShow: false,
      dialogTitle: '办案环节记录变动',
      // 弹窗类型 register 全项录入 add 登记
      type: 'change',
      loading: false,
      // 查询条件
      query: '',
      list: [],
      prisoner: {},
      prisonId: '',
      // 拒收
      form: {},
      // 页码
      pageNo: 1,
      resultSize: 10,
      total: 0,
      rejectionDialog: {
        isInputDialogVisible: false
      },
      isInputDialogVisible: false,
      registerDialog: {
        isRegisterDialogVisible: false,
        isRegisterAccompliceVisible: false,
        selected: false
      }
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  created() {
    this.selectedValue(0)
  },
  mounted() {
  },
  methods: {
    // 分页
    pagination() {
      this.getCustodyInformationList(this.page)
      console.log(this.page)
    },
    // 确认不予收戒
    dialogVisibleInputEnter() {
    },
    // 转入信息，全项录入，不予收戒
    selectedValue(i) {
      this.selected = i
      const params = {
        pageNo: this.pageNo,
        resultSize: this.resultSize,
        key: this.query
      }
      this.loading = false
      if (i === 0) {
        caseHandlerLink(params).then(data => {
          this.loading = false
          this.list = data.records
          this.total = data.total
        }).catch(err => {
          console.log(err)
          this.loading = false
        })
      } else if (i === 1) {
        detainTimeLimit(params).then(data => {
          this.loading = false
          this.list = data.records
          this.total = data.total
        }).catch(err => {
          console.log(err)
          this.loading = false
        })
      } else if (i === 2) {
        disposeResult(params).then(data => {
          this.loading = false
          this.list = data.records
          this.total = data.total
        }).catch(err => {
          console.log(err)
          this.loading = false
        })
      } else {
        leaveStationSentence(params).then(data => {
          this.loading = false
          this.list = data.records
          this.total = data.total
        }).catch(err => {
          console.log(err)
          this.loading = false
        })
      }
    },
    showQrDialog (id) {
      this.prisonId = id
      this.qrcodeShow = true
    },
    showHistory (prisoner) {
      if (this.selected === 0) {
        this.dialogTitle = '办案环节变动历史记录'
      } else if (this.selected === 1) {
        this.dialogTitle = '期限变更历史记录'
      } else if (this.selected === 2) {
        this.dialogTitle = '处理结果变动历史记录'
      }
      this.type = 'detail'
      this.prisoner = prisoner
      this.caseDialogShow = true
    },
    changeCasehandel(prisoner) {
      if (this.selected === 0) {
        this.dialogTitle = '办案环节变动'
      } else if (this.selected === 3) {
        this.dialogTitle = '留所服刑登记'
      } else if (this.selected === 1) {
        this.dialogTitle = '期限变更登记'
      } else {
        this.dialogTitle = '处理结果登记'
      }
      this.type = 'add'
      this.prisoner = prisoner
      this.caseDialogShow = true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
.case-handle {
  background-color: #f0f2f5 !important;
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    justify-content: space-between;
    padding: 20px 32px 20px 20px;
    background: #fff;
    .search {
      display: flex;
      align-items: center;
    }
    .filter-item {
      width: 300px;
      height: 36px;
      ::v-deep .el-input__inner {
        height: 36px;
      }
    }
    .reset {
      button {
        font-size: 16px;
      }
    }
  }
  .main {
    margin-top: 20px;
    background: #fff;
    padding: 20px;
    flex: 2 1 auto;
    .main-top {
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      .btns {
        .el-button {
          height: 36px;
          font-size: 14px;
          color: #000000;
          border-color:#D9D9D9;
          border-radius: 0;
        }
        ::v-deep .el-button+.el-button {
          margin-left: 0;
        }
        .btn {
          color: $blue;
        }
      }
    }
  }
}
</style>
