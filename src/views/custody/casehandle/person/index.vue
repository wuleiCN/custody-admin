<template>
  <div class="custody-person">
    <el-card style="margin-top:23px">
      <el-row :gutter="20" class="header-row">
        <el-col :span="5">
          <span>搜索:</span>
          <!-- <el-select v-model="queryForm.organizationId" clearable @change="conditionPersonCaseHandlerList">
          <el-option v-for="v in dict['1000000000006']" :key="v.id" :label="v.dictionaryName" :value="v.id" />
        </el-select> -->
          <el-input
            v-model="queryForm.caseHandlerName"
            placeholder="请输入姓名"
            suffix-icon="el-icon-search"
            class="header-top-input"
            @change="conditionPersonCaseHandlerList"
            @keyup.enter.native="conditionPersonCaseHandlerList"
          />
        </el-col>
        <el-col :span="6">
          <span>办案单位类型: </span>
          <el-select v-model="caseHandleTypeId" clearable class="header-top-input" @change="changeSelectHandle">
            <el-option v-for="v in caseHandleTypeList" :key="v.id" :label="v.dictionaryName" :value="v.id" />
          </el-select>
        </el-col>
        <el-col :span="5">
          <span>办案单位: </span>
          <el-select v-model="queryForm.organizationId" class="header-top-input" clearable @change="conditionPersonCaseHandlerList">
            <el-option v-if="!caseHandleTypeId" label="请先选择办案单位类型" value="请先选择办案单位类型" disabled />
            <el-option v-for="v in caseUnitHandleList" :key="v.id" :label="v.dictionaryName" :value="v.id" />
          </el-select>
        </el-col>
      </el-row>
    </el-card>
    <el-card style="margin-top:24px">
      <el-row class="header-row-top">
        <el-col :span="3">数据列表({{ total }}条)</el-col>
        <el-col :span="2" :offset="15">
          <el-button type="primary" @click="AddCasePersonDialog">新增办案人员</el-button>
        </el-col>
        <el-col :span="2">
          <Upload-excel-component style="margin-right:20px" :on-success="handleSuccess" />
        </el-col>
        <el-col :span="2">
          <el-button @click="downloadTemplate">下载导入模板</el-button>
        </el-col>
      </el-row>
      <el-row class="header-row-top">
        <el-col>
          <el-table v-loading="loading" :data="PersonCaseHandlerList">
            <el-table-column prop="caseHandlerName" label="姓名" align="center" />
            <el-table-column prop="sex" label="性别" align="center" />
            <el-table-column prop="certificateName" label="证件类型" align="center" />
            <el-table-column prop="certificateNumber" label="证件号码" align="center" />
            <el-table-column prop="phone" label="手机号码" align="center" />
            <el-table-column prop="organization" label="办案单位" align="center" />
            <el-table-column prop="department" label="部门" align="center" />
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="editCaseHandlerDialog(scope.row)">修改信息</el-button>
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
    </el-card>
    <!-- 新增和编辑办案人员弹窗 -->
    <el-dialog :title="CasePersonDialogTitle" :visible.sync="isShowCasePersonDialog" width="38%" class="case-person-dialog" center @close="hiddenDialog">
      <el-form ref="CasePersonFormRef" :rules="CasePersonFormRules" :model="CasePersonForm" label-width="80px" label-position="top">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="caseHandlerName" label="姓名">
              <el-input v-model="CasePersonForm.caseHandlerName" placeholder="请输入姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别">
              <el-select v-model="CasePersonForm.sex">
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="phone" label="手机号码">
              <el-input v-model="CasePersonForm.phone" placeholder="请输入手机号码" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="证件类型">
              <el-select v-model="CasePersonForm.certificateTypeId" clearable>
                <!-- <el-option label="身份证" value="身份证" /> -->
                <el-option v-for="v in certificateTypeList" :key="v.id" :label="v.dictionaryName" :value="v.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="certificateNumber" label="证件号码">
              <el-input v-model="CasePersonForm.certificateNumber" placeholder="请输入证件号码" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">

          <el-col :span="8">
            <el-form-item label="办案单位类型">
              <el-select v-model="personFormCaseHandleTypeId" clearable @change="changeSelectHandle">
                <!-- <el-option label="公安局" value="公安局" /> -->
                <el-option v-for="v in caseHandleTypeList" :key="v.id" :label="v.dictionaryName" :value="v.id" />
              </el-select>
              <!-- <el-cascader
                v-model="CasePersonForm.organizationId"
                :options="caseHandleList"
                :props="{ expandTrigger: 'hover',label:'dictionaryName',value:'id', checkStrictly: true }"
                clearable
              /> -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="organizationId" label="办案单位">
              <el-select v-model="CasePersonForm.organizationId" clearable>
                <el-option v-if="!personFormCaseHandleTypeId" label="请先选择办案单位类型" value="请先选择办案单位类型" disabled />
                <el-option v-for="v in personFormCaseUnitHandleTypeId" :key="v.id" :label="v.dictionaryName" :value="v.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="部门">
              <el-input v-model="CasePersonForm.department" placeholder="请输入所在部门" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer">
        <div class="dialog-footer">
          <el-row :gutter="20">
            <!-- <el-col :span="5">
              <span class="desc">操作员：{{ CasePersonDialogFooterForm.operator }}</span>
            </el-col>
            <el-col :span="5">
              <span class="desc">警号：{{ CasePersonDialogFooterForm.policeCode }}</span>
            </el-col> -->
            <el-col :span="16">
              <Footer />
            </el-col>
            <el-col :span="8">
              <el-button @click="isShowCasePersonDialog = false">取消</el-button>
              <el-button type="primary" @click="submit">确 定</el-button>
            </el-col>
          </el-row>
        </div>

      </span>
    </el-dialog>
  </div>

