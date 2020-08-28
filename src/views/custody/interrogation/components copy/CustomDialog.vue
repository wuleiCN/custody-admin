<template>
  <div>
    <el-dialog title="收戒人员信息" :visible.sync="showPop" width="75.56%" @close="beforeClose" @closed="afterClose">
      <!-- / <el-form> </el-form> -->
      <el-form
        ref="form"
        :model="form"
        :rules="formRules"
        label-width="100px"
        label-position="right"
      >
      <!-- TODO -->
      </el-form>
      <div slot="footer" class="dialog-footer" style="padding-top: 10px">
        <div class="inputGroup" style="float: left;">
          <el-form label-width="100px" inline>
            <!-- //TODO 修改的时候会使用之前的操作人员吗？ -->
            <el-form-item label="操作员">
              <el-input v-model="user.userName" disabled placeholder="请输入操作员 " />
            </el-form-item>
            <el-form-item label="警号">
              <el-input v-model="user.policeCode" disabled placeholder="请输入警号" />
            </el-form-item>
          </el-form>
        </div>
        <el-button type="default" @click="showPop = false">
          取消
        </el-button>
        <el-button v-if="type !== 'detail'" type="primary" @click="submit">
          确定提交
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getDictDesc } from '@/api/basic/dict'
import { deepClone } from '@/components/PublicMethod'
import formRules from './formRules'
import defaultForm from './defaultForm'
export default {
  name: 'CustomDialog',
  props: {
    type: {
      type: String,
      default: 'detail' // register 全项录入 add 登记  eidt修改 detail详情
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
      showPartner: false,
      formRules: rules,
      dic: {
        works: [] // 办案单位
      },
      showPop: false,
      // 收戒人员登记表单
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
    ...mapGetters(['user'])
  },
  mounted() {
    getDictDesc({ id: 10200821000005 }).then(data => {
      this.dic.works = data.dic
    }) // 办案单位
  },
  methods: {
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
      if (this.id === '' || this.type === 'register') {
        this.addFullItem()
        this.addRowPartner()
        return
      }
      this.loading = false
      // eslint-disable-next-line no-undef
      getDetail(this.id).then(data => {
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
          if (this.type === 'register' || this.type === 'add') {
            this.addServer(params)
          } else {
            this.updateServer(params)
          }
        }
      })
    },
    /**
     * 提交新增的内容
     */
    addServer(params) {
      // eslint-disable-next-line no-undef
      addCustodyInformation(params).then(data => {
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

.el-input, .el-select, .el-date {
  width: 100%;
}
::v-deep .el-form-item__label {
  font-size: 12px;
  height: 32px;
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

.imgList {
  img {
    height: 146px;
    width: 146px;
    display: inline-block;
    border: 1px solid #f5f7fa;
    border-radius: 5px;
    margin-right: 15px;
  }
}
::v-deep .tableidcard {
  padding: 20px 0;
  position: relative;
  .validate {
     input {
      border-color: #ff4949;
    }
  }
   .el-form-item__error {
      left: 10px;
      top: auto;
    }
}

</style>
