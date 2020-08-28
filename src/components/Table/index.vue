<template>
  <div>
    <!--表格渲染-->
    <el-card class="flex-table">
      <el-table ref="table" :data="cautionData" style="width: 100%;">
        <el-table-column
          v-for="(v, i) in tableHeader"
          :key="i"
          :prop="data[i]"
          :label="v"
          :align="i > 0 ? 'center' : ''"
          style="background-color: #F2F2F2"
        />
        <el-table-column label="操作" align="center" fixed="right" style="background-color: #F2F2F2">
          <template>
            <el-button size="mini" type="text" @click="$emit('firstbtn')">{{ operationData[0] }}</el-button>
            <el-button
              v-if="operationData.length > 1 "
              type="text"
              size="mini"
              @click="$emit('secondbtn')"
            >{{ operationData[1] }}</el-button>
            <el-button
              v-if="operationData.length > 2"
              type="text"
              size="mini"
              @click="$emit('thirdbtn')"
            >{{ operationData[2] }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  name: 'Page',
  props: {
    tableHeader: {
      type: Array,
      default: () => {
        return []
      }
    },
    operationData: {
      type: Array,
      default: () => {
        return []
      }
    },
    cautionData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      data: []
    }
  },
  computed: {},
  destroyed() {},
  created() {},
  mounted() {
    this.tableData()
  },
  methods: {
    tableData() {
      if (this.cautionData) {
        var k = this.cautionData[0]
        this.data = Object.keys(k)
        console.log(this.data, this.cautionData)
      }
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
.flex-table {
  justify-content: flex-start;
}
::v-deep .el-card {
  .el-card__body {
    padding: 0;
  }
  th {
    background-color: #f2f2f2;
  }
}
</style>
