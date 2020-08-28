<template>
  <div>
    <el-dialog title="提讯提解码" :visible.sync="showPop" width="31.25%">
      <div class="img-box">
        <img :src="qrcode" alt="">
      </div>
      <div class="btns">
        <el-button type="primary" @click="showPop = false">
          打印
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getQrCode
} from '@/api/custody/casehandle/manage'
export default {
  name: 'QrcodeDialog',
  components: {
  },
  props: {
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
    return {
      qrcode: ''
    }
  },
  computed: {
    showPop: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('update:show', val)
      }
    }
  },
  watch: {
    showPop(val) {
      if (val) {
        this.getQrCode(this.id)
      }
    }
  },
  mounted() {
  },
  methods: {
    getQrCode(id) {
      getQrCode(id).then(data => {
        this.qrcode = data
      })
    }
  }
}

</script>
<style lang="scss" scoped>
.img-box {
  img {
    margin: 0 auto;
    display: block;
    width: 300px;
    height: 300px;
  }
}
.btns {
  margin-top: 43px;
  text-align: center;
  button {
    width: 163px;
  }
}
</style>
