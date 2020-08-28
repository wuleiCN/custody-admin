<template>
  <div class="btn">
    <el-button size="mini" type="text" @click="Examination()">{{ operation[0] }}</el-button>
    <el-button
      v-if="operation.length > 1 "
      slot="reference"
      type="text"
      size="mini"
      @click="noDetention()"
    >{{ operation[1] }}</el-button>
    <el-button
      v-if="operation.length > 2"
      slot="reference"
      type="text"
      size="mini"
    >{{ operation[2] }}</el-button>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      operation: (state) => state.precepts.operationData
    })
  },
  methods: {
    Examination() {
      this.$store.dispatch('precepts/examinationDialogVisible', true)
    },
    noDetention() {
      console.log(123)
    }
  }
}
</script>
<style lang="scss" scoped>
.btn {
  display: flex;
  justify-items: center;
  align-items: center;
  margin-left: 50%;
  transform: translateX(-50%);
}
</style>
