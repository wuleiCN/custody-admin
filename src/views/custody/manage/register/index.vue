<template>
  <div class="app-container">
    <div class="head-container">
      <div>
        <el-button
          v-for="(v, i) in precepts"
          :key="i"
          ref="selected"
          :class="{ btn: selected === i }"
          plain
          @click="selectedValue(i)"
        >{{ v }}</el-button>
      </div>
      <div class="search">
        <el-input
          v-model="query"
          clearable
          size="small"
          placeholder="输入姓名或证件号"
          class="filter-item"
          autocomplete="off"
          @input="clearValue"
        />
        <el-button type="primary" icon="el-icon-search" @click="selectQuery">查询</el-button>
      </div>
    </div>
    <!--表格渲染-->
    <el-card class="flex-table">
      <el-table ref="table" :data="caution" style="width: 100%;">
        <el-table-column prop="personName" label="姓名" />
        <el-table-column prop="certificateNumber" label="证件号码" align="center" />
        <el-table-column prop="caseHandlingUnitId" label="办案单位" align="center" />
        <el-table-column label="操作" align="center" fixed="right" style="background-color: #F2F2F2">
          <template #default="{row:caution}">
            <el-button size="mini" type="text" @click="examValue(caution)">入所体检</el-button>
            <el-button type="text" size="mini" @click="toRejection(caution)">不予收戒</el-button>
            <el-button type="text" size="mini" @click="toRegister(caution)">登记</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--分页组件-->
    <Pagination
      :class="{'limit': page.resultSize > 10}"
      :page.sync="page.pageNo"
      :total="page.total"
      :limit.sync="page.resultSize"
      @pagination="pagination"
    />
    <!--表单渲染-->
    <!-- 录入(拒收) -->
    <el-dialog
      custom-class="reject-dialog"
      title="收戒登记-录入(拒收)"
      :visible.sync="rejectionDialog.isInputDialogVisible"
      show-close
      @close="dialogVisibleInputCancel"
    >
      <el-form ref="rejectionBasiRef" :rules="registerRules" :model="basicInfoRej">
        <div class="form_box1">基本信息</div>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="人员编号：" label-width="152px">
              <el-input v-model="basicInfoRej.number" autocomplete="off" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件类型：" label-width="152px" prop="certificateTypeName">
              <el-select
                v-model="basicInfoRej.certificateTypeName"
                placeholder="请选择"
                @change="changecertificateTypeName"
              >
                <el-option
                  v-for="(v,i) in dictInfo.ID.dic"
                  :key="i"
                  :label="v.dictionaryName"
                  :value="v.dictionaryName"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件号码：" label-width="152px" prop="certificateNumber">
              <el-input
                v-model="basicInfoRej.certificateNumber"
                autocomplete="off"
                @blur="IdInfo(basicInfoRej)"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="姓名：" label-width="152px" prop="personName">
              <el-input v-model="basicInfoRej.personName" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别：" label-width="152px" prop="personSex">
              <el-select v-model="basicInfoRej.personSex" placeholder="请选择">
                <el-option
                  v-for="(v,i) in dictInfo.sex.dic"
                  :key="i"
                  :label="v.dictionaryName"
                  :value="v.dictionaryName"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出生日期：" label-width="152px" prop="personBirthday">
              <el-date-picker
                v-model="basicInfoRej.personBirthday"
                type="date"
                placeholder="选择日期"
                @change="val($event)"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form ref="rejectionStroRef" :rules="organizationRules" :model="strongWarningRej">
        <div class="form_box1">案件信息</div>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="收押凭证" prop="voucherName">
              <el-select
                v-model="strongWarningRej.voucherName"
                filterable
                placeholder="请选择收押凭证"
                @change="getIdByName(dictInfo.credentials, strongWarningRej.voucherName, 'voucherId', strongWarningRej)"
              >
                <el-option
                  v-for="item in dictInfo.credentials"
                  :key="item.id"
                  :label="item.dictionaryName"
                  :value="item.dictionaryName"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="法律文书号：" label-width="152px" prop="legalDocumentNo">
              <el-input
                v-model="strongWarningRej.legalDocumentNo"
                placeholder="请选择"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="拒收日期" label-width="152px" prop="enteringInstituteDate">
              <el-date-picker
                v-model="strongWarningRej.enteringInstituteDate"
                type="date"
                placeholder="请输入日期"
                value-format="timestamp"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="办案单位类型" prop="caseHandlingUnitTypeName">
              <el-select
                v-model="strongWarningRej.caseHandlingUnitTypeName"
                filterable
                placeholder="请选择办案单位类型"
                @change="changeCaseHandlingUnitTypeName"
              >
                <el-option
                  v-for="item in dictInfo.worksType"
                  :key="item.id"
                  :label="item.dictionaryName"
                  :value="item.dictionaryName"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="办案单位：" label-width="152px" prop="caseHandlingUnitName">
              <el-select
                v-model="strongWarningRej.caseHandlingUnitName"
                placeholder="请选择办案单位"
                @change="changeCaseHandlingUnitName"
              >
                <el-option
                  v-for="(v,i) in dictInfo.caseUnit.dic"
                  :key="i"
                  :label="v.dictionaryName"
                  :value="v.dictionaryName"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <span slot="label">&nbsp;</span>
              <div style="height:33px;" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="办案人一姓名："
              label-width="152px"
              prop="caseHandlers[0].caseHandlerName"
            >
              <el-input
                v-model="strongWarningRej.caseHandlers[0].caseHandlerName"
                placeholder="请输入"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="办案人电话：" label-width="152px" prop="caseHandlers[0].phone">
              <el-input
                v-model="strongWarningRej.caseHandlers[0].phone"
                placeholder="请输入"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <span slot="label">&nbsp;</span>
              <div style="height:33px;" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="办案人二姓名："
              label-width="152px"
              prop="caseHandlers[1].caseHandlerName"
            >
              <el-input
                v-model="strongWarningRej.caseHandlers[1].caseHandlerName"
                placeholder="请输入"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="办案人电话：" label-width="152px" prop="caseHandlers[1].phone">
              <el-input
                v-model="strongWarningRej.caseHandlers[1].phone"
                placeholder="请输入"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="拒绝原因：" label-width="152px">
              <el-select
                v-model="fullEntryRej.rejectReason"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请选择"
                @change="getIdByName(dictInfo.rejectReason.dic, fullEntryRej.rejectReason, 'rejectReasonId', fullEntryRej)"
              >
                <el-option
                  v-for="(v,i) in dictInfo.rejectReason.dic"
                  :key="i"
                  :label="v.dictionaryName"
                  :value="v.dictionaryName"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div>
          操作员
          <el-input :value="user.userName" autocomplete="off" :disabled="true" />警号
          <el-input :value="user.policeCode" autocomplete="off" :disabled="true" />
        </div>
        <div>
          <el-button @click="dialogVisibleInputCancel">取消</el-button>
          <el-button type="primary" @click="dialogVisibleInputEnter">确定拒收</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 全项录入信息表单 -->
    <custom-dialog :type="custodyType" :show.sync="addFormDialog" />
  </div>
