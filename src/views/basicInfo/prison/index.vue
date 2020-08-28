<template>
  <div class="prison">
    <el-row :gutter="20">
      <el-col :span="19">
        <el-card id="page-card-height" ref="pageCardHeight">
          <el-row :xs="15" :sm="18" :md="19" :lg="20" :xl="20">
            <el-col :span="17">
              <el-form :inline="true" :model="prisonForm" class="demo-form-inline">
                <el-form-item label="病区">
                  <el-select v-model="prisonForm.region" clearable placeholder="请选择病区" @change="getAllSupervisionOffice">
                    <el-option
                      v-for="v in region"
                      :key="v.id"
                      :label="v.supervisionAreaName"
                      :value="v.id"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="病室">
                  <el-select v-model="prisonForm.prison" clearable placeholder="请选择病室" @change="getAllSupervisionOffice">
                    <el-option
                      v-for="v in prison"
                      :key="v.id"
                      :label="v.dictionaryName"
                      :value="v.dictionaryName"
                    />
                  </el-select>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="7">
              <el-button type="primary" @click="addRegionDialog">新增病区</el-button>
              <el-button type="primary" @click="addPrisonDialog">新增病室</el-button>
            </el-col>

          </el-row>
          <el-row :xs="15" :sm="18" :md="19" :lg="20" :xl="20">
            <el-col>
              <el-table
                v-loading="loading"
                :data="prisonList"
                header-row-class-name="table-header"
              >
                <el-table-column label="病室名称" width="120px" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.supervisionOfficeName }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="病室号" prop="supervisionOfficeNumber" align="center" />
                <el-table-column label="病室类型" prop="supervisionOfficeType" align="center" />
                <el-table-column label="所属病区" prop="supervisionAreaName" align="center" />
                <el-table-column label="主管民警" prop="mainPolice" align="center" />
                <el-table-column label="协管民警" prop="assistPolice" align="center" />
                <el-table-column label="最大关押人数" prop="maxDetentionPeople" align="center" />
                <el-table-column label="操作" width="200" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" @click="editPrisonDialog(scope.row)">
                      修改
                    </el-button>
                    <el-button type="text" @click="delPrisonConfirm(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>

        </el-card>

      </el-col>
      <el-col :span="5">
        <el-card class="prison-card" :style="`height:${treeCardHeight}px;`">
          <el-tree
            :data="AreaAndPrisonTree"
            node-key="id"
            default-expand-all
            expand-on-click-node
            :props="defaultProps"
          >
            <span slot-scope="{ node, data }" class="custom-tree-node" style="display:flex;justify-content: space-between;width:100%">
              <span>{{ node.label }}</span>
              <span style="display:block">
                <div class="tree-edit-box" @click="() => treeEdit(node,data)">
                  <span class="tree-edit" />
                  修改
                </div>
                <div class="tree-del-box" @click="() => treeDel(node,data)">
                  <span class="tree-del" />
                  删除
                </div>
              </span>
            </span>
          </el-tree>
        </el-card>
      </el-col>
    </el-row>
    <!-- <el-row>
      <el-col> -->
    <pagination
      :current-page="pageNo"
      :total="total"
      :limit.sync="resultSize"
      :layout="layout"
      @pagination="pagination"
    />
    <!-- </el-col>
    </el-row> -->
    <!-- 新增、编辑病区对话框 -->
    <el-dialog
      v-loading="addPrisonDialogLoading"
      :title="RegionTitle"
      :visible.sync="isShowAddRegionDialog"
      custom-class="prison-dialog"
      @close="hideRegionDialog"
    >
      <el-form
        ref="addRegionFormRef"
        v-model="isShowAddRegionDialog"
        :inline="true"
        :model="addRegionForm"
        :rules="addRegionFormRules"
        label-width="80px"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="病区类型" prop="typeId">
              <el-select v-model="addRegionForm.typeId" placeholder="请选择病区">
                <el-option v-for="v in supervisionAreaTypeDicData" :key="v.id" :label="v.dictionaryName" :value="v.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="病区名称" prop="RegionName">
              <el-input
                v-model="addRegionForm.RegionName"
                placeholder="请输入病区名称"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="父级部门" prop="father">
              <!-- <el-select v-model="addRegionForm.father" disabled>
                <el-option v-for="v in FatherSupervisionPrison" :key="v.id" :label="v.supervisionPrisonName" :value="v.id" />
              </el-select> -->
              <el-input disabled :placeholder="addRegionForm.fatherName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="病区编码" prop="RegionNumber">
              <el-input
                v-model="addRegionForm.RegionNumber"
                placeholder="请输入病区编码"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowAddRegionDialog = false">取 消</el-button>
        <el-button type="primary" @click="AddRegionDialogSubmit">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!-- 新增、编辑病室对话框 -->
    <el-dialog
      :title="supervisionOfficeDialogTitle"
      :visible.sync="isShowAddPrisonDialog"
      custom-class="prison-dialog"
      @close="hidePrisonDialog"
    >
      <el-form
        v-if="isShowAddPrisonDialog"
        ref="addPrisonFormRef"
        v-model="isShowAddPrisonDialog"
        :inline="true"
        :model="addPrisonForm"
        :rules="addPrisonFormRules"
        label-width="110px"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="病室名称" prop="prisonName">
              <el-input
                v-model="addPrisonForm.prisonName"
                placeholder="请输入病室名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="病室号" prop="prisonNum">
              <el-input
                v-model="addPrisonForm.prisonNum"
                placeholder="请输入病室号"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="病室类型" prop="typeId">
              <el-select
                v-model="addPrisonForm.typeId"
                placeholder="请选择病室类型"
              >
                <el-option
                  v-for="v in prison"
                  :key="v.id"
                  :label="v.dictionaryName"
                  :value="v.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="父级部门" prop="fatRegion">
              <el-select
                v-model="addPrisonForm.fatRegion"
                placeholder="请选择父级部门"
              >
                <el-option
                  v-for="v in region"
                  :key="v.id"
                  :label="v.supervisionAreaName"
                  :value="v.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="主管民警" prop="usernameFirstId">
              <el-autocomplete
                v-model="addPrisonForm.usernameFirst"
                class="inline-input"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                @select="handleSelectFirst"
                @change="checkUserFirst"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="协管民警" prop="usernameTwoId">
              <el-autocomplete
                v-model="addPrisonForm.usernameTwo"
                class="inline-input"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                @select="handleSelectTwo"
                @change="checkUserTwo"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="监管场所" prop="place">
              <el-input
                v-model="addPrisonForm.place"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="最大关押人数" prop="maxPerson">
              <el-input
                v-model.number="addPrisonForm.maxPerson"
                placeholder="请输入最大关押人数"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowAddPrisonDialog = false">取 消</el-button>
        <el-button type="primary" @click="AddSupervisionOfficeSubmit">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import axios from 'axios'
