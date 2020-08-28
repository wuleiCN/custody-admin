<template>
  <div class="dict">

    <el-row :gutter="20" :xs="15" :sm="18" :md="19" :lg="20" :xl="20">
      <el-col :span="2">
        <el-button type="primary" size="mini" @click="addDictDialog">
          新增字典
        </el-button>
      </el-col>
      <el-col :span="5" :offset="1">
        <el-input v-model="query" placeholder="请输入字典类型" class="query-input" @input="getQueryDict" />
      </el-col>
      <el-col :span="3" :offset="9">
        <upload-excel-component :on-success="handleSuccess" />
      </el-col>
      <el-col :span="2">
        <el-button
          size="mini"
          class="download-template-btn"
          @click="downloadTemplate"
        >
          模板文件下载
        </el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20" :xs="15" :sm="18" :md="19" :lg="20" :xl="20">
      <el-col style="margin-top: 15px">
        <el-table
          v-loading="loading"

          :data="dictList"
          header-cell-class-name="header-row"
          style="width: 100%;font-size:11px;"
        >
          <el-table-column label="字典类型" align="center" prop="dictionaryTypeName" />
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="showDictDialog(scope.row.id)">
                查看
              </el-button>
              <el-button type="text" @click="editDictDialog(scope.row.id)">
                修改
              </el-button>
              <el-button type="text" @click="delDictDialog(scope.row.id)">
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

    <!-- 查看，修改对话框 -->
    <el-dialog
      :visible.sync="isShowDictDialog"
      title="字典"
      center
      custom-class="dict-dialog"
      width="38%"
    >
      <el-row :gutter="20" class="row-header">
        <el-col :span="5" :offset="2">字典类型</el-col>
        <el-col :span="8">
          <el-input v-model="dictName" />
        </el-col>
      </el-row>
      <el-row style="margin-top:15px;overflow-x: auto">
        <el-col :span="5" :offset="2">字典明细</el-col>
        <el-col :span="17">
          <div
            style="height:351px;overflow-y: scroll;overflow-x: hidden"
          >
            <el-row
              v-for="(v, i) in computedDictChildren"
              :key="i"
              :gutter="20"
            >
              <el-col v-if="isShowSubmitBtn" :span="3">
                <el-input
                  v-model.number="v.index"
                  :min="1"
                  style="width:40px"
                  @change="handleChange(v, i)"
                />
              </el-col>
              <el-col v-if="isShowDictDialog" :span="11">
                <el-input
                  v-model="v.dictionaryName"
                  :disabled="!isShowSubmitBtn"
                  style="margin-bottom:15px"
                />
              </el-col>
              <el-col v-if="isShowSubmitBtn" :span="10">
                <el-button
                  type="text"
                  size="mini"
                  @click="handleChangeUp(v, i)"
                >
                  上移
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click="handleChangeDown(v, i)"
                >
                  下移
                </el-button>
                <el-button type="text" @click="delDictionChildren(v)">删除</el-button>
                <el-button type="text" @click="addDictionChildren">添加</el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowDictDialog = false">取 消</el-button>
        <el-button v-if="isShowSubmitBtn" type="primary" @click="editSubmit">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!-- 添加对话框 -->
    <el-dialog
      :visible.sync="isShowAddDictDialog"
      title="新增字典"
      center
      width="38%"
      @close="hideAddDictDialog"
    >
      <el-row>
        <el-row class="row-top">
          <el-col :span="3" :offset="3">字典名称</el-col>
        </el-row>
        <el-row class="row-top">
          <el-col :span="6" :offset="3">
            <el-input v-model.trim="dictionaryTypeName" placeholder="请输入字典名称" />
          </el-col>
        </el-row>
        <el-row class="row-top">
          <el-col :span="3" :offset="3">字典明细</el-col>
        </el-row>
        <el-row class="row-top">
          <el-col :span="15" :offset="3">
            <el-row v-for="(v, i) in addDictChildren" :key="i" :gutter="20">
              <el-col v-if="isShowAddDictDialog" :span="18">
                <el-input
                  v-model="v.dictionaryName"
                  placeholder="请输入字典内容"
                  style="margin-bottom:15px"
                  @input="checkInput(v.dictionaryName)"
                />
              </el-col>
              <el-col v-if="i === addDictChildren.length - 1" :span="4">
                <el-button icon="el-icon-plus" @click="addInput()" />
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hideAddDictDialog">取 消</el-button>
        <el-button type="primary" @click="addSubmit">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import axios from 'axios'