</template>

<script>
// 分页
import Pagination from '@/components/Pagination'
import CustomDialog from '../components/CustomDialog'
import {
  CustodyInformation,
  addCustodyInformation,
  // personCustodyInformationById,
  // personCustodyInformationRej,
  // personCustodyInformationUpdate,
  // getOffice,
  accpDelete,
  goodsDelete
} from '@/api/custody/custodyReg'
import { getDictDesc } from '@/api/basic/dict'
// 表格
import { mapGetters } from 'vuex'
import { deepClone } from '@/components/PublicMethod'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
// import { mapState } from 'vuex'
export default {
  name: 'Page',
  components: {
    Pagination,
    CustomDialog
  },
  data() {
    // eslint-disable-next-line no-unused-vars
    const caseHanderTelValedate = (rule, value, callback) => {
      if (
        (this.strongWarning.caseHandlers[0].phone ===
          this.strongWarning.caseHandlers[1].phone &&
          this.strongWarning.caseHandlers[0].phone !== '' &&
          this.strongWarning.caseHandlers[1].phone) ||
        (this.strongWarningRej.caseHandlers[0].phone ===
          this.strongWarningRej.caseHandlers[1].phone &&
          this.strongWarningRej.caseHandlers[0].phone !== '' &&
          this.strongWarningRej.caseHandlers[1].phone)
      ) {
        callback(new Error('办案人员电话号码不能相同'))
      } else {
        callback()
      }
    }
    const homeTelValedate = (rule, value, callback) => {
      if (this.basicInfo.homes[0].phone === this.basicInfo.homes[1].phone) {
        callback(new Error('家属人员电话号码不能相同'))
      } else {
        callback()
      }
    }
    const homeNameValedate = (rule, value, callback) => {
      if (
        this.basicInfo.homes[0].homeName === this.basicInfo.homes[1].homeName
      ) {
        callback(new Error('家属人员姓名不能相同'))
      } else {
        callback()
      }
    }
    return {
      selected: 0,
      precepts: ['转入信息', '全项录入', '不予收戒'],
      addFormDialog: false,
      // 弹窗类型 register 全项录入 add 登记
      custodyType: 'register',
      // 字典详细
      dictInfo: {
        worksType: [],
        credentials: [],
        ID: {},
        sex: {},
        coun: {},
        ciunfiy: {},
        mery: {},
        educ: {},
        caseUnit: {},
        decision: {},
        drugType: {},
        drugMode: {},
        ward: {},
        rejectReason: {}
      },
      storages: [
        {
          itemName: '',
          itemCount: '',
          itemUnit: ''
        }
      ],
      index: 1,
      // 查询条件
      query: '',
      // 物品
      good: {
        index: '',
        itemName: '',
        itemCount: '',
        itemUnit: ''
      },
      // 同案人员
      Accomplice: {
        personName: '',
        certificateTypeName: '',
        certificateNumber: ''
      },
      url:
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1579484258,2401891478&fm=15&gp=0.jpg',
      caution: [],
      // bodyBox: ['正常', '外伤史', '手术史', '其他'],
      // limitationBox: [
      //   '单独关押',
      //   '禁止其他单位审讯',
      //   '禁止律师会见',
      //   '禁止家属会见'
      // ],
      data: {},
      rules: {},
      basicInfo: {
        personNumber: '',
        certificateTypeId: '',
        certificateTypeName: '身份证',
        certificateNumber: '',
        personName: '',
        personAliasName: '',
        personSex: '',
        personBirthday: '',
        personNationalityId: '',
        personNationalityName: '中国',
        personNationId: '',
        personNationName: '汉族',
        personMaritalStatusId: '',
        personMaritalStatusName: '未婚',
        personRegisteredResidence: '',
        personPermanentResidence: '',
        personEducationId: '',
        personEducationName: '初中',
        personWorkCompany: '',
        personMedicalInsuranceSituation: '',
        personResume: '',
        personProcessingRecord: '',
        personPhysicalFeatures: '',
        homes: [
          {
            homeName: '',
            phone: ''
          },
          {
            homeName: '',
            phone: ''
          }
        ]
      },
      strongWarning: {
        decisionOfficeId: '',
        enteringInstituteDate: new Date().getTime(),
        decisionOfficeName: '强制隔离戒毒决定机关',
        legalDocumentNo: '',
        drugDetoxificationTermRange: [],
        // caseHandlingUnitTypeId: 0,
        // caseHandlingUnitTypeName: "办案单位类型名称",
        caseHandlingUnitId: '',
        caseHandlingUnitName: '办案单位类型名称',
        caseHandlers: [
          {
            caseHandlerName: '',
            phone: ''
          },
          {
            caseHandlerName: '',
            phone: ''
          }
        ],
        firstDrugTime: '',
        drugDetoxificationCount: '',
        smokingNarcoticsTypeId: '',
        smokingNarcoticsTypeName: '吸食毒品种类',
        smokingNarcoticsMethodId: '',
        smokingNarcoticsMethodName: '吸食毒品方式',
        otherConcurrentPenaltie: '',
        limitation: [],
        remark: ''
      },
      fullEntry: {
        rejectReason: '',
        numberClothesNumber: '',
        custodyWardId: '',
        custodyWardName: '一号病室',
        bodyStatus: [],
        storages: [],
        matches: [],
        bodys: []
      },
      // 拒收
      basicInfoRej: {
        certificateTypeId: '',
        personBirthday: null,
        personSex: '',
        personName: '',
        certificateNumber: '',
        certificateTypeName: '',
        number: ''
      },
      strongWarningRej: {
        enteringInstituteDate: new Date().getTime(),
        caseHandlingUnitId: '',
        caseHandlers: [
          {
            caseHandlerName: '',
            phone: ''
          },
          {
            caseHandlerName: '',
            phone: ''
          }
        ],
        legalDocumentNo: '',
        decisionOfficeName: '',
        caseHandlingUnitName: ''
      },
      fullEntryRej: {
        rejectReason: [],
        rejectReasonId: []
      },
      id: '',
      matches: [
        {
          personName: '',
          certificateTypeName: '',
          certificateTypeId: '',
          certificateNumber: ''
        }
      ],
      // 页码
      page: {
        pageNo: 1,
        resultSize: 10,
        total: 0
      },
      // 操作人员
      Operator: {},
      inputDialog: {
        isExaminationDialogVisible: false,
        checkList: []
      },
      rejectionDialog: {
        form: { rejectReason: '' },
        isInputDialogVisible: false,
        isrejectionDialogVisible: false
      },
      registerDialog: {
        isRegisterDialogVisible: false,
        isRegisterAccompliceVisible: false,
        selected: false
      },
      fullEntryDialog: {
        isFullEntryDialogVisible: false,
        isFullAccompliceVisible: false,
        selected: false
      },
      bodyStatus: [],
      // 收戒登记预校验
      registerRules: {
        certificateTypeName: [
          { required: true, message: '请选择证件类型！', trigger: 'change' }
        ],
        certificateNumber: [
          { required: true, message: '请输入证件号码！', trigger: 'blur' }
        ],
        personName: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }
        ],
        personSex: [
          {
            required: true,
            message: '请选择性别',
            trigger: 'change'
          }
        ],
        personBirthday: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'blur'
          }
        ],
        personNationalityName: [
          { required: true, message: '请选择国籍！', trigger: 'change' }
        ],
        personNationName: [
          { required: true, message: '请选择民族！', trigger: 'change' }
        ],
        personRegisteredResidence: [
          { required: true, message: '请输入户口所在地！', trigger: 'blur' }
        ],
        personEducationName: [
          { required: true, message: '请选择文化程度！', trigger: 'change' }
        ],
        personMaritalStatusName: [
          { required: true, message: '请选择婚姻状况！', trigger: 'change' }
        ],
        'homes[0].homeName': [
          { required: true, message: '请输入家属姓名！', trigger: 'blur' },
          { validator: homeNameValedate, trigger: 'blur' }
        ],
        'homes[0].phone': [
          { required: true, message: '请输入电话号码！', trigger: 'blur' },
          { validator: homeTelValedate, trigger: 'blur' }
        ],
        'homes[1].homeName': [{ validator: homeNameValedate, trigger: 'blur' }],
        'homes[1].phone': [{ validator: homeTelValedate, trigger: 'blur' }],
        custodyWardName: [
          { required: true, message: '请输入收押病室！', trigger: 'blur' }
        ]
      },
      organizationRules: {
        'caseHandlingUnitName': [
          { required: true, message: '请选择办案单位！', trigger: 'change' }
        ],
        'enteringInstituteDate': [
          { required: true, message: '请选择拒收日期！', trigger: 'change' }
        ],
        'voucherName': [
          { required: true, message: '请选择收押凭证！', trigger: 'change' }
        ],
        'caseHandlingUnitTypeName': [
          { required: true, message: '请选择办公单位类型！', trigger: 'change' }
        ],
        'legalDocumentNo': [
          { required: true, message: '请选择法律文书号！', trigger: 'change' }
        ],
        'caseHandlers[0].caseHandlerName': [
          { required: true, message: '请输入办案人姓名！', trigger: 'blur' }
        ],
        'caseHandlers[0].phone': [
          { required: true, message: '请输入电话号码！', trigger: 'blur' },
          { validator: caseHanderTelValedate, trigger: 'blur' }
        ],
        'caseHandlers[1].caseHandlerName': [
          { required: true, message: '请输入办案人姓名！', trigger: 'blur' }
        ],
        'caseHandlers[1].phone': [
          { required: true, message: '请输入电话号码！', trigger: 'blur' },
          { validator: caseHanderTelValedate, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['user']),
    uploadShow() {
      const s = true
      return s
    }
  },
  created() {
    this.getCustodyInformationList()
  },
  mounted() {
    this.getDict()
  },
  methods: {
    // 根据ID获取字典明细
    async getDict() {
      // 证件类型
      this.dictInfo.ID = await getDictDesc({ id: 1000000000021 })
      // this.basicInfo.certificateTypeName = '居民身份证'
      // this.basicInfo.certificateTypeId = this.dictInfo.ID.dic.find(item => item.dictionaryName === '居民身份证').id
      // 性别
      this.dictInfo.sex = await getDictDesc({ id: 1000000000024 })
      // 办案单位
      this.dictInfo.caseUnit = await getDictDesc({ id: 10200821000005 })
      // 拒收原因
      this.dictInfo.rejectReason = await getDictDesc({ id: 1597830398378 })
      getDictDesc({ id: 1000000000012 }).then(data => {
        this.dictInfo.credentials = data.dic
      }) // 凭证
      getDictDesc({ id: 1000000000006 }).then(data => {
        this.dictInfo.worksType = data.dic
      }) // 单位类型
    },
    // 获取收押信息列表
    async getCustodyInformationList() {
      const data = await CustodyInformation(this.page)
      this.caution = data.records
      this.page.total = data.total
      console.log(data)
    },
    // 处理录入数据
    forms() {
      const strat = this.strongWarning.drugDetoxificationTermRange[0]
      const end = this.strongWarning.drugDetoxificationTermRange[1]
      const birt = this.basicInfo.personBirthday
      if (typeof strat !== 'number' && strat !== null) {
        this.strongWarning.drugDetoxificationTermRange[0] = strat.getTime()
      }
      if (typeof end !== 'number' && end !== null) {
        this.strongWarning.drugDetoxificationTermRange[1] = end.getTime()
      }
      if (typeof birt !== 'number' && birt !== null) {
        this.basicInfo.personBirthday = birt.getTime()
      }
      // this.strongWarning.limitation = this.strongWarning.limitation.join(',')
      // this.fullEntry.bodyStatus = this.fullEntry.bodyStatus.join(',')
      const basicObj = deepClone(this.basicInfo)
      const strongObj = deepClone(this.strongWarning)
      strongObj.limitation = strongObj.limitation.join(',')
      this.fullEntry.bodyStatus = this.bodyStatus.join(',')
      if (!basicObj.homes[1].homeName) {
        basicObj.homes.pop()
      }
      this.fullEntry.basicInfo = basicObj
      this.fullEntry.basicInfo.strongWarning = strongObj
      const lastStorages = this.storages[this.storages.length - 1]
      const storagesClone = deepClone(this.storages)
      const matchesClone = deepClone(this.matches)
      if (
        lastStorages.itemName === '' ||
        lastStorages.itemCount === '' ||
        lastStorages.itemUnit === ''
      ) {
        storagesClone.pop()
      }
      const lastMatches = this.matches[this.matches.length - 1]
      if (
        lastMatches.personName === '' ||
        lastMatches.certificateTypeName === '' ||
        lastMatches.certificateNumber === ''
      ) {
        matchesClone.pop()
      }
      this.fullEntry.storages = storagesClone
      this.fullEntry.matches = matchesClone

      this.fullEntry.storages.forEach((v) => {
        v.place = this.fullEntry.place
      })
    },
    // 条件查询收押人员
    async selectQuery() {
      const data = await CustodyInformation({ key: this.query })
      this.caution = data.records
      this.page.total = data.total
      console.log(data)
    },
    clearValue() {
      if (this.query === '') {
        this.getCustodyInformationList()
      }
    },
    getDeptDatas() {
      console.log(123)
    },
    // 匹配同案人员

    // 分页
    pagination() {
      this.getCustodyInformationList(this.page)
      console.log(this.page)
    },
    dialogVisibleInputCancel() {
      this.$refs.rejectionBasiRef.resetFields()
      this.$refs.rejectionStroRef.resetFields()
      this.strongWarning.number = ''
      this.rejectionDialog.isInputDialogVisible = false
    },
    // 确认不予收戒
    dialogVisibleInputEnter() {
      this.$refs.rejectionBasiRef.validate((valid) => {
        if (valid) return valid
        else return this.$message.error('请填写必填项')
      })
      this.$refs.rejectionStroRef.validate(async (valid) => {
        if (valid) {
          this.fullEntryRej.custodyStatus = 5
          const birt = this.basicInfoRej.personBirthday
          const ent = this.strongWarningRej.enteringInstituteDate
          if (typeof birt !== 'number' && birt !== null) {
            this.basicInfoRej.personBirthday = this.basicInfoRej.personBirthday.getTime()
          }
          if (typeof ent !== 'number' && ent !== null) {
            this.strongWarningRej.enteringInstituteDate = this.strongWarningRej.enteringInstituteDate.getTime()
          }
          this.fullEntryRej.rejectReasonId = this.fullEntryRej.rejectReasonId.join()
          this.fullEntryRej.rejectReason = this.fullEntryRej.rejectReason.join()
          this.basicInfoRej.strongWarning = this.strongWarningRej
          this.fullEntryRej.basicInfo = this.basicInfoRej
          try {
            const data = await addCustodyInformation(this.fullEntryRej)
            this.$message.success('拒收成功！')
            console.log(this.fullEntryRej, data)
          } catch (error) {
            this.$message.error('拒收失败！')
          }
          this.getCustodyInformationList()
          this.rejectionDialog.isInputDialogVisible = false
        } else {
          return false
        }
      })
    },
    // 全项录入

    dialogVisibleFullCancel() {
      this.$refs.fullEntryRuleForm.resetFields()
      this.$refs.fullEntryRef.resetFields()
      this.$refs.stopPrecepts.resetFields()
      this.matches = [
        {
          personName: '',
          certificateTypeName: '',
          certificateNumber: ''
        }
      ]
      this.storages = [
        {
          itemName: '',
          itemCount: '',
          itemUnit: ''
        }
      ]
      this.fullEntryDialog.isFullEntryDialogVisible = false
    },
    dialogVisibleFullEnter() {
      this.$refs.fullEntryRuleForm.validate((valid) => {
        if (valid) return valid
        else {
          return this.$message.error('请填写必填项')
        }
      })
      this.$refs.fullEntryRef.validate(async (valid) => {
        if (valid) {
          this.fullEntry.custodyStatus = 3
          this.forms()
          try {
            const data = await addCustodyInformation(this.fullEntry)
            console.log(
              this.fullEntry,
              this.strongWarning.drugDetoxificationTermRange,
              data
            )
          } catch (error) {
            this.$message.error('拒收失败！')
          }
          this.getCustodyInformationList()
          this.fullEntryDialog.isFullEntryDialogVisible = false
        } else {
          return this.$message.error('请填写必填项')
        }
      })
    },
    // 上传体表图片
    ipdateImg(response, fileList) {
      try {
        console.log(response)
        const imagePath = response.data
        this.fullEntry.bodys.push({ imagePath: imagePath })
        this.$message.success('上传图片成功！')
      } catch (error) {
        this.$message.error('上传图片失败！')
        console.log(error)
      }
      console.log(fileList, Response)
    },
    // 身份信息
    IdInfo(v) {
      if (
        !(
          v.certificateTypeName === '居民身份证' ||
          v.certificateTypeName === '临时居民身份证'
        )
      ) {
        return
      }
      if (v.certificateNumber === '') {
        v.personSex = ''
        v.personBirthday = ''
        this.$forceUpdate()
        return false
      }
      const y = v.certificateNumber.slice(6, 10)
      const m = v.certificateNumber.slice(10, 12)
      const d = v.certificateNumber.slice(12, 14)
      const sex = v.certificateNumber.slice(16, 17)
      if (sex % 2 === 1) {
        v.personSex = '男'
      } else {
        v.personSex = '女'
      }
      v.personBirthday = new Date([y, m, d].join('-'))
      this.$forceUpdate()
      console.log(v.certificateNumber, v.personBirthday, v.personSex)
    },
    // 添加物品
    addGoodsItem(good) {
      console.log(good)
      if (good.itemUnit && good.itemName && good.itemCount) {
        const template = {
          itemName: '',
          itemCount: '',
          itemUnit: ''
        }
        this.storages.push(template)
      } else {
        this.$message.error('请输入内容!')
      }
    },
    deleteGoodItem(scope, index) {
      console.log(index)
      this.storages.splice(index, 1)
    },
    // 删除
    async delGoodsItem(scope) {
      try {
        const data = await goodsDelete(scope.id)
        console.log(scope, data)
        this.$message.success('删除成功！')
      } catch (error) {
        this.$message.error('删除失败!')
        console.log(error)
      }
      this.storages = this.storages.filter((v) => {
        v.id !== scope.id
      })
    },
    fullAccompDialogEnter() {
      this.fullEntryDialog.isFullAccompliceVisible = false
    },
    // 添加同案人员
    addAccpItem(Accomplice) {
      if (
        Accomplice.personName &&
        Accomplice.certificateTypeName &&
        Accomplice.certificateNumber
      ) {
        const _accomplice = {
          personName: '',
          certificateTypeName: '',
          certificateNumber: '',
          certificateTypeId: ''
        }
        this.matches.push(_accomplice)
      } else {
        this.$message.error('请输入内容！')
      }
    },
    // 删除
    async delAccpItem(scope) {
      try {
        await accpDelete(scope.id)
        this.$message.success('删除成功！')
      } catch (error) {
        this.$message.error('删除失败!')
        console.log(error)
      }
      this.matches = this.matches.filter((v) => {
        v.id !== scope.id
      })
      console.log(this.matches)
    },
    // 转入信息，全项录入，不予收戒
    selectedValue(i) {
      this.selected = i
      if (i === 0) {
        console.log('a')
      } else if (i === 1) {
        // this.basicInfo = { homes: [{}, {}] }
        // this.strongWarning = {
        //   limitation: [],
        //   caseHandlers: [{}, {}]
        // }
        // console.log(this.basicInfo, this.strongWarning)
        // this.fullEntryDialog.isFullEntryDialogVisible = true
        this.custodyType = 'register'
        this.addFormDialog = true
      } else if (i === 2) {
        this.basicInfo = { homes: [{}, {}] }
        this.strongWarning = {
          limitation: [],
          caseHandlers: [{}, {}]
        }
        this.rejectionDialog.isInputDialogVisible = true
      } else {
        return false
      }
    },
    // 查询同案人员
    FullAccomplice() {
      // const { data: res } = await personCustodyMatchInfomationList();
      // this.matches = res;
      // console.log(res);
      // this.fullEntryDialog.isFullAccompliceVisible = true
    },
    val(v) {
      console.log(v, this.uploadShow)
    },
    selectValue(v) {
      console.log(v)
    },
    changeMatches(val) {
      this.matches[
        this.matches.length - 1
      ].certificateTypeId = this.dictInfo.ID.dic.find(
        (item) => item.dictionaryName === val
      ).id
    },
    changecertificateTypeName(val) {
      this.basicInfo.certificateTypeId = this.dictInfo.ID.dic.find(
        (item) => item.dictionaryName === val
      ).id
      this.basicInfoRej.certificateTypeId = this.dictInfo.ID.dic.find(
        (item) => item.dictionaryName === val
      ).id
    },
    changeCaseHandlingUnitName(val) {
      this.strongWarning.caseHandlingUnitId = this.dictInfo.caseUnit.dic.find(
        (item) => item.dictionaryName === val
      ).id
      this.strongWarningRej.caseHandlingUnitId = this.dictInfo.caseUnit.dic.find(
        (item) => item.dictionaryName === val
      ).id
    },
    changeCaseHandlingUnitTypeName(val) {
      this.strongWarning.caseHandlingUnitTypeId = this.dictInfo.worksType.find(
        (item) => item.dictionaryName === val
      ).id
      this.strongWarningRej.caseHandlingUnitTypeId = this.dictInfo.worksType.find(
        (item) => item.dictionaryName === val
      ).id
    },
    changeDecisionOfficeName(val) {
      this.strongWarning.decisionOfficeId = this.dictInfo.decision.dic.find(
        (item) => item.dictionaryName === val
      ).id
      this.strongWarningRej.decisionOfficeId = this.dictInfo.decision.dic.find(
        (item) => item.dictionaryName === val
      ).id
    },
    getIdByName(arr, val, key, obj) {
      if (val instanceof Array) {
        obj[key] = []
        val.forEach((v) => {
          obj[key].push(arr.find((item) => item.dictionaryName === v).id)
        })
      } else {
        obj[key] = arr.find((item) => item.dictionaryName === val).id
      }
    },
    changeBodybox(val) {
      if (val === '正常') {
        this.bodyStatus = this.bodyStatus.filter((item) => item === '正常')
      } else {
        this.bodyStatus = this.bodyStatus.filter((item) => item !== '正常')
      }
    },
    onImageRemove(file) {
      this.fullEntry.bodys = this.fullEntry.bodys.filter(
        (item) => item.imagePath === file.response.url
      )
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .vue-treeselect__control,
::v-deep .vue-treeselect__placeholder,
::v-deep .vue-treeselect__single-value {
  height: 30px;
  line-height: 30px;
}
.head-container {
  display: flex;
  justify-content: flex-start;
  div:nth-child(1) {
    .el-button {
      width: 100px;
      height: 36px;
      font-size: 14px;
      font-family: Microsoft YaHei;
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
    background: rgba(241, 242, 244, 1);
    border-radius: 16px;
    margin-left: 16px;
    ::v-deep .el-input__inner {
      border-radius: 16px;
      height: 36px;
    }
  }
}
.search {
  .el-button {
    float: right;
    margin-left: 15px;
    width: 75px;
    height: 34px;
    border-radius: 5px;
  }
}
::v-deep .reject-dialog {
  width: 1470px;
  // height: 640px;
  .el-dialog__header {
    background: rgba(204, 204, 204, 1);
    padding: 0;
    height: 80px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    .el-dialog__close {
      font-size: 30px;
    }
  }
  .el-select,
  .el-date-editor {
    width: 300.66px !important;
  }
  .el-dialog__body {
    padding: 20px 36px 0 36px;
  }
  .form_box1 {
    height: 20px;
    border-left: 4px solid #0070f4;
    padding-left: 14px;
    line-height: 20px;
    margin: 10px 0;
  }
  .el-form {
    margin: 30px 0;
    .el-form-item__label {
      width: 126px;
      // height: 12px;
      white-space: nowrap;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #666666;
      // line-height: 16px;
    }
    .el-select {
      width: 332.5px;
    }
    .el-input,
    .el-input__inner {
      // width: 300px;
      // height: 36px;
      // border: 1px solid rgba(201, 208, 222, 1);
      border-radius: 3px;
    }
    .el-row {
      .el-col {
        img {
          border: 0;
          width: 120px;
          height: 120px;
          margin-right: 5px;
          border-radius: 5px;
        }
      }
    }
    .el-upload-list {
      .el-upload-list__item {
        width: 120px;
        height: 120px;
      }
    }
  }
  .el-dialog__footer {
    border-top: 1px solid rgba(242, 242, 242, 1);
    padding: 0;
    // display: flex;
    // justify-content: flex-end;
    // line-height: 74px;
    .dialog-footer {
      display: flex;
      justify-content: space-between;
      line-height: 90px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #666666;
      div:nth-child(1) {
        margin-left: 105px;
        .el-input {
          width: 120px;
          height: 40px;
          // border: 0.5px solid rgba(201, 207, 222, 1);
          border-radius: 5px;
          margin: 0 20px 0 20px;
          line-height: 40px;
          .el-input__inner {
            border: 0.5px solid rgba(201, 207, 222, 1);
            height: 40px;
          }
        }
      }
      div:nth-child(2) {
        margin-right: 48px;
        .el-button {
          width: 88px;
          height: 40px;
          border: 1px solid rgba(204, 204, 204, 1);
          border-radius: 5px;
        }
      }
    }
  }
  .el-table__fixed-right {
    width: 240px;
    height: 100% !important;
  }
}
::v-deep .rejection_Dialog {
  height: 500px;
  width: 31.3%;
  .el-dialog__header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #f2f2f2;
    .el-dialog__title {
      margin-left: 50px;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }
  .el-dialog__body {
    height: 330px;
    .el-form {
      width: 500px;
      margin: 30px 15px;
      .el-input {
        width: 500px;
        height: 40px;
        border-radius: 5px;
      }
    }
  }
  .el-dialog__footer {
    display: flex;
    justify-content: flex-end;
    .dialog-footer {
      margin-right: 24px;
    }
  }
}
// ::v-deep .el-select,
// .el-date-editor {
//   width: 300.66px !important;
// }
// ::v-deep .el-upload {
//   width: 80px;
//   height: 80px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }
::v-deep .RegisterAccomp {
  width: 1196px;
  background: rgba(255, 255, 255, 1);
  .el-dialog__body {
    padding: 0 36px 0 36px;
  }
  .el-dialog__header {
    width: 0;
    height: 0;
  }
  th {
    background-color: #f2f2f2;
  }
  .el-dialog__footer {
    button {
      width: 88px;
      height: 40px;
      background: rgba(0, 112, 244, 1);
      border-radius: 5px;
      transform: translate(958px, -12px);
    }
  }
}
// ::v-deep .el-range-separator {
//   width: 40px !important;
//   line-height: 27px !important;
// }
.limit {
  position: static;
  margin-top: 20px;
}
</style>
