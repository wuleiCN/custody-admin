<template>
  <div :class="['footer',className].join(' ')">
    <span v-if="date && title" class="footer-title">{{ title }} {{ date | parseTime('{y}-{m}-{d}') }}</span>
    <span class="footer-title">操作员：{{ $store.state.user.user.userName }}</span>
    <span class="footer-title">警号：{{ $store.state.user.user.policeCode }}</span>
  </div>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      default: ''
    },
    slotClassName: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    date: {
      type: [String, Number, Object],
      default: ''
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

    .footer {
      // position: absolute;
      // bottom: 0;
      // left: 20px;
      display:flex;
      flex: 1;
      align-items: center;
      height: 32px;
      line-height: 32px;
        .footer-title {
            font-size: 14px;
            margin-right: 32px;
        }

    }
</style>
