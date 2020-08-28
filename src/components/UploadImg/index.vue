<template>
  <el-upload
    :limit="10"
    multiple
    action="supervise/fastdfs-client/upload"
    :on-remove="onImageRemove"
    :on-success="onImageUploadSuccess"
    list-type="picture-card"
  >
    <i class="el-icon-plus" />
  </el-upload>
</template>

<script>

export default {
  props: {
  },
  data() {
    return {
    }
  },
  methods: {
    onImageRemove() {

    },
    onImageUploadSuccess() {

    }
  }
}
</script>

<style scoped>

</style>
