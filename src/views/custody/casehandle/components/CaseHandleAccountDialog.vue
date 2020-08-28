<template>
  <div>
    <el-dialog v-loading="loading" :visible.sync="showPop" width="67.4%" @close="beforeClose">
      <el-row :gutter="15">
        <el-col :span="24">
          <basic-info :prisoner="prisoner" />
        </el-col>
      </el-row>
      <template v-show="activeName === 'first'">
        <el-row v-for="item in changeData" :key="item.id" class="detail-row">
          <el-col :span="24">
            <span class="dialog-title">现记录</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">现办案单位：{{ item.organization }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">现办案环节：{{ item.linkName }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">现关押截止日期：{{ item.lockEndTime | parseTime('{y}/{m}/{d}') }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">现办案人/号码：{{ item.caseHandlerId }}/{{ item.caseHandlerId }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">证件：{{ item.caseHandlerId }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">&nbsp;</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">第二现办案人/号码：{{ item.caseHandlerId }}/{{ item.caseHandlerId }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">证件：{{ item.caseHandlerId }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">&nbsp;</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">法律文书：{{ item.legalIinstrument }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">法律文书号：{{ item.legalIinstrumentNo }}</span>
          </el-col>
          <el-col :span="8" />
          <el-col :span="24">
            <span class="dialog-content">备注：{{ item.remark }}</span>
          </el-col>
        </el-row>
      </template>
      <template v-show="activeName === 'second'">
        <el-row v-for="item in datainData" :key="item.id" class="detail-row">
          <el-col :span="24">
            <span class="dialog-title">现记录</span>
          </el-col>
          <el-col :span="24">
            <span class="dialog-content">变更原因：{{ item.linkName }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">现办案环节：{{ item.linkName }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">现关押截止日期：{{ item.lockEndTime | parseTime('{y}/{m}/{d}') }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">&nbsp;</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">法律文书：{{ item.legalIinstrument }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">法律文书号：{{ item.legalIinstrumentNo }}</span>
          </el-col>
        </el-row>
      </template>
      <template v-show="activeName === 'third'">
        <el-row v-for="item in resultData" :key="item.id" class="detail-row">
          <el-col :span="24">
            <span class="dialog-title">现记录</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">是否转决：{{ item.decision === 1 ? '是' : '否' }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">法律文书：{{ item.legalIinstrument }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">法律文书号：{{ item.legalIinstrumentNumber }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">决定机关：{{ item.disposeOrganName }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">审判长：{{ item.judge }}</span>
          </el-col>
          <el-col :span="8" />
          <el-col :span="24">
            <span class="dialog-content">处理结果：{{ item.disposeResult }}</span>
          </el-col>
          <el-col :span="24">
            <span class="dialog-content">附加处理：{{ item.appendDispose }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">刑期：{{ item.prisonTerm }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">刑期开始：{{ item.prisonTermStart | parseTime('{y}/{m}/{d}') }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">刑期结束：{{ item.prisonTermEnd | parseTime('{y}/{m}/{d}') }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">上诉日期：{{ item.appealTime | parseTime('{y}/{m}/{d}') }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">缓刑日期：{{ item.probationPrisonTerm | parseTime('{y}/{m}/{d}') }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">执行日期：{{ item.executeTime | parseTime('{y}/{m}/{d}') }}</span>
          </el-col>
        </el-row>
      </template>
      <template v-show="activeName === 'fourth'">
        <el-row v-for="item in resultData" :key="item.id" class="detail-row">
          <el-col :span="24">
            <span class="dialog-title">现记录</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">是否转决：{{ item.decision === 1 ? '是' : '否' }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">法律文书：{{ item.legalIinstrument }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">法律文书号：{{ item.legalIinstrumentNumber }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">决定机关：{{ item.disposeOrganName }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">审判长：{{ item.judge }}</span>
          </el-col>
          <el-col :span="8" />
          <el-col :span="24">
            <span class="dialog-content">处理结果：{{ item.disposeResult }}</span>
          </el-col>
          <el-col :span="24">
            <span class="dialog-content">附加处理：{{ item.appendDispose }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">刑期：{{ item.prisonTerm }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">刑期开始：{{ item.prisonTermStart | parseTime('{y}/{m}/{d}') }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">刑期结束：{{ item.prisonTermEnd | parseTime('{y}/{m}/{d}') }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">上诉日期：{{ item.appealTime | parseTime('{y}/{m}/{d}') }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">缓刑日期：{{ item.probationPrisonTerm | parseTime('{y}/{m}/{d}') }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">执行日期：{{ item.executeTime | parseTime('{y}/{m}/{d}') }}</span>
          </el-col>
        </el-row>
      </template>
      <div slot="title" class="dialog-title">
        <div class="title">
          {{ title }}
        </div>
        <div class="tabs">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="办案环节变动" name="first" />
            <el-tab-pane label="羁押期限变更" name="second" />
            <el-tab-pane label="处理结果" name="third" />
            <el-tab-pane label="留所服刑" name="fourth" />
          </el-tabs>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <operator class="operator" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  caseHandlerBookDesc
} from '@/api/custody/casehandle/account'
import BasicInfo from '@/components/BasicInfo'
import Operator from '@/components/Operator'
export default {
  name: 'CaseHandleAccountDialog',
  components: {
    BasicInfo,
    Operator
  },
  props: {
    type: {
      type: String,
      default: '' // register 全项录入 add 登记  eidt修改 detail详情
    },
    seleced: {
      type: Number,
      default: 0 // register 全项录入 add 登记  eidt修改 detail详情
    },
    title: {
      type: String,
      default: '' // 弹窗标题
    },
    show: {
      default: false,
      type: Boolean
    },
    prisoner: {
      default: () => ({}),
      type: Object
    }
  },
  data() {
    return {
      loading: false,
      showPartner: false,
      partnerType: '',
      changeData: [],
      datainData: [],
      resultData: [],
      leaveStationSentence: {},
      activeName: 'first'
    }
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    showPop: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('update:show', val)
      }
    }
  },
  watch: {
    prisoner: {
      immediate: true,
      handler() {
        if (this.prisoner.id) {
          this.getDetail()
        }
      }
    }
  },
  mounted() {
  },
  methods: {
    beforeClose() {
    },
    getDetail() {
      caseHandlerBookDesc(this.prisoner.id).then(data => {
        this.changeData = data.caseHandlerLinks
        this.datainData = data.detainTimeLimits
        this.resultData = data.disposeResults
        this.leaveStationSentence = data.leaveStationSentence
      })
    },
    handleClick(val) {
      console.log(val.index)
    }

  }
}

</script>
<style lang="scss" scoped>
.origin {
  border-bottom: 1px solid #E8E8E8;
  .dialog-content {
    margin: 10px 0 20px;
  }
}
.detail-row {
  margin-top: 20px;
  .dialog-title {
    font-size: 18px;
    color: #000;
    font-weight: bold;
  }
  .dialog-content {
    font-size: 14px;
    color: #000;
    margin: 10px 0;
    display: inline-block;
  }
}
.dialog-title {
  display: flex;
  padding: 0 42px;
  .tabs {
    margin-left: 56px;
    .el-tabs {
      margin-bottom: 0;
      ::v-deep .el-tabs__header {
        margin-bottom: 0;
      }
    }
  }
}
.dialog-footer {
  text-align: left;
  .operator {
    float: none;
  }
}
</style>
