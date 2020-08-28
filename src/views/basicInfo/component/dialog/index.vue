<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
      custom-class="dialog-component"
      :before-close="dialogClose"
    >
      <el-row>
        <el-col :span="1">
          <i :class="className" />
        </el-col>
        <el-col :span="23">
          <el-row>
            <el-col class="title">
              {{ title }}
            </el-col>
            <el-col class="desc">{{ desc }}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="$emit('success')">
          是
        </el-button>
        <el-button size="mini" @click="$emit('close')">否</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    className: {
      type: String,
      default: 'el-icon-question'
    },
    title: {
      type: String,
      default: '重置密码后，用户密码将变为初始密码666666，是否重置密码？'
    },
    desc: {
      type: String,
      default: '是否重置密码'
    }
  },
  methods: {
    dialogClose() {
      this.$emit('close')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.desc {
  margin-top: 28px;
  color: #ccc;
}
.el-icon-warning {
  color: #f56c6c;
}
.el-icon-question {
  color: #e6a23c;
}
::v-deep .dialog-component {
  .el-dialog__footer {
    border-top: 1px solid #f2f2f2;
    text-align: center;
  }
}
</style>
