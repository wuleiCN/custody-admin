<template>
  <!-- 超期羁押督办 -->
  <div class="overcustody-handle">
    <el-card>

      <el-row class="header-row header-row-top" style="padding-bottom:10px">
        <el-col :span="5">
          <span>办案单位:</span>
          <el-select v-model="CaseUnitTypeId" clearable class="header-top-input" placeholder="请选择办案单位类型">
            <el-option v-for="v in dict['1000000000006']" :key="v.id" :label="v.dictionaryName" :value="v.id" />
          </el-select>
        </el-col>

        <el-col :span="5">
          <el-select v-model="queryHandleHistoryForm.caseHandlingUnitTypeId" clearable class="header-top-input" placeholder="请选择办案单位" @change="queryCaseHanleHistoryChange">
            <el-option v-if="!CaseUnitTypeId" label="请先选择办案单位类型" value="请先选择办案单位类型" disabled />
            <el-option v-for="v in caseUnitHandleList" :key="v.id" :label="v.dictionaryName" :value="v.id" />
          </el-select>
        </el-col>
        <el-col :span="7">
          <span>羁押到期截止</span>
          <el-select v-model="queryHandleHistoryForm.expirationNum" clearable class="header-top-input" @change="queryCaseHanleHistoryChange">
            <el-option label="当天" :value="0" />
            <el-option label="三天" :value="3" />
            <el-option label="一周" :value="7" />
            <el-option label="羁押超期" :value="-1" />
          </el-select>
        </el-col>
        <el-col :span="1" :offset="6">
          <el-button v-if="!isShowExtendRow" type="text" @click="isShowExtendRow = true">
            展开
            <i class="el-icon-arrow-down" />
          </el-button>
          <el-button v-else type="text" @click="isShowExtendRow = false">
            隐藏
            <i class="el-icon-arrow-up" />
          </el-button>
        </el-col>
      </el-row>
      <el-collapse-transition>
        <el-row v-if="isShowExtendRow" class="header-row">
          <el-col :span="5">
            <span>督办次数:</span>
            <el-select v-model="queryHandleHistoryForm.supervisionNum" clearable class="header-top-input" placeholder="请选择督办次数" @change="queryCaseHanleHistoryChange">
              <el-option label="零次" :value="0" />
              <el-option label="一次" :value="1" />
              <el-option label="两次" :value="2" />
              <el-option label="三次及以上" :value="3" />
            </el-select>
          </el-col>
        </el-row>
      </el-collapse-transition>
    </el-card>

    <el-card style="margin-top:23px">
      <el-row class="header-row-top">
        <el-col>
          <div class="table-hd">
            <span>数据列表 {{ total }}条</span>
            <div>
              <el-button @click="handleSettingDialog = true">督办设置</el-button>
              <el-button type="primary" @click="RootHanle">一键督办</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="header-row-top">
        <el-col>
          <el-table
            v-loading="loading"
            :data="HandleHistoryList"
            style="width: 100%"
            @select="select"
            @select-all="selectAll"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column label="姓名" prop="personName" />
            <el-table-column label="监室号" prop="custodyWardName" />
            <el-table-column label="证件号码" prop="certificateNumber" />
            <el-table-column label="入所日期" prop="enteringInstituteDate" sortable>
              <template slot-scope="scope">
                {{ scope.row.enteringInstituteDate | parseTime('{y}-{m}-{d}') }}
              </template>
            </el-table-column>
            <el-table-column label="关押截止日期" prop="custodyDateEnd" sortable>
              <template slot-scope="scope">
                {{ scope.row.custodyDateEnd | parseTime('{y}-{m}-{d}') }}
              </template>
            </el-table-column>
            <el-table-column label="办案环节" prop="caseSegmentName" />
            <el-table-column label="办案单位" prop="caseHandlingUnitTypeName" />
            <el-table-column label="督办次数" prop="supervisionNum" />
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="handleHistoryDialog(scope.row)">督办历史</el-button>
                <el-button type="text" @click="addHandle(scope.row)">督办</el-button>
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
      <!-- 督办历史弹窗 -->
      <el-dialog :visible.sync="isShowhandleDialog" title="超期督办历史" class="handle-dialog">
        <template>
          <div class="dialog-history-hd">
            <dialog-header :prisoner="{}" />
            <el-row class="dialog-row-top">
              <el-col :span="9">
                <span>办案单位：</span>
                <span>{{ handleForm.caseHandlingUnitName }}</span>
              </el-col>
              <el-col :span="9">
                <span>关押截止日期：</span>
                <span>{{ handleForm.custodyDateEnd }}</span>
              </el-col>
            </el-row>
            <el-row class="dialog-row-top">
              <el-col :span="9">
                <span>办案人/电话：</span>
                <span>{{ caseHandlerOne.caseHandlerName }}/{{ caseHandlerOne.phone }}</span>
              </el-col>
              <el-col :span="9">
                <span>第二办案人/电话：</span>
                <span>{{ caseHandlerTwo.caseHandlerName }}/{{ caseHandlerTwo.phone }}</span>
              </el-col>
            </el-row>
          </div>
          <div class="dialog-history-bd">
            <div class="title">
              <span>督办记录</span>
              <span>共四条记录</span>
            </div>
          </div>
          <el-row style="margin-top:24px">
            <el-col>
              <el-table :data="handleForm.handleHistoryQueryDTOS">
                <el-table-column label="督办时间" prop="createdTime">
                  <template slot-scope="scope">
                    {{ scope.row.createdTime | parseTime('{y}-{m}-{d}') }}
                  </template>
                </el-table-column>
                <el-table-column label="结果" prop="state">
                  <template slot-scope="scope">
                    {{ scope.row.state === 1 ? '成功' : '失败' }}
                  </template>
                </el-table-column>
                <el-table-column label="失败原因" prop="remark">
                  <template slot-scope="scope">
                    {{ scope.row.state === 1 ? '-' :scope.row.remark }}
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </template>
        <div slot="footer" style="text-align:left;display: flex;justify-content: space-between;">
          <Footer />
        </div>
      </el-dialog>
      <!-- 督办设置弹框 -->
      <el-dialog :visible.sync="handleSettingDialog" title="督办设置" width="38%">
        <el-row class="header-row">
          <el-col :span="4">短信发送频次：</el-col>
          <el-col :span="2">即将到期</el-col>
          <el-col :span="7" :offset="1">
            <el-input-number controls-position="right" :min="1" :max="10" /> 天一次
          </el-col>
        </el-row>
        <el-row class="header-row header-row-top">
          <el-col :span="2" :offset="4">羁押超期</el-col>
          <el-col :span="7" :offset="1">
            <el-input-number controls-position="right" :min="1" :max="10" /> 天一次
          </el-col>
        </el-row>
        <el-row class="header-row header-row-top">
          <el-col :span="4">
            短信发送时间:
          </el-col>
          <el-col :span="6">
            <el-time-select
              v-model="tempDate"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30'
              }"
              placeholder="选择时间"
              @change="handleChange"
            />
          </el-col>
        </el-row>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { mapActions, mapGetters } from 'vuex'
