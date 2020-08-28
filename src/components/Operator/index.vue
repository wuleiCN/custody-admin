<template>
  <div class="operator-info">
    <div>
      <span>登记时间：</span>
      <span>{{ new Date | parseTime('{y}-{m}-{d}') }}</span>
    </div>
    <div>
      <span>操作员：</span>
      <span>{{ user.userName }}</span>
    </div>
    <div>
      <span>警号：</span>
      <span>{{ user.policeCode }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'BasicInfo',
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.operator-info{
  float: left;
    div{
      display: inline-block;
      margin-right: 42px;
      span {
        line-height: 32px;
        color: #000;
        font-size: 16px;
      }
    }
}

</style>