</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import Pagination from '@/components/Pagination'
import Footer from '@/components/Footer'
import { mapGetters, mapActions } from 'vuex'
// 登录人信息
// import { getInfo } from '@/api/login'
// 字典
import { getDictDesc } from '@/api/basic/dict'
// 办案人员管理
import { addPersonCaseHandlerInfomation, personCaseHandlerInfomation, updatePersonCaseHandler, addListPersonCaseHandlerInfomation } from '@/api/custody/casehandle/person'
export default {
  components: {
    UploadExcelComponent,
    Pagination,
    Footer
  },
  data() {
    var checkPhone = (rule, value, callback) => {
      const reg = /^1[3456789]\d{9}$/
      if (value === '') {
        callback(new Error('请输入手机号码'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }
    var checkCertificateNumber = (rule, value, callback) => {
      if (!/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value) &&
    (this.CasePersonForm.certificateTypeId === 1000000000000 || this.CasePersonForm.certificateTypeId === 1000000000001)) {
        callback(new Error('请输入正确的身份证号码'))
      } else {
        callback()
      }
    }
    return {
      // 查询数据项
      queryForm: {
        organizationId: '',
        caseHandlerName: ''
      },
      //   办案人员列表
      PersonCaseHandlerList: [],
      // 办案单位列表
      caseHandleList: [],
      // 办案单位类型id
      caseHandleTypeId: null,
      // 办案单位类型列表
      caseHandleTypeList: [],
      // 证件类型字典列表
      certificateTypeList: [],
      //   分页
      pageNo: 1,
      total: 100,
      resultSize: 10,
      layout: 'prev, pager, next, jumper, sizes',
      //   是否展示编辑和新增办案人员弹框
      isShowCasePersonDialog: false,
      //   办案人员弹框标题
      CasePersonDialogTitle: '新增办案人员',
      //   被编辑办案人员id
      editCasePersonId: 0,
      // 新增表单时办案类型id
      personFormCaseHandleTypeId: null,
      //   办案人员表单
      CasePersonForm: {
        //   办案人员名称
        caseHandlerName: '',
        // 性别
        sex: '',
        // 电话
        phone: '',
        // 证件名称
        certificateName: '',
        // 证件id
        certificateTypeId: '',
        // 证件号码
        certificateNumber: '',
        // 办案单位名称
        organization: '',
        // 办案单位id
        organizationId: '',
        // 部门
        department: ''
      },
      //   办案人员表单校验
      CasePersonFormRules: {
        caseHandlerName: [{ required: true, message: '请输入办案人员姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入办案人员手机号码', trigger: 'blur' }, { validator: checkPhone, trigger: 'blur' }],
        organizationId: [{ required: true, message: '请输入办案人员单位', trigger: 'blur' }],
        certificateNumber: [{ validator: checkCertificateNumber, trigger: 'blur' }]
      },
      //   弹出框底部不可变表单
      // CasePersonDialogFooterForm: {
      //   operator: '',
      //   policeCode: ''
      // },
      //   表格是否在加载
      loading: false
    }
  },
  computed: {
    ...mapGetters(['dict']),
    caseUnitHandleList() {
      return this.caseHandleList.filter(item => {
        return item.parentId === this.caseHandleTypeId
      })
    },
    personFormCaseUnitHandleTypeId() {
      return this.caseHandleList.filter(item => {
        return item.parentId === this.personFormCaseHandleTypeId
      })
    }
  },
  created() {
    // 获取办案人员列表
    this.getPersonCaseHandlerList()
    // 获取字典明细
    this.getDic()
  },
  mounted() {
  },
  updated() {
  },
  methods: {
    //   vuex存在的字典明细
    ...mapActions(['getDictDesc']),
    //   批量导入模板下载
    downloadTemplate() {
      import('@/vendor/Export2Excel').then((excel) => {
        const tHeader = ['姓名', '手机号码', '办案单位']
        const data = []
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'excel-list',
          autoWidth: true,
          bookType: 'xlsx'
        })
      })
    },
    // 上传成功函数
    handleSuccess({ results, header }) {
      let flag = true
      const res = []
      results.forEach(item => {
        if (!item['姓名'] || !item['手机号码'] || !item['办案单位']) {
          flag = false
          return this.$message.error('姓名，手机号码，办案单位都为必填')
        }
        this.dict['1000000000006'].forEach(v => {
        //   console.log(v.dictionaryName)
          if (v.dictionaryName === item['办案单位']) {
            res.push({
              caseHandlerName: item['姓名'],
              phone: item['手机号码'],
              organization: item['办案单位'],
              organizationId: v.id
            })
          }
        })
      })
      if (flag) {
        addListPersonCaseHandlerInfomation(res).then(() => {
          this.getPersonCaseHandlerList()
        })
      }
    },
    // 分页函数
    pagination(val) {
      this.pageNo = val.pageNo
      this.resultSize = val.resultSize
      this.getPersonCaseHandlerList({ pageNo: this.pageNo, resultSize: this.resultSize })
    },
    // 新增办案人员弹框
    AddCasePersonDialog() {
      this.CasePersonDialogTitle = '新增办案人员'
      this.isShowCasePersonDialog = true
    },
    // 获取字典明细
    async getDic() {
      // 获取办案单位类型字典明细
      //
      if (!this.dict['1000000000006']) {
        //  this.getDictDesc(1000000000006)
        await getDictDesc({
          id: 1000000000006
        }).then(res => {
          // this.$store.commit('SET_DICTITEM', { data: res, key: 1000000000006 })
          this.getDictDesc(1000000000006)
          this.caseHandleTypeList = res.dic
        })
      } else {
        this.caseHandleTypeList = this.dict['1000000000006']
      }
      // 获取办案单位字典明细
      if (!this.dict['10200821000005']) {
        // this.getDictDesc(10200821000005)
        await getDictDesc({
          id: 10200821000005
        }).then(data => {
          // this.$store.commit('SET_DICTITEM', { data: data, key: 10200821000005 })
          this.getDictDesc(10200821000005)
          this.caseHandleList = data.dic
        })
      } else {
        this.caseHandleList = this.dict['10200821000005']
      }

      //   获取证件类型字典明细
      //   getDictDesc({
      //     id: 1000000000021
      //   }).then(data => {
      //     this.certificateTypeList = data.dic
      //   })
      if (!this.dict['1000000000021']) {
        await getDictDesc({
          id: 1000000000021
        }).then(data => {
          this.certificateTypeList = data.dic
          this.getDictDesc(1000000000021)
        })
      } else {
        this.certificateTypeList = this.dict['1000000000021']
      }
      //   获取登录用户信息
      // getInfo().then(res => {
      //   this.CasePersonDialogFooterForm.operator = res.userName
      //   this.CasePersonDialogFooterForm.policeCode = res.policeCode
      // })
    },
    // 弹窗提交按钮
    submit() {
      if (this.CasePersonDialogTitle === '新增办案人员') {
        this.$refs.CasePersonFormRef.validate(valid => {
          if (!valid) return
          this.addSubmit()
        })
      }
      if (this.CasePersonDialogTitle === '修改办案人员信息') {
        this.$refs.CasePersonFormRef.validate(valid => {
          if (!valid) return
          this.editSubmit()
        })
      }
    },
    // 添加办案人员函数
    async addSubmit() {
      // 获取办案单位
      const data = this.caseHandleList.find(item => {
        return item.id === this.CasePersonForm.organizationId
      })
      //   获取证件类型
      if (this.CasePersonForm.certificateTypeId) {
        const res = this.dict['1000000000021'].find(item => {
          return item.id === this.CasePersonForm.certificateTypeId
        })
        this.CasePersonForm.certificateName = res.dictionaryName
      }

      this.CasePersonForm.organization = data.dictionaryName
      this.CasePersonForm.organizationId = data.id
      // console.log(data)
      // console.log(this.CasePersonForm)
      this.loading = false
      await addPersonCaseHandlerInfomation(this.CasePersonForm)
      this.getPersonCaseHandlerList()
      this.loading = false
      this.$message.success('新增办案人员成功')
      this.isShowCasePersonDialog = false
    },
    // 显示编辑人员弹窗
    editCaseHandlerDialog(data) {
      const { caseHandlerName, sex, phone, certificateName, certificateTypeId, certificateNumber, organization, organizationId, department } = data
      this.CasePersonDialogTitle = '修改办案人员信息'
      this.editCasePersonId = data.id
      this.CasePersonForm = {
        //   办案人员名称
        caseHandlerName,
        // 性别
        sex,
        // 电话
        phone,
        // 证件名称
        certificateName,
        // 证件id
        certificateTypeId,
        // 证件号码
        certificateNumber,
        // 办案单位名称
        organization,
        // 办案单位id
        organizationId,
        // 部门
        department
      }
      this.isShowCasePersonDialog = true
    },
    // 编辑办案人员提交函数
    async editSubmit() {
      // 获取办案单位
      // const data = this.dict['1000000000006'].find(item => {
      //   return item.id === this.CasePersonForm.organizationId
      // })

      // 获取办案单位
      const data = this.caseHandleList.find(item => {
        return item.id === this.CasePersonForm.organizationId
      })

      //   获取证件类型
      if (this.CasePersonForm.certificateTypeId) {
        const res = this.dict['1000000000021'].find(item => {
          return item.id === this.CasePersonForm.certificateTypeId
        })
        this.CasePersonForm.certificateName = res.dictionaryName
      }
      this.CasePersonForm.organization = data.dictionaryName
      this.CasePersonForm.organizationId = data.id
      this.loading = false
      await updatePersonCaseHandler({ id: this.editCasePersonId, ...this.CasePersonForm })
      this.getPersonCaseHandlerList()
      this.loading = false
      this.$message.success('修改办案人员成功')
      this.isShowCasePersonDialog = false
    },
    // 弹窗隐藏回调
    hiddenDialog() {
      this.CasePersonForm = {
        //   办案人员名称
        caseHandlerName: '',
        // 性别
        sex: '',
        // 电话
        phone: '',
        // 证件名称
        certificateName: '',
        // 证件id
        certificateTypeId: '',
        // 证件号码
        certificateNumber: '',
        // 办案单位名称
        organization: '',
        // 办案单位id
        organizationId: '',
        // 部门
        department: ''
      }
      this.$refs.CasePersonFormRef.resetFields()
      this.personFormCaseHandleTypeId = null
      this.CasePersonDialogTitle = '新增办案人员'
    },
    // 获取办案人员列表
    getPersonCaseHandlerList(data) {
      const params = Object.assign({ pageNo: 1, resultSize: 10 }, data)
      this.loading = false
      personCaseHandlerInfomation(params).then(data => {
        this.PersonCaseHandlerList = data.records
        this.total = data.total
      }).finally(() => {
        this.loading = false
      })
    },
    // 条件查询办案人员列表
    conditionPersonCaseHandlerList() {
      // const id = this.queryForm.organizationId.length ? this.queryForm.organizationId[this.queryForm.organizationId.length - 1] : ''
      this.getPersonCaseHandlerList({ caseHandlerName: this.queryForm.caseHandlerName, organizationId: this.queryForm.organizationId })
    },
    // 办案单位类型改变时
    changeSelectHandle() {
      if (!this.caseHandleTypeId) {
        this.queryForm.organizationId = null
        this.getPersonCaseHandlerList()
      }
      if (!this.personFormCaseHandleTypeId) {
        this.CasePersonForm.organizationId = null
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep.custody-person {
  // padding: 24px;
  // background-color: unset !important;
  .header-row {
    font-size: 14px;
    line-height: 33px;
  }
  .header-row-top {
    margin-top: 10px;
  }
  .header-top-input {
    margin-left: 10px;
    width: 224px;
  }
  .case-person-dialog {
      .dialog-footer {
          padding-top: 10px;
          .desc {
            display: inline-block;
            height: 32px;
            line-height: 32px;
            font-size: 14px;
          }
      }
      .el-form--label-top .el-form-item__label {
        padding: 0;
      }
      .el-input__inner {
          width: 200px;
      }
  }
}
</style>
