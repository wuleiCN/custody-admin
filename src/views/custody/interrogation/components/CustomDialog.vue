<template>
  <div>
    <el-dialog title="提讯登记" :visible.sync="showPop" width="75.56%" @close="beforeClose" @closed="afterClose">
      <el-form
        v-if="showPop"
        ref="form"
        v-loading="loading"
        :model="form"
        :rules="formRules"
      >
        <el-row :gutter="15">
          <div class="top-detail">
            <el-col :span="6">
              <el-form-item label="姓名:">
                <span class="tips">{{ form.patientName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="性别:">
                <span class="tips">{{ form.personSex }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="监室:">
                <span class="tips">{{ form.custodyWardName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="证件号码:">
                <span class="tips">{{ form.patienCertificateNumber }}</span>
              </el-form-item>
            </el-col>
          </div>
          <el-col :span="24"><div style="height:30px" /></el-col>
          <el-col :span="6">
            <el-form-item label="提讯登记时间:" prop="registerTime">
              <span v-if="type === 'detail'">{{ form.registerTime | parseTime }}</span>
              <el-date-picker
                v-else
                v-model="form.registerTime"
                type="datetime"
                value-format="timestamp"
                placeholder="选择日期时间"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="办案单位类型:" prop="caseHandlingUnitTypeId">
              <span v-if="type === 'detail'">{{ form.caseHandlingUnitTypeName }}</span>
              <el-select v-else v-model="form.caseHandlingUnitTypeId" filterable placeholder="请选择办案单位类型">
                <el-option
                  v-for="item in dict['1000000000006']"
                  :key="item.id"
                  :label="item.dictionaryName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="办案单位:" prop="caseHandlingUnitId">
              <span v-if="type === 'detail'">{{ form.caseHandlingUnitName }}</span>
              <el-select v-else v-model="form.caseHandlingUnitId" filterable placeholder="请选择办案单位类型">
                <el-option
                  v-for="item in caseUnitHandleList"
                  :key="item.id"
                  :label="item.dictionaryName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="提讯原因:">
              <span v-if="type === 'detail'">{{ form.reasonName }}</span>
              <el-select v-else v-model="form.reasonId" filterable placeholder="请选择办案单位类型">
                <el-option
                  v-for="item in dict['10200827000001']"
                  :key="item.id"
                  :label="item.dictionaryName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="type !=='detail'" :span="24">
            <div class="hr" />
          </el-col>
          <el-col :span="6">
            <el-form-item label="办案人一姓名:" prop="caseHandlerOne">
              <span v-if="type === 'detail'">{{ form.caseHandlerOne }}</span>
              <el-input v-else v-model="form.caseHandlerOne" placeholder="请输入办案人一姓名" type="text" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="办案人电话:" prop="caseHandlerPhoneOne">
              <span v-if="type === 'detail'">{{ form.caseHandlerPhoneOne }}</span>
              <el-input v-else v-model="form.caseHandlerPhoneOne" placeholder="请输入办案人电话" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="证件类型:" prop="certificatesTypeIdOne">
              <span v-if="type === 'detail'">{{ form.certificatesTypeOne }}</span>
              <el-select v-else v-model="form.certificatesTypeIdOne" placeholder="请选择证件类型">
                <el-option
                  v-for="item in dict['1000000000021']"
                  :key="item.id"
                  :label="item.dictionaryName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="证件号码:" prop="caseHandlerCertificatesOne">
              <span v-if="type === 'detail'">{{ form.caseHandlerCertificatesOne }}</span>
              <el-input v-else v-model="form.caseHandlerCertificatesOne" placeholder="请输入证件号码" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="办案人二姓名:" prop="caseHandlerTwo">
              <span v-if="type === 'detail'">{{ form.caseHandlerTwo }}</span>
              <el-input v-else v-model="form.caseHandlerTwo" placeholder="请输入办案人二姓名" type="text" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="办案人电话:" prop="caseHandlerPhoneTwo">
              <span v-if="type === 'detail'">{{ form.caseHandlerPhoneTwo }}</span>
              <el-input v-else v-model="form.caseHandlerPhoneTwo" placeholder="请输入办案人电话" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="证件类型: " prop="certificatesTypeIdTwo">
              <span v-if="type === 'detail'">{{ form.certificatesTypeTwo }}</span>
              <el-select v-else v-model="form.certificatesTypeIdTwo" placeholder="请选择证件类型">
                <el-option
                  v-for="item in dict['1000000000021']"
                  :key="item.id"
                  :label="item.dictionaryName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="证件号码: " prop="caseHandlerCertificatesTwo">
              <span v-if="type === 'detail'">{{ form.caseHandlerCertificatesTwo }}</span>
              <el-input v-else v-model="form.caseHandlerCertificatesTwo" placeholder="请输入证件号码" />
            </el-form-item>
          </el-col>
          <el-col v-if="type ==='detail'" :span="24">
            <div class="hr" />
          </el-col>
          <div v-if="type === 'detail'">
            <el-col :span="24">
              <div class="title-top">提讯信息</div>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开始时间:">
                {{ form.startTime | parseTime }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结束时间:">
                {{ form.endTime | parseTime }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="提讯室:">
                {{ form.arraignOffice }}
              </el-form-item>
            </el-col>
          </div>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="padding-top: 10px">
        <div class="inputGroup" style="float: left;">
          <el-form label-width="100px" inline>
            <el-form-item v-if="type !=='add'" label="登记时间:">
              {{ form.registerTime | parseTime }}
            </el-form-item>
            <el-form-item label="操作员:">
              {{ user.userName }}
            </el-form-item>
            <el-form-item label="警号:">
              {{ user.policeCode }}
            </el-form-item>
          </el-form>
        </div>
        <el-button type="default" @click="showPop = false">
          取消
        </el-button>
        <el-button v-if="type !== 'detail'" type="primary" @click="submit">
          {{ type === 'audit' ? '审核通过' : '确定提交' }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { deepClone } from '@/components/PublicMethod'
import { setCustodyStatistics } from '@/api/custody/interrogation/register'
import { approved, findById as getDetail } from '@/api/custody/interrogation/public'
import { getDetailById } from '@/api/custody/interrogation/accout'
import formRules from './formRules'
import { parseTime } from '@/utils'
import { getDictDesc } from '@/api/basic/dict'
import defaultForm from './defaultForm'
export default {
  name: 'CustomDialog',
  filters: {
    parseTime
  },
  props: {
    defaultData: {
      type: Object,
      default: () => { return {} }
    },
    type: {
      type: String,
      default: 'detail' // audit 审核 add 登记  eidt修改 detail详情
    },
    show: {
      default: false,
      type: Boolean
    },
    id: {
      default: '',
      type: [String, Number]
    }
  },
  data() {
    const rules = formRules(this)
    return {
      loading: false,
      dic: {
        works: [], // 办案单位
        cardType: []
      },
      showPop: false,
      formRules: rules,
      caseHandleList: [],
      form: defaultForm
    }
  },
  watch: {
    show: {
      immediate: true,
      handler() {
        this.showPop = this.show
        if (this.show) {
          this.getItemDetail()
        }
      }
    }
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapGetters(['dict']),
    ...mapGetters(['user']),
    caseUnitHandleList() {
      if (this.caseHandleList.length === 0) {
        return []
      }
      return this.caseHandleList.filter(item => {
        return item.parentId === this.form.caseHandlingUnitTypeId
      })
    }
  },
  mounted() {
    // // 获取办案单位类型
    if (!this.dict['1000000000006']) {
      this.getDictDesc(1000000000006)
    }
    // 提讯原因
    if (!this.dict['10200827000001']) {
      this.getDictDesc(10200827000001)
    }
    // 获取证件类型
    if (!this.dict['1000000000021']) {
      this.getDictDesc(1000000000021)
    }

    // 获取办案单位字典明细
    if (!this.dict['10200821000005']) {
      // this.getDictDesc(10200821000005)
      getDictDesc({
        id: 10200821000005
      }).then(data => {
        this.$store.commit('SET_DICTITEM', { data: data, key: 10200821000005 })
        this.caseHandleList = data.dic
      })
    } else {
      this.caseHandleList = this.dict['10200821000005'].dic
    }
  },
  methods: {
    ...mapActions(['getDictDesc']),

    afterClose() {
      this.$emit('update:show', false)
    },
    beforeClose() {
      this.$refs.form.clearValidate()
    },
    /**
     * 拉取收戒详情
     */
    getItemDetail() {
      this.form = deepClone(defaultForm)
      // eslint-disable-next-line no-undef
      if (this.type === 'add') {
        this.form = Object.assign(this.form, this.defaultData)
        return
      }
      this.loading = false
      let fetch = null
      if (this.type === 'detail') {
        fetch = getDetailById.bind(this)
      } else {
        fetch = getDetail.bind(this)
      }
      fetch(this.id).then(data => {
        this.loading = false
        this.$set(this, 'form', data)
        this.$forceUpdate()
      }).catch(() => {
        this.loading = false
      })
    },
    submit() {
      this.$refs.form.validate(v => {
        if (v) {
          this.loading = false
          const params = deepClone(this.form) // 处理数据
          /**
           * 将下拉框的中文提取出来
           */
          const findNameById = (arr, id) => {
            const item = arr.find(e => e.id === id)
            return item ? item.dictionaryName : ''
          }
          if (params.certificatesTypeIdOne) {
            params.certificatesTypeOne = findNameById(this.dict[1000000000021], params.certificatesTypeIdOne)
          } // 证件类型
          if (params.certificatesTypeIdTwo) {
            params.certificatesTypeTwo = findNameById(this.dict[1000000000021], params.certificatesTypeIdTwo)
          } // 证件类型

          if (params.reasonId) {
            params.reasonName = findNameById(this.dict[10200827000001], params.reasonId)
          } // 提讯原因
          if (params.caseHandlingUnitTypeId) {
            params.caseHandlingUnitTypeName = findNameById(this.dict[1000000000006], params.caseHandlingUnitTypeId)
          } // 办案单位类型
          if (params.caseHandlingUnitId) {
            params.caseHandlingUnitName = findNameById(this.caseUnitHandleList, params.caseHandlingUnitId)
          } // 办案单位
          if (this.type === 'add') {
            this.addServer(params)
          } else if (this.type === 'edit') {
            this.updateServer(params)
          } else if (this.type === 'audit') {
            this.approved()
          }
        }
      })
    },

    /**
     * 审核通过
     */
    approved() {
      approved({ id: this.id }).then(res => {
        this.$message.success('审核成功')
        this.showPop = false
        this.loading = false
        this.$emit('success')
      })
    },
    /**
     * 提交新增的内容
     */
    addServer(params) {
      // eslint-disable-next-line no-undef
      setCustodyStatistics(params).then(data => {
        this.$message.success('登记成功')
        this.showPop = false
        this.loading = false
        this.$emit('success')
      }).catch(() => {
        this.loading = false
      })
    },
    /**
     * 提交修改的内容
     */
    updateServer(params) {
      // eslint-disable-next-line no-undef
      update(params).then(data => {
        this.$message.success('修改成功')
        this.showPop = false
        this.loading = false
        this.$emit('success')
      }).catch(() => {
        this.loading = false
      })
    }
  }
}

</script>
<style lang="scss" scoped>
.base-title {
  font-size: 16px;
  color: #333;
  position: relative;
  padding-left: 13px + 3px + 9px;
  margin-top: 20px;
  margin-bottom: 20px;
  &::after {
    content:'';
    position: absolute;
    left: 9px;
    width: 3px;
    height: 18px;
    background-color: #0070F4;
  }
}

.tips {
  font-size: 13px; color:#333;
}

.el-input, .el-select, .el-date {
  width: 100%;
}
::v-deep .el-form-item__label, ::v-deep .el-form-item__content {
  font-size: 14px;
  color: #333;
}
::v-deep  .el-range-editor--small.el-input__inner {
  height: 33px;
}

.head-img {
  width: 140px;
  height: 140px;
  box-shadow: 0 0 6px 1px rgba(0,0,0,.05);
  display: inline-block;
  border-radius: 5px;
  margin: 10px;
}
::v-deep .el-input.is-disabled .el-input__inner {
  color: #333;
}

.top-detail {
  height: 54px;
  padding-top: 10px;
  background:rgba(250,250,250,1);
  border-radius:4px 4px 0px 0px;
  .el-form-item {
    margin: 0;
  }
}
.hr  {
  height: 1px;
  width: 100%;
  margin: 15px 0;
  background-color: #E9E9E9;
}

.title-top {
  height:22px;
  font-size:18px;
  font-family:PingFangSC-Medium,PingFang SC;
  font-weight:500;
  color:rgba(0,0,0,0.85);
  line-height:22px;
  padding: 10px 0 30px  0;
}
</style>
