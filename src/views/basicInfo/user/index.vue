<template>
  <div class="user">
    <el-row :xs="15" :sm="18" :md="19" :lg="20" :xl="20">
      <el-col :span="2">
        <el-button
          size="mini"
          type="primary"
          @click="isShowUserDialog = true"
        >
          新增用户
        </el-button>
      </el-col>
      <el-col :span="12" :offset="1">
        <el-input
          v-model="userQueryForm.query"
          class="query-input"
          placeholder="请输入姓名或警号"
          @keyup.enter.native="queryUser"
          @input="queryUser"
        />
      </el-col>
      <!-- <el-col
        :span="2"
        :offset="2"
        style="color:#666;font-size:11px;line-height:30px"
      >
        批量导入用户
      </el-col> -->
      <el-col :span="2">
        <upload-excel-component :on-success="handleSuccess" />
      </el-col>
      <el-col :span="3" :offset="1">
        <el-button
          size="mini"
          class="download-template-btn"
          @click="downloadTemplate"
        >
          批量导入模板下载
        </el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20" :xs="15" :sm="18" :md="19" :lg="20" :xl="20" style="margin-top:15px">
      <el-col>
        <el-table
          v-loading="loading"
          :data="userList"
          style="font-size:11px"
          header-cell-class-name="header-row"
        >
          <el-table-column label="警号" prop="policeCode" align="center" />
          <el-table-column label="姓名" prop="userName" align="center" />
          <el-table-column label="角色" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-for="(v, i) in scope.row.roleList" :key="i">
                {{ v.roleName }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="指纹录入情况"
            prop="existFingerprint"
            align="center"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.existFingerprint === 1" class="info-desc">
                <el-tag @click="editBioinformaticsDialog(scope.row)">修改生物信息</el-tag>
              </div>
              <div v-else-if="scope.row.existFingerprint === 2 || 'null'" class="info-desc">

                <!-- <div class="info-desc-tag info-desc-tag-fail" /> -->
                <el-tag type="success" @click="editBioinformaticsDialog(scope.row)">录入生物信息</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="人脸录入情况" prop="existFace" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.existFace === 1" class="info-desc">

                <!-- <div class="info-desc-tag info-desc-tag-success" @click="editBioinformaticsDialog(scope.row)">
                  修改生物信息
                </div> -->
                <el-tag @click="editBioinformaticsDialog(scope.row)">修改生物信息</el-tag>

              </div>
              <div v-else-if="scope.row.existFace === 2 || 'null'" class="info-desc">

                <!-- <div class="info-desc-tag info-desc-tag-fail" @click="editBioinformaticsDialog(scope.row)">
                  录入生物信息
                </div> -->
                <el-tag type="success" @click="editBioinformaticsDialog(scope.row)">录入生物信息</el-tag>

              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300" align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click="editUserDialog(scope.row.id)"
              >
                修改
              </el-button>
              <el-button v-if="scope.row.state === 2" type="text" size="mini" @click="changeUserState(scope.row)">
                启用
              </el-button>
              <el-button v-else-if="scope.row.state === 1" type="text" size="mini" @click="changeUserState(scope.row)">
                停用
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="resetUserPassword(scope.row)"
              >
                重置密码
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <pagination
      v-cloak
      :current-page="pageNo"
      :total="total"
      :limit.sync="resultSize"
      :layout="layout"
      @pagination="pagination"
    />

    <!-- 新增和修改用户弹出框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="isShowUserDialog"
      custom-class="user-dialog"
      :modal-append-to-body="false"
      @close="hideUserDialog"
    >
      <el-row>
        <el-form
          ref="addUserFormRef"
          :inline="true"
          :model="addUserForm"
          :rules="addUserFormRules"
          label-width="80px"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="警号" prop="policeCode">
                <el-input v-model.trim="addUserForm.policeCode" placeholder="请输入警号" @change="checkPlaceCode" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名" prop="userName">
                <el-input
                  v-model.trim="addUserForm.userName"
                  placeholder="请输入姓名"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="12">
              <el-form-item label="用户电话" prop="userPhone">
                <el-input v-model="addUserForm.userPhone" placeholder="请输入电话" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="用户邮箱" prop="userEmail">
                <el-input v-model="addUserForm.userEmail" placeholder="请输入邮箱" />
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-row>
            <el-col :span="9" />
          </el-row>
          <el-col>
            <el-form-item label="角色">
              <el-row>
                <el-col :span="20" :offset="4">
                  <el-checkbox-group v-model="checkedRoles">
                    <el-checkbox v-for="(v) in allRolesList" :key="v.id" :label="v.id">
                      {{ v.roleName }}
                    </el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUserSubmit">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!-- 重置密码和停用用户弹出框 -->
    <!-- <Dialog
      :dialog-visible="isShowComponentDialog"
      :title="ComponentDialog.title"
      :desc="ComponentDialog.desc"
      :class-name="ComponentDialog.className"
      @success="sendComponentDialog"
      @close="componentDialogClose"
    /> -->
    <!-- 登记生物信息弹出框 -->
    <el-dialog
      title="登记生物信息"
      :visible.sync="isShowBioinformaticsDialog"
      custom-class="user-dialog"
      @close="hideBioinformaticsDialog"
    >
      <el-row>
        <el-col>
          <span class="bioinformatics-title">基本信息</span>
        </el-col>
      </el-row>
      <el-form
        ref="addUserFormRef"
        :inline="true"
        :model="BioinformaticsForm"
        :rules="BioinformaticsFormRules"
      >
        <el-row style="margin-top:15px">
          <el-col :span="12">
            <el-form-item label="警号" prop="id">
              <el-input
                v-model="BioinformaticsForm.policeCode"
                placeholder="请输入警号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="username">
              <el-input
                v-model="BioinformaticsForm.userName"
                placeholder="请输入姓名"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <span class="bioinformatics-title">生物信息登记</span>
          </el-col>
        </el-row>
        <el-row style="margin-top:15px">
          <el-col :span="11">
            <el-row>
              <el-col :span="6" style="line-height:66px">
                指纹录入
              </el-col>
              <el-col :span="12" :offset="1">
                <el-form-item>

                  <div class="bioinformatics-box bioinformatics-fingerprint" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-row>
              <el-col :span="6" style="line-height:66px">
                人脸录入
              </el-col>
              <el-col :span="12" :offset="1">
                <el-form-item>
                  <div class="bioinformatics-box bioinformatics-face" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isShowUserDialog = false">
          提交信息
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import axios from 'axios'
import Pagination from '@/components/Pagination'
// import Dialog from '../component/dialog'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { addUser, changeState, resetUserPassword, bindRole, queryUser, editUser, findPolice } from '@/api/basic/user.js'
import { getAllRolesList } from '@/api/basic/role.js'
export default {
  components: {
    Pagination,
    UploadExcelComponent
  },
  data() {
    // 手机号码表单校验规则
    const validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'))
      } else {
        const reg = /^1(3|4|5|6|7|8|9)\d{9}$/
        if (!reg.test(value)) {
          callback(new Error('请输入正确的手机号码格式'))
        }
        callback()
      }
    }
    return {
      userQueryForm: {
        query: ''
      },
      userList: [],
      // 添加用户对话框
      isShowUserDialog: false,
      // 生物信息登记修改框
      isShowBioinformaticsDialog: false,
      // 生物信息表单
      BioinformaticsForm: {
        policeCode: '',
        userName: ''
      },
      addUserForm: {
        policeCode: '',
        userName: '',
        userType: '1'
        // userEmail: '',
        // userPhone: ''
      },
      // 用户角色数组
      checkedRoles: [],
      addUserFormRules: {
        policeCode: [{ required: true, message: '请输入警号', trigger: 'blur' }],
        userName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        userPhone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        userEmail: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ]
      },
      // 生物信息表单校验规则
      BioinformaticsFormRules: {
        id: [{ required: true, message: '请输入警号', trigger: 'blur' }],
        username: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
      },
      allRolesList: [],
      dialogTitle: '添加用户',
      pageNo: 1,
      resultSize: 10,
      total: 0,
      loading: false,
      findPoliceCodeTimer: null,
      isPoliceCode: false,
      // 分页配置项
      layout: 'prev, pager, next, jumper, sizes'

    }
  },
  created() {
    // axios.get('/mock/user').then(({ data }) => {
    //   this.userList = data.content
    // })
    // axios.get('/mock/roles').then(({ data }) => {
    //   this.allRolesList = data
    // })

    // this.getUserList()
    this.getRolesList()
    queryUser({
      pageNo: this.pageNo,
      resultSize: this.resultSize
    }).then((data) => {
      this.userList = data.records.filter(item => {
        return item.state !== 3
      })
      this.total = data.total
      this.loading = false
    })
  },
  methods: {
    // 获取用户列表
    async getUserList(params) {
      this.userList = []
      const data = await queryUser(params)
      this.userList = data.records.filter(item => {
        return item.state !== 3
      })
      this.total = data.total
    },
    // 获取角色列表
    getRolesList() {
      getAllRolesList().then(roles => {
        this.allRolesList = roles
      }).catch(e => {
        console.log(e)
      })
    },
    editUserDialog(id) {
      this.dialogTitle = '修改用户'
      const user = this.userList.find(item => {
        return item.id === id
      })
      const roles = []
      if (user.roleList) {
        user.roleList.forEach(item => {
          roles.push(item.id)
        })
      }
      this.addUserForm = {
        ...user,
        policeCode: user.policeCode,
        userName: user.userName
      }
      this.checkedRoles = roles
      this.isShowUserDialog = true
    },
    hideUserDialog() {
      this.addUserForm = {
        policeCode: '',
        userName: '',
        userType: '1'
      }
      this.dialogTitle = '添加用户'
      this.checkedRoles = []
      this.$refs.addUserFormRef.resetFields()
    },
    // 模板文件下载
    downloadTemplate() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['警号', '姓名', '角色']
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
    // excel上传成功函数
    handleSuccess({ results, header }) {
      // let temp = null
      console.log(results)
      let tempData = []
      results.forEach(item => {
        tempData.push(item['警号'])
      })
      tempData = [...new Set(tempData)]
      console.log(tempData)
      results.forEach(async (item, index) => {
        const id = this.allRolesList.filter(v => {
          return v.roleName === item['角色']
        })
        // if (id.length === 0) return this.$message.error('角色必填项')
        if (tempData[index] !== item['警号']) return
        const data = {
          policeCode: item['警号'],
          userName: item['姓名']
        }
        const time = 100 * index
        setTimeout(async () => {
          this.loading = false
          // const res = await addUser(data)
          new Promise((resolve, reject) => {
            addUser(data).then(async res => {
              if (!id.permissionIds) return
              await bindRole({
                roleIds: [id[0].id],
                id: res.data
              })
            }).finally(() => {
              this.loading = false
              this.getUserList({
                resultSize: this.resultSize,
                pageNo: this.pageNo
              })
            })
          })
        }, time)
      })
      // if (temp.code === 2000) {
      //   return this.$message.success('批量导入成功')
      // }
    },
    // 关闭封装的弹出框
    // componentDialogClose() {
    //   this.ComponentDialog = {}
    //   this.isShowComponentDialog = false
    // },
    // 点击封装组件的弹出框
    // async sendComponentDialog() {
    //   this.ComponentDialog = {}
    //   const res = await changeState({
    //     state: 2,
    //     policeCode: data.policeCode,
    //     id: data.id
    //   })
    //   console.log(res)
    //   this.isShowComponentDialog = false
    // },
    // 改变用户状态
    changeUserState(data) {
      if (data.state === 1) {
        this.$confirm('执行停用操作后用户将无法登录平台，是否确定停用该用户？', '是否确定停用该用户？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          customClass: 'user-confirm'
        }).then(async () => {
          await changeState({
            state: 2,
            policeCode: data.policeCode,
            id: data.id
          })
          this.getUserList({})

          this.$message({
            type: 'success',
            message: '更新成功!'
          })
        })
      } else if (data.state === 2) {
        this.$confirm('执行启用操作后用户将可以登录平台，是否确定启用该用户？', '是否确定启用该用户？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          customClass: 'user-confirm'
        }).then(async () => {
          await changeState({
            state: 1,
            policeCode: data.policeCode,
            id: data.id
          })
          this.getUserList({})

          this.$message({
            type: 'success',
            message: '更新成功!'
          })
        })
      }
    },
    // 重置密码
    resetUserPassword(data) {
      this.$confirm('重置密码后，用户密码将变为初始密码666666，是否重置密码？', '是否重置密码？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        console.log(data)
        const res = await resetUserPassword(data.id)
        console.log(res)
        this.$message({
          type: 'success',
          message: '重置密码成功!'
        })
      })
    },
    // 关闭登记生物信息弹出框
    hideBioinformaticsDialog() {
      this.isShowBioinformaticsDialog = false
    },
    pagination(val) {
      const params = Object.assign(val, {
        key: this.userQueryForm.query
      })
      this.pageNo = val.pageNo
      this.resultSize = val.resultSize
      console.log(params)
      // this.getJourmalList(params)
      this.getUserList(params)
    },
    // 添加用户
    async addUserSubmit() {
      if (this.dialogTitle === '添加用户') {
        this.$refs.addUserFormRef.validate(valid => {
          if (!valid) return
          // if (this.checkedRoles.length === 0) return this.$message.error('至少选择一个角色')
          if (!this.isPoliceCode) return this.$message.error('警号已存在，请修改')
          this.addUser()
        })
      } else if (this.dialogTitle === '修改用户') {
        this.editUser()
      }
    },
    // 查询用户
    queryUser() {
      // if (this.userQueryForm.query === '') {
      //   this.getUserList()
      // }
      const params = {
        pageNo: this.pageNo,
        resultSize: this.resultSize,
        key: this.userQueryForm.query
      }
      queryUser(params).then((data) => {
        this.userList = data.records
      })
    },
    // 添加用户
    async addUser() {
      try {
        const res = await addUser(this.addUserForm)
        setTimeout(async() => {
          if (this.checkedRoles.length !== 0) {
            await bindRole({
              roleIds: this.checkedRoles,
              id: res
            })
          }
          this.getUserList({
            resultSize: this.resultSize,
            pageNo: this.pageNo
          })
          this.$message.success('创建用户成功')
          this.isShowUserDialog = false
        }, 100)
        // const temp = await queryUserForId(res.data)
        // if (this.userList.length !== 10) {
        //   this.userList.push(temp.data)
        // }
      } catch (e) {
        console.log(e)
      }
    },
    // 编辑用户
    async editUser() {
      try {
        await editUser(this.addUserForm)

        await bindRole({
          roleIds: this.checkedRoles,
          id: this.addUserForm.id
        })
        this.$message.success('修改用户成功')
        this.getUserList({
          resultSize: this.resultSize,
          pageNo: this.pageNo
        })
        this.isShowUserDialog = false
      } catch (e) {
        console.log(e)
      }
    },
    // 修改生物信息弹出框
    editBioinformaticsDialog(data) {
      console.log(data)
      this.BioinformaticsForm = {
        policeCode: data.policeCode,
        userName: data.userName
      }
      this.isShowBioinformaticsDialog = true
    },
    // 校验警号是否存在
    checkPlaceCode() {
      clearTimeout(this.findPoliceCodeTimer)
      if (!this.addUserForm.policeCode) return
      this.findPoliceCodeTimer = setTimeout(async () => {
        findPolice(this.addUserForm.policeCode).then(data => {
          console.log(data)
          if (!data) {
            this.isPoliceCode = true
          } else {
            this.isPoliceCode = false
          }
        })
      }, 100)
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/assets/styles/index";

::v-deep.user {
  padding: 24px;
  font-size: 11px;
  height: 800px;
  background-color: #fff;
  .query-input {
    height: 25px;
    .el-input__inner {
      height: 100%;
      width: 230px;
      line-height: 1;
    }
  }
  .info-desc {
    font-size: 11px;
    color: #777;
    .info-desc-tag {
      position: relative;
      display: inline-block;
      padding-left: 10px;
      width: 92px;
      height: 23px;
      background: rgba(242, 242, 242, 1);
      border-radius: 2px;
      cursor: pointer;
      &::before {
        position: absolute;
        top: 50%;
        left: 8%;
        transform: translate(-50%, -50%);
        content: '';
        width: 5px;
        height: 5px;
        border-radius: 50%;
      }
    }
    .info-desc-tag-success {
      &::before {
        background: rgba(0, 112, 244, 1);
      }
    }
    .info-desc-tag-fail {
      &::before {
        background: rgba(25, 190, 107, 1);
      }
    }
  }
  .header-row {
    background-color: #f2f2f2;
  }
  .user-dialog {
    .el-dialog__header {
      padding: 0;
      height: 55px;
      line-height: 55px;
      text-align: center;
      font-size: 29px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      background: #f2f2f2;
      color: rgba(51, 51, 51, 1);
    }
    .el-dialog__footer {
      border-top: 1px solid #f2f2f2;
      text-align: center;
    }
    .bioinformatics-title {
      padding-left: 15px;
      &::before {
        content: '';
        position: absolute;
        left: 7px;
        background-color: $blue;
        height: 20px;
        width: 2px;
      }
    }
    .bioinformatics-box {
      width: 66px;
      height: 66px;
      border: 2px solid rgba(228, 228, 228, 1);
      border-radius: 9px;
    }
    .bioinformatics-fingerprint {
      background: url('../../../assets/images/fingerprint.png') no-repeat center;
    }
    .bioinformatics-face {
      background: url('../../../assets/images/face.png') no-repeat center;
    }
  }
  .download-template-btn {
    color:$blue;
    border:1px solid rgba(0,112,244,.2)
  }
}
[v-cloak] {
    display: none;
}
</style>
