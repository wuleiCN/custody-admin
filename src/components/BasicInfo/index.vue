<template>
  <div class="basic-info">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="basic-info-item">姓名： {{ prisoner.personName }}</div>
      </el-col>
      <el-col :span="6">
        <div class="basic-info-item">性别： {{ prisoner.personSex }}</div>
      </el-col>
      <el-col :span="6">
        <div class="basic-info-item">病室： {{ prisoner.custodyWardName }}</div>
      </el-col>
      <el-col :span="6">
        <div class="basic-info-item">证件号码： {{ prisoner.certificateNumber }}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'BasicInfo',
  props: {
    prisoner: {
      required: true,
      type: Object
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.basic-info{
    background-color: #FAFAFA;
    .basic-info-item{
        line-height: 48px;
        text-align: center;
    }
}

</style>