// 超期羁押api
import { superviseHandleHistory, findSuperviseHandleHistory, addSuperviseHandle, addsSuperviseHandle } from '@/api/custody/overcustody/handle.js'
// 弹出框头部
import DialogHeader from '@/components/BasicInfo'
import Footer from '@/components/Footer'
export default {
  components: {
    Pagination,
    DialogHeader,
    Footer
  },
  data() {
    return {
      loading: false,
      // 分页参数
      pageNo: 1,
      total: 0,
      resultSize: 10,
      // 分页配置项
      layout: 'prev, pager, next, jumper, sizes',
      // 督办历史弹窗
      isShowhandleDialog: false,
      // 督办历史表单
      handleForm: {},
      // 督办历史表单办案人表单
      caseHandlerOne: {},
      // 督办历史表单第二办案人表单
      caseHandlerTwo: {},
      // 超期羁押信息列表
      HandleHistoryList: [],
      // 筛选数据表单-办案单位类型
      CaseUnitTypeId: null,
      // 筛选数据表单
      queryHandleHistoryForm: {
        // 办案单位id
        caseHandlingUnitTypeId: '',
        // 羁押到期截至
        expirationNum: '',
        // 督办次数
        supervisionNum: ''
      },
      // 超期羁押历史列表
      overCustodyHistoryList: [],
      // 表格全选按钮被选中后的数组
      selectAllHandle: [],
      isShowExtendRow: false,
      // 督办设置弹框
      handleSettingDialog: false,
      tempDate: 0
    }
  },
  computed: {
    ...mapGetters(['dict']),
    caseUnitHandleList() {
      return this.dict['10200821000005'] && this.dict['10200821000005'].filter(item => {
        return item.parentId === this.CaseUnitTypeId
      })
    }
  },
  created() {
    // 获取超期羁押信息
    this.getSuperviseHandleHistory({
      pageNo: this.pageNo,
      resultSize: this.resultSize
    })
    // 获取字典
    this.getDic()
  },

  methods: {
    //   vuex存在的字典明细
    ...mapActions(['getDictDesc']),
    // 分页函数
    pagination(val) {
      const params = Object.assign(val, this.queryHandleHistoryForm)
      console.log(params)
      this.getSuperviseHandleHistory(params)
    },
    // 获取字典
    getDic() {
      // 获取办案单位类型字典明细
      if (!this.dict['1000000000006']) {
        this.getDictDesc(1000000000006)
      }
      // 获取办案单位明细字典
      if (!this.dict['10200821000005']) {
        this.getDictDesc(10200821000005)
      }
    },
    // 获取超期羁押信息
    async getSuperviseHandleHistory(params) {
      const tempParams = Object.assign({
        pageNo: 1,
        resultSize: 10
      }, params)
      this.loading = false
      const data = await superviseHandleHistory(tempParams)
      this.HandleHistoryList = data.records
      this.total = data.total
      this.loading = false
    },
    // 条件筛选超期羁押信息
    queryCaseHanleHistoryChange() {
      this.getSuperviseHandleHistory(this.queryHandleHistoryForm)
    },
    // 展示督办历史弹出框
    async handleHistoryDialog({ id }) {
      this.loading = false
      const data = await findSuperviseHandleHistory(id)
      this.loading = false
      this.handleForm = data
      this.caseHandlerOne = data.caseHandlerOne
      this.caseHandlerTwo = data.caseHandlerTwo
      this.overCustodyHistoryList = data.handleHistoryQueryDTOS
      this.isShowhandleDialog = true
    },
    // 新增督办
    async addHandle(data) {
      const params = {
        caseHandlerOnePhone: data.caseHandlerOne.phone,
        caseHandlerTowPhone: data.caseHandlerTwo.phone,
        userInfoId: data.id,
        custodyDateEnd: data.custodyDateEnd,
        personName: data.personName
      }
      console.log(new Date())
      this.loading = false
      new Promise((resolve, reject) => {
        addSuperviseHandle(params).then((res) => {
          this.$message.success('督办成功，已发送短信至办案人')
          resolve()
          this.getSuperviseHandleHistory()
        }).catch((e) => {
          this.$confirm('因网络繁忙或网络出错，请检查网络或稍后再操作', '督办失败', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          reject(e)
        }).finally(() => {
          this.loading = false
        })
      })
    },
    // 全选按钮选中时
    selectAll(selection) {
      const data = []
      selection.forEach(item => {
        data.push({
          caseHandlerOnePhone: item.caseHandlerOne.phone,
          caseHandlerTowPhone: item.caseHandlerTwo.phone,
          userInfoId: item.id
        })
      })
      this.selectAllHandle = data
    },
    // 用户点击选择按钮时
    select(selection) {
      const data = []
      selection.forEach(item => {
        data.push({
          caseHandlerOnePhone: item.caseHandlerOne.phone,
          caseHandlerTowPhone: item.caseHandlerTwo.phone,
          userInfoId: item.id
        })
      })
      this.selectAllHandle = data
    },
    // 一键督办
    RootHanle() {
      if (!this.selectAllHandle.length) {
        return this.$message.error('请先进行选择')
      }
      this.loading = false
      addsSuperviseHandle(this.selectAllHandle).then(() => {
        this.selectAllHandle = []
      }).finally(() => {
        this.getSuperviseHandleHistory()
        this.loading = false
      })
    },
    handleChange() {
      console.log(this.tempDate.split(':'))
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  ::v-deep.overcustody-handle {

    .header-row {
      font-size: 14px;
      line-height: 33px;
    }
    .header-row-top {
      margin-top: 10px;
    }
    .dialog-row-top {
      margin-top: 24px;

        margin-left: 44px;

    }
    .table-hd {
      display: flex;
      justify-content: space-between;
    }
    .header-top-input {
      margin-left: 10px;
      width: 224px;
    }
  .dialog-history-hd {
    // padding-top: 20px;
    padding-bottom: 32px;
    border-bottom: 1px solid #E9E9E9;
  }
  .dialog-history-bd {
    padding-top: 32px;
    .title {
      display: flex;
      justify-content: space-between;
      span {
        &:first-child {
          font-size:16px;
          font-weight: 500;
          font-family:PingFangSC-Regular,PingFang SC
        }
      }
    }
  }
}

</style>
