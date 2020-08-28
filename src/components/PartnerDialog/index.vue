<template>
  <el-dialog title="收戒人员信息" :visible.sync="showPop" width="600" @close="beforeClose" @closed="afterClose">
    <div slot="title" />
    <el-row :gutter="20">
      <el-col>
        <el-form :inline="true" :model="form">
          <el-form-item>
            <el-input
              v-model="form.key"
              placeholder="输入姓名或证件号码查询"
              suffix-icon="el-icon-search"
              @change="search"
            />
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col>
        <el-table :data="list">
          <el-table-column prop="personName" label="姓名" align="center" />
          <el-table-column prop="personSex" label="性别" align="center" />
          <el-table-column v-if="!type" prop="custodyWardName" label="病室号" align="center" />
          <el-table-column v-else prop="monitorRoomNumber" label="监室号" align="center" />
          <el-table-column prop="certificateNumber" label="证件号" align="center" />
          <el-table-column
            label="操作"
            align="center"
            width="55"
          >
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.checked" />
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="pagination-box">
      <pagination
        class="partner-pagination"
        :page.sync="pageNo"
        :total="total"
        :limit.sync="resultSize"
        @pagination="pagination"
      />
    </div>
    <div slot="footer" class="dialog-footer" style="padding-top: 10px">
      <el-button type="primary" @click="submit">
        确定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getPartnerList } from '@/api/custody/custodyReg'
import { findLinkAccomplice, findResultAccomplice } from '@/api/custody/casehandle/manage/'
import Pagination from '@/components/Pagination'

export default {
  name: 'PratnerDialog',
  components: {
    Pagination
  },
  props: {
    show: {
      default: false,
      type: Boolean
    },
    type: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      loading: false,
      form: {
        key: ''
      },
      list: [],
      showPop: false,
      pageNo: 1,
      resultSize: 10,
      total: 0
    }
  },
  watch: {
    show: {
      immediate: true,
      handler() {
        this.showPop = this.show
        if (this.show) {
          const params = {
            pageNo: this.pageNo,
            resultSize: this.resultSize
          }
          this.getPartnerList(params)
        }
      }
    }
  },
  methods: {
    afterClose() {
      this.$emit('update:show', false)
    },
    beforeClose() {
    },
    search() {
      const params = Object.assign({
        pageNo: this.pageNo,
        resultSize: this.resultSize
      }, this.form)
      this.getPartnerList(params)
    },
    submit() {
      const list = this.list.filter(item => item.checked)
      this.list = []
      this.$emit('getPartners', list)
      this.$emit('update:show', false)
    },
    pagination(val) {
      const params = Object.assign(val, this.form)
      this.getPartnerList(params)
    },
    /**
     * 拉取收戒详情
     */
    getPartnerList(params) {
      if (this.type === 'bananhuanjie') {
        findLinkAccomplice(params).then(data => {
          this.total = data.total
          this.list = data.records.map(item => {
            return {
              personName: item.accompliceName,
              personSex: item.sex,
              ...item
            }
          })
        })
      } else if (this.type === 'chulijieguo') {
        findResultAccomplice(params).then(data => {
          this.total = data.total
          this.list = data.records.map(item => {
            return {
              personName: item.accompliceName,
              personSex: item.sex,
              ...item
            }
          })
        })
      } else {
        getPartnerList(params).then(data => {
          this.total = data.total
          this.list = data.records
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-box {
  height: 40px;
  .partner-pagination {
    position: static;
    margin-top: 20px;
    float: right;
  }
}
</style>