import Pagination from '@/components/Pagination'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { getDictList, getDictDesc, delDict, queryDict, addDict, editDict, delDictionChildren, addDictionChildren } from '@/api/basic/dict.js'
export default {
  components: {
    Pagination,
    UploadExcelComponent
  },
  data() {
    return {
      // 查询字典输入框
      query: '',
      // 字典列表
      dictList: [],
      //   是否显示查看，修改对话框
      isShowDictDialog: false,
      //   显示查看、修改对话框时绑定的字典名称
      dictName: '',
      //   显示查看、修改对话框时显示的字典内容
      dictChildren: [],
      //   是否对话框的确定按钮
      isShowSubmitBtn: true,
      //   是否显示新增字典对话框
      isShowAddDictDialog: false,
      //   新增字典对话框绑定的字典名称
      dictionaryTypeName: '',
      //   新增字典绑定的字典内容
      addDictChildren: [],
      // 编辑字典id
      editDictId: 0,
      pageNo: 1,
      resultSize: 10,
      total: 0,
      loading: false,
      // 分页配置项
      layout: 'prev, pager, next, jumper, sizes',
      // 检查字典明细是否重复
      checkInputDic: false
    }
  },
  computed: {
    computedDictChildren() {
      return this.dictChildren
    }
  },
  async created() {
    // axios.get('/mock/dict').then(({ data }) => {
    //   this.dictList = data.dict
    // })
    this.getDictList(
      {
        key: '',
        pageNo: this.pageNo,
        resultSize: this.resultSize
      }
    )
  },
  methods: {
    // 获取全部字典类型
    async getDictList(params) {
      try {
        const newParams = Object.assign({ resultSize: this.resultSize, pageNo: this.pageNo }, params)
        const data = await getDictList(
          newParams
        )
        this.dictList = data.records
        this.total = data.total
        this.loading = false
      } catch (e) {
        console.log(e)
      }
    },
    // 展示字典明细
    async showDictData(id) {
      this.dictChildren = []
      const data = this.dictList.find(item => {
        return item.id === id
      })
      this.dictName = data.dictionaryTypeName
      try {
        const dictChildren = await getDictDesc({
          id: data.id
        })
        const tempData = []
        dictChildren.dic.forEach((item, index) => {
          const data = {
            ...item,
            index: index + 1
          }
          // this.dictChildren.push(data)
          tempData.push(data)
        })
        // console.log(tempData)
        tempData.sort(item => {
          return item.sortNumber
        })
        console.log(tempData)
        this.dictChildren = tempData
        this.editDictId = id
      } catch (e) {
        console.log(e)
      }
    },
    // 展示字典对话框
    showDictDialog(id) {
      this.isShowDictDialog = true
      this.isShowSubmitBtn = false
      this.showDictData(id)
    },
    // 修改字典对话框
    editDictDialog(id) {
      this.isShowDictDialog = true
      this.isShowSubmitBtn = true
      this.showDictData(id)
    },
    // 删除对话框
    delDictDialog(id) {
      this.$confirm('执行操作将删除字典，是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          try {
            this.loading = false
            const data = await delDict(id)
            this.loading = false
            console.log(data)
            // const index = this.dictList.findIndex(item => {
            //   item.id === id
            // })
            // this.dictList.splice(index, 1)
            // this.dictList = this.dictList.filter(item => {
            //   return item.id !== id
            // })
            this.getDictList({})
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } catch (e) {
            console.log(e)
          }
        })
        .catch(() => {})
    },
    // 添加字典明细
    addDictDialog() {
      if (this.addDictChildren.length === 0) {
        this.addInput()
      }

      this.isShowAddDictDialog = true
    },
    // 编辑对话框提交
    async editSubmit() {
      if (this.dictName === '') {
        return this.$message.error('请输入字典名称')
      }
      const data = []
      this.dictChildren.map(item => {
        item.sortNumber = item.index
      })
      this.dictChildren.forEach((item, index) => {
        if (!item.id) {
          data.push({
            dictionaryTypeId: this.editDictId,
            dictionaryName: item.dictionaryName,
            sortNumber: item.sortNumber
          })
        }
      })
      console.log(this.dictChildren)
      console.log(data, 'data')
      this.dictChildren = this.dictChildren.filter(item => {
        return item.id
      })
      this.loading = false
      this.isShowDictDialog = false
      await editDict({
        id: this.editDictId,
        dic: this.dictChildren
      })
      data.forEach(async item => {
        await addDictionChildren(item)
      })
      this.loading = false
      this.$message.success('修改成功')
    },
    // 添加对话框提交
    async addSubmit() {
      if (this.dictionaryTypeName === '') {
        return this.$message.error('请输入字典名称')
      }
      if (this.checkInputDic) return this.$message.error('字典明细有重复项，请修改')
      const data = []
      console.log(this.addDictChildren)
      this.addDictChildren.forEach((item, index) => {
        if (item.dictionaryName !== '') {
          data.push({
            dictionaryName: item.dictionaryName,
            sortNumber: index + 1
          })
        }
      })
      console.log(data)
      this.loading = false
      await addDict({
        dictionaryTypeName: this.dictionaryTypeName,
        dic: data
      })
      this.loading = false
      this.getDictList({})
      this.isShowAddDictDialog = false
    },
    // 单击添加对话框后添加输入框按钮
    addInput() {
      if (!this.checkInputDic) {
        this.addDictChildren.push({
          index: this.addDictChildren.length
        // name: ''
        })
      }
    },
    // 隐藏新增字典对话框
    hideAddDictDialog() {
      this.addDictChildren = []
      this.dictionaryTypeName = ''
      this.isShowAddDictDialog = false
    },
    // 模板文件下载
    downloadTemplate() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['字典名称', '字典明细']
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
      const data = []
      results.forEach((v, i) => {
        if (i === 0) {
          const temp = {
            name: v['字典名称'],
            dic: [v['字典明细']]
          }
          data.push(temp)
        } else {
          data.forEach(item => {
            if (item.name === v['字典名称']) {
              item.dic.push(v['字典明细'])
            } else {
              const temp = {
                name: v['字典名称'],
                dic: [v['字典明细']]
              }
              data.push(temp)
            }
          })
        }
      })
      const tempData = []
      if (data.length !== 1) {
        const temp = []
        data.reduce((arr, item, index) => {
          console.log(index)
          if (index === 1) {
            console.log(arr)
            temp.push(arr)
          }
          if (data[index - 1].name !== item.name) {
            temp.push(item)
          }
        })
        temp.map(item => {
          item.dic.map((v, i) => {
            const temp = {
              dictionaryName: v
            }
            item.dic.splice(i, 1, temp)
          })
        })
        temp.forEach((item, index) => {
          const time = 100 * index
          setTimeout(async() => {
            await addDict({
              dictionaryTypeName: item.name,
              dic: item.dic
            })
            this.getDictList({})
          }, time)
        })
      } else {
        data.map(item => {
          console.log(item)
          item.dic.map((v, i) => {
            console.log(v, i)
            if (!v) {
              return
            } else {
              const temp = {
                dictionaryName: v
              }
              // item.dic.splice(i, 1, temp)
              tempData.push(temp)
            }
          })
        })
        console.log(tempData)
        // data.dic = tempData
        // console.log(data)
        addDict({
          dictionaryTypeName: data[0].name,
          dic: tempData
        }).then(() => {
          this.getDictList({})
        })
      }
      // this.dictList = this.dictList.concat(data)
    },
    handleChangeUp(v, i) {
      const index = this.dictChildren.findIndex(item => {
        return item.dictionaryName === v.dictionaryName
      })
      if (index === 0) {
        return this.$message.warning('已经是第一了')
      }
      const data = this.dictChildren
      let temp = []
      temp = data[index]

      data.splice(index, 1)
      data.splice(index - 1, 0, temp)
      data.forEach((v, i) => {
        v.index = i + 1
        v.sortNumber = i + 1
      })
      temp.sortNumber = index + i
      // console.log(data)
      this.dictChildren = data
    },
    handleChangeDown(v, i) {
      const index = this.dictChildren.findIndex(item => {
        return item.dictionaryName === v.dictionaryName
      })
      if (index === this.dictChildren.length - 1) {
        return this.$message.warning('已经是最后了')
      }
      const data = this.dictChildren
      let temp = []
      temp = data[index]

      data.splice(index, 1)
      data.splice(index + 1, 0, temp)
      data.forEach((v, i) => {
        v.index = i + 1
        v.sortNumber = i + 1
      })
      temp.sortNumber = index + i
      // console.log(data)
      this.dictChildren = data
    },
    handleChange(v, i) {
      if (i === 0) return this.$message.warning('最小输入1')
      const index = this.dictChildren.findIndex(item => {
        return item.dictionaryName === v.dictionaryName
      })
      const data = this.dictChildren
      let temp = []
      temp = data[index]

      data.splice(index, 1)
      data.splice(v.index - 1, 0, temp)
      data.forEach((v, i) => {
        v.index = i + 1
        v.sortNumber = i + 1
      })

      // temp.sortNumber = index + i
      // console.log(data)
      this.dictChildren = data
    },
    // 页码改变
    pagination(val) {
      const params = Object.assign(val, {
        key: this.query
      })
      console.log(params, '1')
      this.pageNo = val.pageNo
      this.resultSize = val.resultSize
      // this.getJourmalList(params)
      // if (this.query === '') {
      this.getDictList(params)
      // } else {
      //   this.getQueryDict(params)
      // }
    },
    // 查询字典
    getQueryDict(params) {
      // if (this.query === '') {
      //   this.getDictList({})
      // }
      // queryDict({
      //   key: this.query,
      //   pageNo: this.pageNo,
      //   resultSize: this.resultSize
      // }).then(res => {
      //   this.dictList = res.data
      // })
      // const params = {
      //   pageNo: this.pageNo,
      //   resultSize: this.resultSize,
      //   key: this.query
      // }

      queryDict({ key: params, pageNo: 1, resultSize: this.resultSize }).then((data) => {
        this.dictList = data.records
        this.total = data.total
      })
    },
    // 检查字典明细是否重复
    checkInput(data) {
      // console.log(data)
      // console.log(this.addDictChildren)

      const tempData = this.addDictChildren.filter(item => {
        return item.dictionaryName === data
      })

      if (tempData.length !== 1) {
        this.checkInputDic = true
        return this.$message.error(`字典明细${tempData[0].dictionaryName}有重复`)
      } else {
        this.checkInputDic = false
      }
    },
    // 根据id删除字典明细
    delDictionChildren(data) {
      console.log(data)
      if (!data.id) {
        this.dictChildren = this.dictChildren.filter(item => {
          return data.index !== item.index
        })
        return
      }
      this.$confirm(`此操作将永久删除${data.dictionaryName}字段, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.loading = false
        await delDictionChildren(data.id)
        // console.log(a)
        this.dictChildren = this.dictChildren.filter(item => {
          return data.id !== item.id
        })
        this.dictChildren.map(item => {
          if (!item.id) {
            item.index = item.index - 1
          }
        })
        // this.showDictData(data.dictionaryTypeId)
        this.loading = false
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch((e) => {
        console.log(e)
      }).finally(() => {
        this.loading = false
      })
    },
    // 修改时添加新的字典明细
    addDictionChildren() {
      this.dictChildren.push({
        index: this.dictChildren.length + 1
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/assets/styles/index";

::v-deep.dict {
  position: relative;
  padding: 24px;
  background-color: #fff;
  // height: 800px;
  .el-input-number--small {
    width: 100px;
  }
  .header-row {
    background-color: #f2f2f2;
  }
  .query-input {
    height: 25px;
    .el-input__inner {
      height: 100%;
      width: 230px;
      line-height: 1;
    }
  }
  .dict-dialog {
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
  .download-template-btn {
    color:$blue;
    border:1px solid rgba(0,112,244,.2)
  }
  .row-top {
    margin-top: 15px;
  }
}

</style>
