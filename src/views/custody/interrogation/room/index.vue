<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="leftTitle">
          <span>提讯室</span>
          <i class="el-icon-setting" @click="findschedule(); settingVisible = true" />
        </div>
        <el-row :gutter="8" style="padding: 16px 0;">
          <el-col v-for="item in allRooms" :key="item.arraignOfficeId" :span="12">
            <div class="card-item">
              <div class="room-name">
                <img src="../../../../assets/images/a.png" alt="">
                <span>{{ item.arraignOffice }}</span>
              </div>
              <div class="person">
                <span>{{ item.custodyWardName || '-' }}</span>
                <span>{{ item. patientName || '-' }}</span>
              </div>
              <div class="time">
                {{ item._s | second }}
              </div>
              <el-popconfirm
                title="你确定结束该次提讯吗？"
                @onConfirm="onCancelMeet(item.arraignSolutionLedgerId)"
              >
                <el-button v-if="item.startTime" slot="reference" type="primary">结束提讯</el-button>
              </el-popconfirm>
              <el-button v-if="!item.startTime" type="primary" disabled>空闲中</el-button>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="18">
        <el-card class="flex-table">
          <div class="t-title">数据列表 ({{ page.total }}条)</div>
          <el-table ref="table" v-loading="loading" :data="tableData" style="width: 100%;">
            <el-table-column prop="patientName" label="姓名" width="100px" />
            <el-table-column prop="custodyWardName" label="监室" align="center" width="100px" />
            <el-table-column prop="patienCertificateNumber" label="证件号码" align="center" />
            <el-table-column prop="caseHandlingUnitName" label="办案单位" align="center" />
            <el-table-column label="办案人员" align="center">
              <template slot-scope="scope">
                {{ [scope.row.caseHandlerOne, scope.row.caseHandlerTwo].toString() }}
              </template>
            </el-table-column>
            <el-table-column prop="registerTime" label="登记时间" align="center">
              <template slot-scope="scope">
                {{ scope.row.registerTime | parseTime }}
              </template>
            </el-table-column>
            <el-table-column prop="arraignOffice" label="提讯室" align="center" width="100px" />
            <el-table-column label="操作" align="center" fixed="right" style="background-color: #F2F2F2" width="150px">
              <template slot-scope="scope">
                <el-button v-if="scope.row.isEnd === null" type="text" size="mini" @click="showDialog(scope.row)">安排</el-button>
                <span v-if="scope.row.isEnd === 1" class="danger btn">提讯中</span>
                <span v-if="scope.row.isEnd === 2" class="gray btn">提讯完成</span>
                <!-- <el-button type="text" size="mini" @click="showDialog(scope.row)">叫号</el-button> -->
              <!-- <el-button type="warning" size="mini">预约审核</el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </el-card></el-col>
    </el-row>
    <!--分页组件-->
    <Pagination
      :class="{'limit': page.resultSize > 10}"
      :page.sync="page.pageNo"
      style="bottom:15px"
      :total="page.total"
      :limit.sync="page.resultSize"
      @pagination="getList"
    />
    <!-- 提讯室安排 -->
    <el-dialog
      title="提讯室安排"
      append-to-body
      :visible.sync="dialogVisible"
      width="400px"
    >
      <el-form ref="freeForm" :model="freeForm">
        <el-form-item label="提讯室" prop="roomId" :rules="[{ required: true, trigger: 'change', message:'请选择提讯室'}]">
          <el-select v-model="freeForm.roomId">
            <el-option v-for="item in freeRoom" :key="item.arraignOfficeId" :label="item.arraignOffice" :value="item.arraignOfficeId" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitFreeRoom">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 设置  -->

    <el-dialog
      title="设置"
      append-to-body
      :visible.sync="settingVisible"
      width="1000px"
    >
      <el-form label-width="80px">
        <el-form-item label="提讯时间">
          <el-checkbox-group v-model="settings">
            <div v-for="item in schedule" :key="item.id" class="settingItem">
              <div v-if="item.type == 1">
                <el-checkbox :label="item.week_zh" />
                <span>上午</span>
                <el-time-picker
                  v-model="item.morning"
                  is-range
                  value-format="HH:mm:ss"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  placeholder="选择时间范围"
                />
              &nbsp;
              &nbsp;
                <span>下午</span>
                <el-time-picker
                  v-model="item.afternoon"
                  is-range
                  value-format="HH:mm:ss"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  placeholder="选择时间范围"
                />
              </div>
            </div>

          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="提讯时长">
          <div class="settingItem">
            <span>提讯时长超过</span>
            <el-input v-model="time.timeout" size="mini" type="number" style="width: 100px;" />
            <span>分钟推送消息提醒民警</span>
          </div>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="settingVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitSetting">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { findAllRoom, findRoom, findschedule, scheduleUpdate, arrange, cancelArrange } from '@/api/custody/interrogation/room'
