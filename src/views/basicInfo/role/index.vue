<template>
  <div class="roles">
    <el-row :gutter="20">
      <el-col :xs="15" :sm="18" :md="19" :lg="20" :xl="20">
        <el-button
          type="primary"
          size="mini"
          @click="isShowEditDialog = true"
        >
          新增
        </el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col style="margin-top: 15px">
        <el-table
          v-loading="loading"
          :data="rolesList"
          style="width: 100%;font-size:11px"
          header-cell-class-name="header-row"
          max-height="560"
        >
          <el-table-column label="角色" prop="roleName" align="center" />
          <el-table-column label="权限" prop="powers" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-for="(v) in scope.row.permissionList" :key="v.id">
                {{ v.name }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="editRole(scope.row.id)">
                编辑
              </el-button>
              <el-button type="text" @click="delRole(scope.row.id)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <pagination
      :current-page="pageNo"
      :total="total"
      :limit.sync="resultSize"
      :layout="layout"
      @pagination="pagination"
    />
    <!-- 编辑权限弹出框 -->
    <el-dialog
      :visible.sync="isShowEditDialog"
      :title="dialogTitle"
      center
      class="role-dialog"
      @close="cancel"
    >
      <el-row :gutter="20" class="role-dialog-header">
        <el-col :span="3" :offset="2">
          角色名称
        </el-col>
        <el-col :span="16">
          <el-input v-model="form.roleName" />
        </el-col>
      </el-row>
      <el-row style="margin-top:24px">
        <el-col :span="3" :offset="2">
          业务权限
        </el-col>
        <el-col :span="16">
          <el-tree
            v-if="isShowEditDialog"
            ref="roleTreeRef"
            :data="powersList"
            show-checkbox
            node-key="id"
            default-expand-all
            :default-checked-keys="form.defaultCheckoutKeys"
            :props="defaultProps"
          />
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import axios from 'axios'
import Pagination from '@/components/Pagination'
import { addRole, getRolesList, AllPermission, bindPermission, editRole, delRole } from '@/api/basic/role'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      rolesList: [],
      isShowEditDialog: false,
      form: {
        roleName: '',
        defaultCheckoutKeys: []
      },
      powersList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      dialogTitle: '新增角色及权限',
      // 被编辑角色id
      editUserId: 0,
      pageNo: 1,
      resultSize: 10,
      total: 0,
      loading: false,
      // 分页配置项
      layout: 'prev, pager, next, jumper, sizes'

    }
  },
  created() {
    // axios.get('/mock/role').then(({ data }) => {
    //   this.rolesList = data.content
    // })
    // axios.get('/mock/powers').then(({ data }) => {
    //   this.powersList = data.content
    // })
    this.getRolesList()
    this.getAllPermission()
  },
  methods: {
    // 分页查询角色信息
    async getRolesList() {
      try {
        const data = await getRolesList({
          pageNo: this.pageNo,
          resultSize: this.resultSize
        })

        const tempData = []
        data.records.map(item => {
          if (item.state !== 3) {
            tempData.push(item)
          }
        })
        this.rolesList = tempData
        console.log(this.rolesList)
        this.total = data.total
        this.loading = false
      } catch (e) {
        console.log(e)
      }
    },
    // 获取所有权限信息
    async getAllPermission() {
      try {
        const data = await AllPermission()

        // data.data.map((item, index) => {
        //   item.items = data.data[index]
        // })

        this.powersList = data
        console.log(this.powersList)
      } catch (e) {
        console.log(e)
      }
    },
    //   点击编辑按钮
    editRole(id) {
      // 改角色拥有的权限
      const selectedPowers = []
      // 树状数据打平后临时数组
      const newData = []

      this.form.defaultCheckoutKeys = []
      //   获取被点击的角色数据
      const data = this.rolesList.find(item => {
        this.form.roleName = item.roleName
        return item.id === id
      })
      //   获取被点击角色的权限
      data.permissionList && data.permissionList.forEach(item => {
        selectedPowers.push(item.id)
      })
      //   打平权限数组
      // this.powersList.forEach(item => {})
      function flat(data) {
        data.forEach(item => {
          if (item.children.length !== 0) {
            return flat(item.children)
          }
          newData.push(item)
        })
      }
      flat(this.powersList)
      newData.forEach(item => {
        selectedPowers.forEach(value => {
          if (item.id === value) {
            this.form.defaultCheckoutKeys.push(item.id)
          }
        })
      })
      this.isShowEditDialog = true
      this.editUserId = id
      this.dialogTitle = '编辑角色及权限'
    },
    // 对话框取消按钮
    cancel() {
      this.form = {
        roleName: '',
        defaultCheckoutKeys: []
      }
      this.isShowEditDialog = false
      this.dialogTitle = '新增角色及权限'
    },
    // 对话框确定按钮
    submit() {
      const data = this.$refs.roleTreeRef.getCheckedKeys()
      if (this.form.roleName === '') {
        return this.$message({
          type: 'error',
          message: '请输入角色名称'
        })
      }
      if (data.length === 0) {
        return this.$message.error('请至少选择一项权限')
      }
      if (this.dialogTitle === '新增角色及权限') {
        this.addRoleSubmit()
      } else if (this.dialogTitle === '编辑角色及权限') {
        this.editRoleSubmit()
      }
    },
    // 新增角色
    async addRoleSubmit() {
      const checkAry = [...this.$refs.roleTreeRef.getHalfCheckedKeys(), ...this.$refs.roleTreeRef.getCheckedKeys()]

      const res = await addRole({
        roleName: this.form.roleName
      })
      await bindPermission({
        id: res,
        permissionIds: checkAry
      })
      this.$message.success('新增角色成功')
      // const { data: temp } = await findRole(res.data)
      if (this.rolesList.label !== 10) {
        // this.rolesList.push(temp)
        this.getRolesList()
      }
      this.isShowEditDialog = false
    },
    // 编辑角色
    async editRoleSubmit() {
      const checkAry = [...this.$refs.roleTreeRef.getHalfCheckedKeys(), ...this.$refs.roleTreeRef.getCheckedKeys()]
      await editRole({
        id: this.editUserId,
        roleName: this.form.roleName,
        permissionIds: checkAry
      })
      await bindPermission({
        id: this.editUserId,
        permissionIds: checkAry
      })
      // const res = await findRole(this.editUserId)

      // const index = this.rolesList.findIndex(item => {
      //   return item.id === this.editUserId
      // })
      // this.rolesList.splice(index, 1)
      // this.rolesList.splice(index, 0, res.data)
      this.getRolesList()
      this.$message.success('修改角色成功')
      this.isShowEditDialog = false
    },
    // 删除角色按钮
    delRole(id) {
      this.$confirm(
        '执行该操作将删除该角色及权限，已授权该角色的用户将失去角色及相对应的权限，是否确认删除？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(async () => {
          console.log(id)
          await delRole(id)
          this.rolesList = this.rolesList.filter(item => {
            return item.id !== id
          })

          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {})
    },
    pagination(val) {
      const params = Object.assign(val)
      // this.getJourmalList(params)
      this.getRolesList(params)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep.roles {
  padding: 24px;
  height: 800px;
  background-color: #fff;
  .header-row {
    background-color: #f2f2f2;
  }
  .role-dialog {
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
    .role-dialog-header {
      padding-bottom: 23px;
      border-bottom: 1px solid #f2f2f2;
      line-height: 32px;
    }
  }
}
</style>