import Pagination from '@/components/Pagination'
import {
  getSupervisionArea,
  getAllSupervisionOffice,
  getFatherSupervisionPrison,
  AddSupervisionArea,
  AddSupervisionOffice,
  EditSupervisionOffice,
  delSuperVisionOffice,
  getAllSupervisionOfficeAndArea,
  // findSupervisionOffice,
  // findSupervisionArea,
  UpdateSupervisionArea,
  DelSupervisionArea
} from '@/api/basic/prison'
import { queryDict, getDictDesc } from '@/api/basic/dict'
import { userList, queryUser } from '@/api/basic/user'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      supervisionOfficeDialogTitle: '新增病室',
      RegionTitle: '新增病区',
      // 被编辑病区id
      editAreaId: 0,
      // 顶部搜索数据
      prisonForm: {
        region: '',
        prison: ''
      },
      //   总病区数据
      region: [],
      //   总病室数据
      prison: [],
      //   总病室列表数据
      prisonList: [],
      //   是否展示添加病区对话框
      isShowAddRegionDialog: false,
      //   新增病区对话框表单
      addRegionForm: {
        type: '',
        typeId: '',
        RegionName: '',
        RegionNumber: '',
        father: '',
        fatherName: ''
      },
      //   新增病区对话框校验规则
      addRegionFormRules: {
        typeId: [
          { required: true, message: '请选择病区类型', trigger: 'blur' }
        ],
        RegionName: [
          { required: true, message: '请输入病区名称', trigger: 'blur' }
        ],
        RegionNumber: [],
        father: []
      },
      //   是否展示新增病室对话框
      isShowAddPrisonDialog: false,
      //   新增病室表单数据
      addPrisonForm: {
        prisonName: '',
        prisonNum: '',
        type: '',
        // 病室类型id
        typeId: '',
        fatRegion: '',
        usernameFirst: '',
        usernameFirstId: 0,
        usernameTwo: '',
        usernameTwoId: 0,
        place: '',
        maxPerson: '',
        supervisionAreaId: '',
        // 机构id
        supervisionPlace: 0
      },
      //   新增病室表单校验规则
      addPrisonFormRules: {
        prisonName: [
          { required: true, message: '请输入病室名称', trigger: 'blur' }
        ],
        prisonNum: [
          { required: true, message: '请输入病室号', trigger: 'blur' }
        ],
        typeId: [
          {
            required: true,
            message: '请选择病室类型',
            trigger: 'blur'
          }
        ],
        fatRegion: [{ required: true, message: '请选择父级部门', trigger: 'blur' }],
        usernameFirstId: [],
        usernameTwoId: [],
        place: [],
        maxPerson: [{ required: true, message: '请输入最大监管人数', trigger: 'blur' }, { type: 'number', message: '最大监管人数必须为数字值', trigger: 'blur' }]
      },
      // 病区类型数组
      supervisionAreaTypeDicData: [],
      // 全部用户列表
      allUserList: [],
      tempPoliceUserList: [],
      // 全部机构列表
      FatherSupervisionPrison: [],
      // 被编辑病室id
      EditSupervisionOfficeId: 0,
      // 病区和病室树状图
      AreaAndPrisonTree: [],
      // 树状图配置项
      defaultProps: {
        children: 'supervisionOfficeQueryDTOList',
        label: (data, node) => {
          // data.supervisionOfficeQueryDTOList ? data.supervisionAreaName : data.supervisionOfficeName
          if (data.supervisionOfficeQueryDTOList) {
            return data.supervisionAreaName
          }
          return data.supervisionOfficeName
        }
      },
      pageNo: 1,
      resultSize: 10,
      total: 0,
      loading: false,
      treeCardHeight: 0,
      addPrisonDialogLoading: false,
      // 分页配置项
      layout: 'prev, pager, next, jumper, sizes'
    }
  },
  computed: {
    policeUserList() {
      return this.tempPoliceUserList
    }
  },
  created() {
    // axios.get('/mock/prison').then(({ data }) => {
    //   this.region = data.region
    //   this.prison = data.prison
    // })
    // axios.get('/mock/prisonList').then(({ data }) => {
    //   this.prisonList = data.prisonList
    // })
    // 获取所有病区
    this.getSupervisionArea()
    // 获取所有病室
    getAllSupervisionOffice({
      pageNo: this.pageNo,
      resultSize: this.resultSize,
      supervisionAreaId: this.prisonForm.region,
      supervisionOfficeType: this.prisonForm.prison
    }).then((data) => {
      this.prisonList = data.records
      this.total = data.total
      this.loading = false
    })
    // 获取病室类型
    this.queryDict()
    // 获取所有病区病室树状图
    this.getAllSupervisionOfficeAndArea()
  },
  mounted() {
    // 获取所有用户
    this.getAllUserList()
    // 获取所有机构
    this.getFatherSupervisionPrison()
  },
  updated() {
    // console.log(this.$refs.pageCardHeight.$vnode.elm.offsetHeight)
    this.treeCardHeight = this.$refs.pageCardHeight.$vnode.elm.offsetHeight
  },
  methods: {
    // 获取所有病区和病室树状图
    async getAllSupervisionOfficeAndArea() {
      const data = await getAllSupervisionOfficeAndArea({})
      this.AreaAndPrisonTree = data
    },
    // 从字典中获取病室类型
    async queryDict() {
      const data = await queryDict({
        key: '病室类型'
      })
      const supervisionAreaTypeDic = await queryDict({
        key: '病区类型'
      })
      // 获取字典明细
      const res = await getDictDesc({
        id: data.records[0].id
      })
      res.dic.sort()
      console.log(res.dic)
      const supervisionAreaTypeData = await getDictDesc({
        id: supervisionAreaTypeDic.records[0].id
      })

      this.supervisionAreaTypeDicData = supervisionAreaTypeData.dic
      this.prison = res.dic
    },
    // 获取所有机构
    async getFatherSupervisionPrison() {
      const data = await getFatherSupervisionPrison({})
      this.addRegionForm.father = data[0].id
      this.addRegionForm.fatherName = data[0].supervisionPrisonName
      this.addPrisonForm.place = data[0].parentDeplement
      this.FatherSupervisionPrison = data
    },
    // 获取全部病室
    async getAllSupervisionOffice() {
      const params = {
        pageNo: this.pageNo,
        resultSize: this.resultSize,
        supervisionAreaId: this.prisonForm.region,
        supervisionOfficeType: this.prisonForm.prison
      }
      const data = await getAllSupervisionOffice(params)
      this.prisonList = data.records
      this.total = data.total
    },
    // 获取全部病区列表
    async getSupervisionArea() {
      const data = await getSupervisionArea({ })
      this.region = data
    },
    // 获取所有用户列表
    async getAllUserList() {
      const data = await userList({

      })
      const { records } = await userList({
        resultSize: data.total
      })
      this.allUserList = records
      this.tempPoliceUserList = records
    },
    //   新增病区
    addRegionDialog() {
      this.isShowAddRegionDialog = true
    },
    // 新增病室
    addPrisonDialog() {
      this.supervisionOfficeDialogTitle = '新增病室'

      this.isShowAddPrisonDialog = true
    },
    // 修改病室
    async editPrisonDialog(data) {
      // console.log(data)
      this.supervisionOfficeDialogTitle = '修改病室'
      this.EditSupervisionOfficeId = data.id
      this.addPrisonForm = {
        //  协管民警
        usernameTwo: data.assistPolice,
        usernameTwoId: data.assistPoliceId,
        // 主管民警
        usernameFirst: data.mainPolice,
        usernameFirstId: data.mainPoliceId,
        // 最大关押人数
        maxPerson: data.maxDetentionPeople,
        // 所属病区id
        supervisionAreaId: data.supervisionAreaId,
        // 所属病区名称
        fatRegion: data.supervisionAreaName,
        // 病室名称
        prisonName: data.supervisionOfficeName,
        // 病室号
        prisonNum: data.supervisionOfficeNumber,
        // 病室类型
        type: data.supervisionOfficeType,
        // 病室类型id
        typeId: data.supervisionOfficeTypeId,
        place: data.supervisionPlace
      }
      // 查询选择的病区数据
      this.isShowAddPrisonDialog = true
    },
    hidePrisonDialog() {
      const place = this.addPrisonForm.place
      this.addPrisonForm = {}
      this.addPrisonForm.place = place
      // console.log(this.addPrisonForm)
      this.$refs.addPrisonFormRef.resetFields()
    },
    hideRegionDialog() {
      // this.addRegionForm.typeId = ''
      // this.addRegionForm.type = ''
      // this.addRegionForm.RegionName = ''
      // this.addRegionForm.RegionNumber = ''
      this.RegionTitle = '新增病区'
      const fatherName = this.addRegionForm.fatherName
      const fatherId = this.addRegionForm.fatherId
      // const typeId = this.addRegionForm.typeId
      this.addRegionForm = {
        RegionName: '',
        RegionNumber: '',
        type: '',
        typeId: ''
      }
      this.addRegionForm.fatherId = fatherId
      this.addRegionForm.fatherName = fatherName
      // this.addRegionForm.typeId = typeId
      this.$refs.addRegionFormRef.resetFields()
    },

    // 树状图点击删除
    treeDel(node, data) {
      let title = '此操作将永久删除该病区, 是否继续?'
      if (node.level !== 1) {
        title = '此操作将永久删除该病室, 是否继续?'
      }
      this.$confirm(title, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        if (node.level !== 1) {
          await delSuperVisionOffice(data.id)
        } else {
          await DelSupervisionArea(data.id)
        }
        this.getAllSupervisionOfficeAndArea()
        this.getAllSupervisionOffice()
        this.getSupervisionArea()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },
    // 树状图点击编辑
    async treeEdit(node, data) {
      if (node.level !== 1) {
        // const res = await findSupervisionOffice(data.id)
        this.editPrisonDialog(data)
      } else {
        // const res = await findSupervisionArea(data.id)
        this.RegionTitle = '编辑病区'
        this.editAreaId = data.id
        // console.log(res)
        this.addRegionForm = {
          type: data.supervisionAreaType,
          typeId: data.supervisionAreaTypeId,
          RegionName: data.supervisionAreaName,
          RegionNumber: data.supervisionAreaNumber,
          father: data.parentDeplement,
          fatherName: data.parentDeplement,
          fatherId: data.parentId
        }
        this.addRegionDialog()
      }
    },
    // 搜索建议输入框
    querySearch(queryString, cb) {
      var restaurants = this.policeUserList
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      results.map(item => {
        item.value = item.userName
      })
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        // console.log(restaurant.userName)
        return (restaurant.userName && restaurant.userName.indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelectFirst(item) {
      this.addPrisonForm.usernameFirst = item.userName
      this.addPrisonForm.usernameFirstId = item.id
      // console.log(this.addPrisonForm.usernameFirst)
      this.tempPoliceUserList = this.allUserList.filter(data => {
        return data.id !== item.id
      })
    },
    handleSelectTwo(item) {
      this.addPrisonForm.usernameTwo = item.userName
      this.addPrisonForm.usernameTwoId = item.id
      this.tempPoliceUserList = this.allUserList.filter(data => {
        return data.id !== item.id
      })
    },
    // 新增病区
    async AddRegionDialogSubmit() {
      if (this.RegionTitle === '新增病区') {
        this.$refs.addRegionFormRef.validate(async valid => {
          if (!valid) return
          const RegionName = this.addRegionForm.RegionName
          const data = await getSupervisionArea({
            supervisionAreaName: RegionName
          })

          if (data.length !== 0) {
            return this.$message.error('当前病区已存在，请修改')
          }
          // 查询选择的机构数据
          const parentData = this.FatherSupervisionPrison.filter(item => {
            return item.id === this.addRegionForm.father
          })
          // console.log(this.FatherSupervisionPrison)
          // 病区类型
          const supervisionAreaType = this.supervisionAreaTypeDicData.filter(item => {
            return item.id === this.addRegionForm.typeId
          })
          console.log(this.addRegionForm.typeId)
          await AddSupervisionArea({
            parentDeplement: parentData[0].supervisionPrisonName,
            parentId: parentData[0].id,
            supervisionAreaName: RegionName,
            supervisionAreaType: supervisionAreaType[0].dictionaryName,
            supervisionAreaTypeId: supervisionAreaType[0].id,
            supervisionAreaNumber: this.addRegionForm.RegionNumber
          })
          this.$message.success('新增病区成功')
          this.getAllSupervisionOfficeAndArea()
          this.getSupervisionArea()
          this.isShowAddRegionDialog = false
          // console.log(1)
        // const res = await findSupervisionArea(data.data)
        // this.region.push(res.data)
        })
      } else if (this.RegionTitle === '编辑病区') {
        this.$refs.addRegionFormRef.validate(async valid => {
          if (!valid) return
          const RegionName = this.addRegionForm.RegionName

          // 查询选择的机构数据
          const parentData = this.FatherSupervisionPrison.filter(item => {
            return item.id === this.addRegionForm.fatherId
          })
          this.addRegionForm.fatherName = parentData[0].supervisionPrisonName
          // console.log(this.addRegionForm.fatherName)
          // 病区类型
          const supervisionAreaType = this.supervisionAreaTypeDicData.filter(item => {
            // console.log(this.addRegionForm.typeId)
            return item.id === this.addRegionForm.typeId
          })
          console.log(this.addRegionForm)

          await UpdateSupervisionArea({
            id: this.editAreaId,
            parentDeplement: parentData[0].parentDeplement,
            parentId: parentData[0].id,
            supervisionAreaName: RegionName,
            supervisionAreaType: supervisionAreaType[0].dictionaryName,
            supervisionAreaTypeId: supervisionAreaType[0].id,
            supervisionAreaNumber: this.addRegionForm.RegionNumber
          })
          this.$message.success('修改病区成功')
          this.getSupervisionArea()
          this.getAllSupervisionOfficeAndArea()
          this.isShowAddRegionDialog = false
        })
      }
    },
    // 新增、编辑病室提交
    AddSupervisionOfficeSubmit() {
      this.$refs.addPrisonFormRef.validate(async valid => {
        if (!valid) return
        if (this.supervisionOfficeDialogTitle === '新增病室') {
          const data = await getAllSupervisionOffice({
            supervisionOfficeName: this.addPrisonForm.prisonName
          })

          if (data.records.length !== 0) return this.$message.error('当前监室已存在，请修改')

          this.AddSupervisionOffice()
        } else if (this.supervisionOfficeDialogTitle === '修改病室') {
          if (!this.addPrisonForm.type) return this.$message.error('病室类型不能为空')

          return this.EditSupervisionOfficeSubmit()
        }
      })
    },
    async EditSupervisionOfficeSubmit() {
      const parentData = this.region.filter(item => {
        return item.id === this.addPrisonForm.supervisionAreaId
      })
      // 所属支队
      const res = this.FatherSupervisionPrison.filter(item => {
        return item.id === parentData[0].parentId
      })
      // 病室类型数据
      const prisonData = this.prison.filter(item => {
        return item.id === this.addPrisonForm.typeId
      })
      // console.log(prisonData)
      // this.addPrisonForm = {
      //   id: this.EditSupervisionOfficeId,
      //   //  协管民警
      //   assistPolice: this.addPrisonForm.usernameTwo,
      //   // 协管民警id
      //   assistPoliceId: this.addPrisonForm.usernameTwoId,
      //   // 主管民警id
      //   mainPoliceId: this.addPrisonForm.usernameFirstId,
      //   // 主管民警
      //   mainPolice: this.addPrisonForm.usernameFirst,
      //   // 最大关押人数
      //   maxDetentionPeople: this.addPrisonForm.maxPerson,
      //   // 所属病区id
      //   supervisionAreaId: parentData[0].id,
      //   // 所属病区名称
      //   supervisionAreaName: parentData[0].supervisionAreaName,
      //   // 病室名称
      //   supervisionOfficeName: this.addPrisonForm.prisonName,
      //   // 病室号
      //   supervisionOfficeNumber: this.addPrisonForm.prisonNum,
      //   // 病室类型名称
      //   supervisionOfficeType: prisonData[0].dictionaryName,
      //   // 病室类型id
      //   supervisionOfficeTypeId: prisonData[0].id,
      //   // 机构id
      //   supervisionPlaceId: res[0].parentId,
      //   // 机构名字
      //   supervisionPlace: res[0].parentDeplement,
      //   place: res[0].supervisionPlace
      // }

      await EditSupervisionOffice({
        id: this.EditSupervisionOfficeId,
        //  协管民警
        assistPolice: this.addPrisonForm.usernameTwo,
        // 协管民警id
        assistPoliceId: this.addPrisonForm.usernameTwoId,
        // 主管民警id
        mainPoliceId: this.addPrisonForm.usernameFirstId,
        // 主管民警
        mainPolice: this.addPrisonForm.usernameFirst,
        // 最大关押人数
        maxDetentionPeople: this.addPrisonForm.maxPerson,
        // 所属病区id
        supervisionAreaId: parentData[0].id,
        // 所属病区名称
        supervisionAreaName: parentData[0].supervisionAreaName,
        // 病室名称
        supervisionOfficeName: this.addPrisonForm.prisonName,
        // 病室号
        supervisionOfficeNumber: this.addPrisonForm.prisonNum,
        // 病室类型名称
        supervisionOfficeType: prisonData[0].dictionaryName,
        // 病室类型id
        supervisionOfficeTypeId: prisonData[0].id,
        // 机构id
        supervisionPlaceId: res[0].parentId,
        // 机构名字
        supervisionPlace: res[0].parentDeplement,
        place: res[0].supervisionPlace
      })
      this.prisonList.map(item => {
        if (item.id === this.EditSupervisionOfficeId) {
          item = this.addPrisonForm
        }
      })
      this.isShowAddPrisonDialog = false
      this.getAllSupervisionOffice()
      this.getAllSupervisionOfficeAndArea()
    },
    // 新增病室
    async AddSupervisionOffice() {
      this.addPrisonDialogloading = false
      // 查询选择的病区数据
      const parentData = this.region.filter(item => {
        return item.id === this.addPrisonForm.fatRegion
      })
      // 所属支队
      const res = this.FatherSupervisionPrison.filter(item => {
        return item.id === parentData[0].parentId
      })
      // 病室类型数据
      const prisonData = this.prison.filter(item => {
        return item.id === this.addPrisonForm.typeId
      })
      await AddSupervisionOffice({
      //  协管民警
        assistPolice: this.addPrisonForm.usernameTwo,
        // 协管民警id
        assistPoliceId: this.addPrisonForm.usernameTwoId,
        // 主管民警id
        mainPoliceId: this.addPrisonForm.usernameFirstId,
        // 主管民警
        mainPolice: this.addPrisonForm.usernameFirst,
        // 最大关押人数
        maxDetentionPeople: this.addPrisonForm.maxPerson,
        // 所属病区id
        supervisionAreaId: parentData[0].id,
        // 所属病区名称
        supervisionAreaName: parentData[0].supervisionAreaName,
        // 病室名称
        supervisionOfficeName: this.addPrisonForm.prisonName,
        // 病室号
        supervisionOfficeNumber: this.addPrisonForm.prisonNum,
        // 病室类型名称
        supervisionOfficeType: prisonData[0].dictionaryName,
        // 病室类型id
        supervisionOfficeTypeId: prisonData[0].id,
        // 机构id
        supervisionPlaceId: res[0].parentId,
        // 机构名字
        supervisionPlace: res[0].parentDeplement
      })
      this.$message.success('新增病室成功')
      this.addPrisonDialogLoading = false
      this.isShowAddPrisonDialog = false
      // if (this.prisonList.length !== 10) {
      //   this.prisonList.push({
      //     assistPolice: this.addPrisonForm.usernameTwo,
      //     // 主管民警
      //     mainPolice: this.addPrisonForm.usernameFirst,
      //     // 最大关押人数
      //     maxDetentionPeople: this.addPrisonForm.maxPerson,
      //     // 所属病区id
      //     supervisionAreaId: parentData[0].id,
      //     // 所属病区名称
      //     supervisionAreaName: parentData[0].supervisionAreaName,
      //     // 病室名称
      //     supervisionOfficeName: this.addPrisonForm.prisonName,
      //     // 病室号
      //     supervisionOfficeNumber: this.addPrisonForm.prisonNum,
      //     // 病室类型
      //     supervisionOfficeType: this.addPrisonForm.type,
      //     supervisionPlace: res[0].id
      //   })
      // }
      this.getAllSupervisionOffice()
      this.getAllSupervisionOfficeAndArea()
    },
    // 删除病室
    delPrisonConfirm(data) {
      this.$confirm('此操作将永久删除该病室, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delSuperVisionOffice(data.id)
        // console.log(res)
        // this.prisonList = this.prisonList.filter(item => {
        //   return item.id !== data.id
        // })
        this.getAllSupervisionOffice()
        // console.log(this.prisonList)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },
    // 分页
    pagination(val) {
      const params = Object.assign(val, {
        supervisionAreaId: this.prisonForm.region,
        supervisionOfficeType: this.prisonForm.prison
      })
      getAllSupervisionOffice(params).then((data) => {
        this.prisonList = data.records
        this.total = data.total
      })
    },
    async checkUserFirst() {
      const data = await queryUser({
        userName: this.addPrisonForm.usernameFirst
      })
      if (this.addPrisonForm.usernameFirst && data.records.length === 0) return this.$message.error('当前输入的主管民警不存在，请先注册')
    },
    async checkUserTwo() {
      const res = await queryUser({
        userName: this.addPrisonForm.usernameTwo
      })
      if (this.addPrisonForm.usernameTwo && res.records.length === 0) return this.$message.error('当前输入的协管民警不存在，请先注册')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.prison {
  padding: 24px;
  background-color: #fff;
  // background-color: unset !important;
  ::v-deep .el-form {
    .el-input__inner {
      width: 200px;
    }
  }
  .tree-del-box,
  .tree-edit-box {
    display: inline-block;
    font-size:12px;
    font-family:Microsoft YaHei;
    // font-weight:bold;
    color:rgba(102,102,102,1);
    line-height:30px;
  }
  .tree-del-box {
    margin-left: 15px;
  }
  ::v-deep .tree-edit,
  ::v-deep .tree-del {
    display: inline-block;
    width: 15px;
    height: 15px;
    vertical-align: middle;
    background-size: contain;
  }
  ::v-deep .tree-edit {

    background-image: url('../../../assets/images/tree-edit.png');
  }
  ::v-deep .tree-del {
    background-image: url('../../../assets/images/tree-del.png');
  }
  ::v-deep .el-tree-node__content {
    height: 33px;
    line-height: 33px;
    font-size: 13px;
  }
  ::v-deep .prison-dialog {
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
    .row-header {
      padding-bottom: 20px;
      line-height: 40px;
      border-bottom: 1px solid #f2f2f2;
    }
  }
}
::v-deep .prison-card {
  position: relative;
  overflow-y:auto;
  .el-card__body {
    padding: 15px;
    padding-left: 0;
  }
}
::v-deep .table-header {
  th {
    font-weight: 400;
  }
}

::v-deep .page-row {
  // position:static;
  //  position: absolute;
  // right: 0;
  // bottom: 110px;
    // height: 38px;
    // line-height: 38px;
    // position: absolute;
    // right: 320px;
    // bottom: -160px;
}
</style>