import { getList } from '@/api/custody/interrogation/accout'
import { parseTime } from '@/utils'
let timer = null
export default {
  name: 'Room',
  components: { Pagination },
  filters: {
    parseTime,
    second(val) {
      function secondToTimeStr(t) {
        if (!t) return
        if (t < 60) return '00:' + ((i = t) < 10 ? '0' + i : i)
        if (t < 3600) return '' + ((a = parseInt(t / 60)) < 10 ? '0' + a : a) + ':' + ((i = t % 60) < 10 ? '0' + i : i)
        if (t >= 3600) {
          var a; var i; var e = parseInt(t / 3600)
          return (e < 10 ? '0' + e : e) + ':' + ((a = parseInt(t % 3600 / 60)) < 10 ? '0' + a : a) + ':' + ((i = t % 60) < 10 ? '0' + i : i)
        }
      }

      if (val) {
        return `已开始: ${secondToTimeStr(val)}`
      } else {
        return '未开始'
      }
    }
  },
  data() {
    return {
      page: {
        pageNo: 1,
        resultSize: 10,
        total: 0
      },
      tableData: [],
      time: {},

      schedule: [], // 安排计划
      freeForm: {
        roomId: ''
      },
      arrangeLine: {},
      freeRoom: [], // 空闲的
      allRooms: [], // 所有的
      settings: [],
      loading: false,
      dialogVisible: false,
      settingVisible: false
    }
  },
  beforeDestroy() { if (timer) { clearInterval(timer) } },
  mounted() {
    this.getAllRooms()
    this.getList()
  },
  methods: {
    findschedule() {
      findschedule().then(res => {
        const weeks = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        this.schedule = res.map(e => {
          if (e.state === 1) {
            this.settings.push(weeks[e.week - 1])
          }
          return {
            afternoon: [e.afternoonStartTime, e.afternoonEndTime],
            id: e.id,
            morning: [e.morningStartTime, e.morningEndTime],
            sortNumber: e.sortNumber,
            type: e.type,
            week: e.week,
            week_zh: weeks[e.week - 1]
          }
        })

        const time = res.find(e => e.type === 2)
        if (time) {
          this.time = time
        } else {
          this.time = { timeout: 0 }
        }
        this.$forceUpdate()
      })
    },
    onCancelMeet(id) {
      cancelArrange({ arraignSolutionLedgerId: id }).then(res => {
        this.$message.success('结束成功')
        this.getAllRooms()
        this.getList()
      })
    },
    getAllRooms() {
      findAllRoom().then(res => {
        if (timer) { clearInterval(timer) }
        this.allRooms = res.map(e => {
          let s = null
          const time = new Date().getTime()
          if (e.startTime) {
            s = parseInt((time - e.startTime) / 1000)
          }
          return Object.assign(e, { _s: s })
        })
        timer = setInterval(() => {
          this.allRooms.forEach(e => {
            if (e._s === null) { return }
            e._s++
          })
        }, 1000)
      })
    },
    selectQuery() {
      this.page.pageNo = 1
      this.getList()
    },
    submitFreeRoom() {
      this.$refs.freeForm.validate(v => {
        if (v) {
          const data = {}
          data.arraignSolutionLedgerId = this.arrangeLine.id
          data.arraignOffice = this.allRooms.find(e => e.arraignOfficeId === this.freeForm.roomId).arraignOffice
          data.arraignOfficeId = this.freeForm.roomId
          arrange(data).then(res => {
            this.$message.success('安排成功')
            this.dialogVisible = false
            this.getList()
            this.getAllRooms()
          })
        }
      })
    },
    submitSetting() {
      const params = []
      this.schedule.forEach(e => {
        if (e.type === 2) { return }
        if (this.settings.indexOf(e.week_zh) === -1) {
          e.state = 2
        } else {
          e.state = 1
        }

        params.push(Object.assign(e, {
          afternoonStartTime: e.afternoon[0],
          afternoonEndTime: e.afternoon[1],
          morningStartTime: e.morning[0],
          morningEndTime: e.morning[1]
        }))
      })
      params.push(this.time)
      scheduleUpdate(params).then(res => {
        this.$message.success('修改成功')
        this.settingVisible = false
      })
    },
    getList() {
      // TODO
      this.loading = false
      getList({
        pageNo: this.page.pageNo,
        resultSize: this.page.resultSize,
        registerType: 1
      }).then(res => {
        this.loading = false
        this.page.total = res.total
        this.tableData = res.records
      })
    },
    /**
     * 获取空闲的房间
     */
    getFreeRoom() {
      findRoom().then(res => {
        this.freeRoom = res
      })
    },
    showDialog(data) {
      this.arrangeLine = data
      this.getFreeRoom()
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped lang="scss">
.t-title {
  padding: 0 0 18px 0;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.leftTitle {
  font-size:14px;
  font-family:PingFangSC-Medium,PingFang SC;
  font-weight:500;
  color:rgba(0,0,0,0.85);
  line-height:60px;
  background-color: #FAFAFA;
  height:60px;
  background:rgba(250,250,250,1);
  border-radius:2px 2px 0px 0px;
  padding: 0 22px;
  text-align: center;
  position: relative;
  border-bottom: 1px solid #EEEEEE;
  i {
    position: absolute;
    right: 22px;
    top: 50%;
    margin-top: -8px;
    color: #999999;
    font-size: 16px;
    cursor: pointer;
  }
}

.card-item {
  margin-bottom: 10px;
  position: relative;
  border-radius:2px;
  border:1px solid rgba(233,233,233,1);
  text-align: center;

  .room-name {
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:20px;
    margin: 16px  0;
    span, img {
      vertical-align: middle;
    }
    img{
      height: 22px;
    }
  }
  .person {
    height:22px;
    font-size:16px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:500;
    color:rgba(0,0,0,0.65);
    line-height:22px;
  }
  .time  {
    font-size: 12px;
    color:  #999;
    line-height: 16px;
    margin-top: 8px;
  }

  .el-button {
    margin: 16px  0;
  }
}

.btn {
  font-size:13px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  &.danger{
    color:rgba(245,127,23,1);
  }
  &.gray {
    color: #ABB0BD;
  }
}
.settingItem {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  span {
    font-size: 13px;
    margin: 0 10px;
    display: inline-block;
    line-height: 32px;
  }
  .el-date-editor--time-select {
    width: 110px;
  }
}
</style>
