<template>
  <div>
    <el-dialog :title="title" :visible.sync="showPop" width="67.4%" @close="beforeClose">
      <el-row :gutter="15">
        <el-col :span="24">
          <basic-info :prisoner="prisoner" />
        </el-col>
      </el-row>
      <el-row v-if="seleced !== 2" class="detail-row origin">
        <el-col :span="24">
          <span v-if="seleced !== 3" class="dialog-title">原记录</span>
          <span v-else class="dialog-title">现记录</span>
        </el-col>
        <el-col v-if="seleced === 0" :span="8">
          <span class="dialog-content">原办案单位：{{ prisoner.caseHandlingUnitName }}</span>
        </el-col>
        <el-col v-if="seleced === 0 || seleced === 1" :span="8">
          <span class="dialog-content">原办案环节：{{ prisoner.caseSegmentName }}</span>
        </el-col>
        <el-col v-if="seleced === 0 || seleced === 1" :span="8">
          <span class="dialog-content">原关押截止日期：{{ prisoner.custodyDateEnd | parseTime('{y}/{m}/{d}') }}</span>
        </el-col>
        <el-col v-if="seleced === 3" :span="8">
          <span class="dialog-content">诉讼阶段：{{ prisoner.caseSegmentName }}</span>
        </el-col>
        <el-col v-if="seleced === 3" :span="8">
          <span class="dialog-content">关押截止日期：{{ prisoner.custodyDateEnd | parseTime('{y}/{m}/{d}') }}</span>
        </el-col>
      </el-row>
      <template v-if="changeData.length > 0">
        <el-row v-for="item in changeData" :key="item.id" class="detail-row">
          <el-col :span="24">
            <span class="dialog-title">现记录</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">现办案单位：{{ item.organization }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">现办案环节：{{ item.linkName }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">现关押截止日期：{{ item.lockEndTime | parseTime('{y}/{m}/{d}') }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">现办案人/号码：{{ item.caseHandlerId }}/{{ item.caseHandlerId }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">证件：{{ item.caseHandlerId }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">&nbsp;</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">第二现办案人/号码：{{ item.caseHandlerId }}/{{ item.caseHandlerId }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">证件：{{ item.caseHandlerId }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">&nbsp;</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">法律文书：{{ item.legalIinstrument }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">法律文书号：{{ item.legalInstrumentNumber }}</span>
          </el-col>
          <el-col :span="8" />
          <el-col :span="24">
            <span class="dialog-content">备注：{{ item.remark }}</span>
          </el-col>
        </el-row>
      </template>
      <template v-if="datainData.length > 0">
        <el-row v-for="item in datainData" :key="item.id" class="detail-row">
          <el-col :span="24">
            <span class="dialog-title">现记录</span>
          </el-col>
          <el-col :span="24">
            <span class="dialog-content">变更原因：{{ item.linkName }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">现办案环节：{{ item.linkName }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">现关押截止日期：{{ item.lockEndTime | parseTime('{y}/{m}/{d}') }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">&nbsp;</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">法律文书：{{ item.legalIinstrument }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">法律文书号：{{ item.legalInstrumentNumber }}</span>
          </el-col>
        </el-row>
      </template>
      <template v-if="resultData.length > 0">
        <el-row v-for="item in resultData" :key="item.id" class="detail-row">
          <el-col :span="24">
            <span class="dialog-title">现记录</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">是否转决：{{ item.decision === 1 ? '是' : '否' }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">法律文书：{{ item.legalIinstrument }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">法律文书号：{{ item.legalInstrumentNumber }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">决定机关：{{ item.disposeOrganName }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">审判长：{{ item.judge }}</span>
          </el-col>
          <el-col :span="8" />
          <el-col :span="24">
            <span class="dialog-content">处理结果：{{ item.disposeResult }}</span>
          </el-col>
          <el-col :span="24">
            <span class="dialog-content">附加处理：{{ item.appendDispose }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">刑期：{{ item.prisonTerm }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">刑期开始：{{ item.prisonTermStart | parseTime('{y}/{m}/{d}') }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">刑期结束：{{ item.prisonTermEnd | parseTime('{y}/{m}/{d}') }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">上诉日期：{{ item.appealTime | parseTime('{y}/{m}/{d}') }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">缓刑日期：{{ item.probationPrisonTerm | parseTime('{y}/{m}/{d}') }}</span>
          </el-col>
          <el-col :span="8">
            <span class="dialog-content">执行日期：{{ item.executeTime | parseTime('{y}/{m}/{d}') }}</span>
          </el-col>
        </el-row>
      </template>
      <el-form
        v-show="type !== 'detail' && seleced === 0"
        ref="form"
        :model="form"
        :rules="formRules"
        label-position="top"
      >
        <el-row :gutter="15">
          <el-col :span="5">
            <el-form-item label="现办案单位类型" prop="organizationTypeId">
              <el-select v-model="form.organizationTypeId" placeholder="请选择">
                <el-option
                  v-for="item in dict['1000000000006']"
                  :key="item.id"
                  :label="item.dictionaryName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item>
              <span slot="label">&nbsp;</span>
              <div class="link"><i class="el-icon-minus" /></div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="现办案单位" prop="organizationId">
              <el-select v-model="form.organizationId" placeholder="请选择">
                <el-option v-if="!form.organizationTypeId" label="请先选择办案单位类型" value="请先选择办案单位类型" disabled />
                <el-option
                  v-for="item in caseUnitHandleList"
                  :key="item.id"
                  :label="item.dictionaryName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="现办案环节" prop="linkId">
              <el-select v-model="form.linkId" placeholder="请选择">
                <el-option
                  v-for="item in dict['1000000000082']"
                  :key="item.id"
                  :label="item.dictionaryName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item>
              <span slot="label">&nbsp;</span>
              <div class="link"><i class="el-icon-minus" /></div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="现关押截止日期" prop="lockEndTime">
              <el-date-picker
                v-model="form.lockEndTime"
                type="date"
                value-format="timestamp"
                placeholder="请选择日期"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="5">
            <el-form-item label="现办案人姓名" prop="firstCaseHandlerName">
              <el-input v-model="form.firstCaseHandlerName" type="text" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item>
              <span slot="label">&nbsp;</span>
              <div class="link"><i class="el-icon-minus" /></div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="电话" prop="firstPhone">
              <el-input v-model="form.firstPhone" type="text" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="证件类型" prop="firstCertificateTypeId">
              <el-select v-model="form.firstCertificateTypeId" placeholder="请选择">
                <el-option
                  v-for="item in dict['1000000000021']"
                  :key="item.id"
                  :label="item.dictionaryName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item>
              <span slot="label">&nbsp;</span>
              <div class="link"><i class="el-icon-minus" /></div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="证件号码" prop="firstCertificateNumber">
              <el-input v-model="form.firstCertificateNumber" type="text" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="5">
            <el-form-item label="现第二办案人姓名" prop="secondCaseHandlerName">
              <el-input v-model="form.secondCaseHandlerName" type="text" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item>
              <span slot="label">&nbsp;</span>
              <div class="link"><i class="el-icon-minus" /></div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="电话" prop="secondPhone">
              <el-input v-model="form.secondPhone" type="text" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="证件类型" prop="secondCertificateTypeId">
              <el-select v-model="form.secondCertificateTypeId" placeholder="请选择">
                <el-option
                  v-for="item in dict['1000000000021']"
                  :key="item.id"
                  :label="item.dictionaryName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item>
              <span slot="label">&nbsp;</span>
              <div class="link"><i class="el-icon-minus" /></div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="证件号码" prop="secondCertificateNumber">
              <el-input v-model="form.secondCertificateNumber" type="text" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="5">
            <el-form-item label="法律文书" prop="legalInstrumentId">
              <el-select v-model="form.legalInstrumentId" placeholder="请选择">
                <el-option
                  v-for="item in dict['10200827000004']"
                  :key="item.id"
                  :label="item.dictionaryName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item>
              <span slot="label">&nbsp;</span>
              <div class="link"><i class="el-icon-minus" /></div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="法律文书号" prop="legalInstrumentNumber">
              <el-input v-model="form.legalInstrumentNumber" type="text" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input
                v-model="form.remark"
                type="textarea"
                resize="none"
                placeholder="500字符以内  "
                :autosize="{ minRows: 2, maxRows: 4}"
                maxlength="500"
                show-word-limit
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="partner-box" type="flex" justify="space-between" align="middle">
          <el-col :span="22">
            <span>同案犯批处理</span>
          </el-col>
          <el-col :span="2">
            <el-button
              plain
              @click="addPartner()"
            >添加同案人员</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-table
              :data="form.caseHandlerLinkAccomplices"
              style="width:  100%;"
            >
              <el-table-column prop="personName" label="姓名" align="center" />
              <el-table-column prop="sex" label="性别" align="center" />
              <el-table-column prop="monitorRoomNumber" label="监室号" align="center" />
              <el-table-column prop="certificateNumber" label="证件号" align="center" />
            </el-table>
          </el-col>
        </el-row>
      </el-form>
      <el-form
        v-show="type !== 'detail' && seleced === 1"
        ref="caseHandleform"
        :model="caseHandleform"
        :rules="caseHandleRules"
        label-position="top"
      >
        <el-row :gutter="15">
          <el-col :span="12">
            <el-form-item label="变更原因" prop="causeId">
              <el-select v-model="caseHandleform.causeId" placeholder="请选择">
                <el-option
                  v-for="item in dict['10200827000003']"
                  :key="item.id"
                  :label="item.dictionaryName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <span slot="label">&nbsp;</span>
              <div style="height:33px;" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="现办案环节" prop="nowLinkId">
              <el-select v-model="caseHandleform.nowLinkId" placeholder="请选择办案环节">
                <el-option
                  v-for="item in dict['1000000000082']"
                  :key="item.id"
                  :label="item.dictionaryName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="现关押截止日期" prop="nowDetainTime">
              <el-date-picker
                v-model="caseHandleform.nowDetainTime"
                type="date"
                value-format="timestamp"
                placeholder="请选择现关押截止日期"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="法律文书" prop="legalInstrumentId">
              <el-select v-model="caseHandleform.legalInstrumentId" placeholder="请选择">
                <el-option
                  v-for="item in dict['10200827000004']"
                  :key="item.id"
                  :label="item.dictionaryName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item>
              <span slot="label">&nbsp;</span>
              <div class="link"><i class="el-icon-minus" /></div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="法律文书号" prop="legalInstrumentNumber">
              <el-input v-model="caseHandleform.legalInstrumentNumber" type="text" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form
        v-show="type !== 'detail' && seleced === 2"
        ref="resultform"
        :model="resultform"
        :rules="resultRules"
        label-position="top"
      >
        <el-row :gutter="15">
          <el-col :span="5">
            <el-form-item label="法律文书" prop="legalInstrumentId">
              <el-select v-model="resultform.legalInstrumentId" placeholder="请选择">
                <el-option
                  v-for="item in dict['10200827000004']"
                  :key="item.id"
                  :label="item.dictionaryName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item>
              <span slot="label">&nbsp;</span>
              <div class="link"><i class="el-icon-minus" /></div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="法律文书号" prop="legalInstrumentNumber">
              <el-input v-model="resultform.legalInstrumentNumber" type="text" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="决定机关" prop="organizationId">
              <el-select v-model="resultform.organizationId" placeholder="请选择">
                <el-option
                  v-for="item in dict['10200827000002']"
                  :key="item.id"
                  :label="item.dictionaryName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item>
              <span slot="label">&nbsp;</span>
              <div class="link"><i class="el-icon-minus" /></div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="审判长" prop="judge">
              <el-input v-model="resultform.judge" type="text" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="6">
            <el-form-item label="是否转决" prop="decision">
              <el-select v-model="resultform.decision" placeholder="请选择办案环节">
                <el-option
                  label="是"
                  value="1"
                />
                <el-option
                  label="否"
                  value="0"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="处理结果" prop="disposeResultId">
              <el-select v-model="resultform.disposeResultId" placeholder="请选择">
                <el-option
                  v-for="item in dict['1000000000001']"
                  :key="item.id"
                  :label="item.dictionaryName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="附加处理" prop="appendDisposeId">
              <el-select v-model="resultform.appendDisposeId" placeholder="请选择">
                <el-option
                  v-for="item in dict['10200827000005']"
                  :key="item.id"
                  :label="item.dictionaryName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <span slot="label">&nbsp;</span>
              <div style="height:33px;" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="刑期" prop="prisonTerm">
              <el-row>
                <el-col :span="8">
                  <el-input v-model="resultform.year" @change="changePrisonTerm">
                    <template slot="append">年</template>
                  </el-input>
                </el-col>
                <el-col :span="8">
                  <el-input v-model="resultform.month" @change="changePrisonTerm">
                    <template slot="append">月</template>
                  </el-input>
                </el-col>
                <el-col :span="8">
                  <el-input v-model="resultform.day" @change="changePrisonTerm">
                    <template slot="append">日</template>
                  </el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="刑期开始" prop="prisonTermStart">
              <el-date-picker
                v-model="resultform.prisonTermStart"
                type="date"
                value-format="timestamp"
                placeholder="请选择日期"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="刑期结束" prop="prisonTermEnd">
              <el-date-picker
                v-model="resultform.prisonTermEnd"
                type="date"
                value-format="timestamp"
                placeholder="请选择日期"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <span slot="label">&nbsp;</span>
              <div style="height:33px;" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="缓刑日期" prop="probationPrisonTerm">
              <el-row>
                <el-col :span="8">
                  <el-input v-model="resultform.syear" @change="changeProbationPrisonTerm">
                    <template slot="append">年</template>
                  </el-input>
                </el-col>
                <el-col :span="8">
                  <el-input v-model="resultform.smonth" @change="changeProbationPrisonTerm">
                    <template slot="append">月</template>
                  </el-input>
                </el-col>
                <el-col :span="8">
                  <el-input v-model="resultform.sday" @change="changeProbationPrisonTerm">
                    <template slot="append">日</template>
                  </el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="上诉日期" prop="appealTime">
              <el-date-picker
                v-model="resultform.appealTime"
                type="date"
                value-format="timestamp"
                placeholder="请选择日期"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="执行日期" prop="executeTime">
              <el-date-picker
                v-model="resultform.executeTime"
                type="date"
                value-format="timestamp"
                placeholder="请选择日期"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="partner-box" type="flex" justify="space-between" align="middle">
          <el-col :span="22">
            <span>同案犯批处理</span>
          </el-col>
          <el-col :span="2">
            <el-button
              plain
              @click="addPartner()"
            >添加同案人员</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-table
              :data="resultform.disposeResultAccomplices"
              style="width:  100%;"
            >
              <el-table-column prop="personName" label="姓名" align="center" />
              <el-table-column prop="sex" label="性别" align="center" />
              <el-table-column prop="monitorRoomNumber" label="监室号" align="center" />
              <el-table-column prop="certificateNumber" label="证件号" align="center" />
            </el-table>
          </el-col>
        </el-row>
      </el-form>
      <el-form
        v-show="type !== 'detail' && seleced === 3"
        ref="leaveStationform"
        :model="leaveStationform"
        :rules="leaveStationRules"
        label-position="top"
      >
        <el-row :gutter="15">
          <el-col :span="12">
            <el-form-item label="留所原因" prop="causeId">
              <el-select v-model="leaveStationform.causeId" placeholder="请选择变更原因">
                <el-option
                  v-for="item in dict['1000000000005']"
                  :key="item.id"
                  :label="item.dictionaryName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <span slot="label">&nbsp;</span>
              <div style="height:33px;" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="批准单位" prop="appendDispose">
              <el-select v-model="leaveStationform.ratifyDepartment" placeholder="请选择">
                <el-option
                  v-for="item in dict['10200827000006']"
                  :key="item.id"
                  :label="item.dictionaryName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="现关押截止日期" prop="leaveEndDate">
              <el-date-picker
                v-model="leaveStationform.leaveEndDate"
                type="date"
                value-format="timestamp"
                placeholder="请选择现关押截止日期"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="padding-top: 10px">
        <operator />
        <el-button type="default" @click="showPop = false">
          取 消
        </el-button>
        <el-button v-if="type !== 'detail'" type="primary" :loading="loading" @click="submit">
          确 定
        </el-button>
      </div>
    </el-dialog>
    <partner-dialog :show.sync="showPartner" :type="partnerType" @getPartners="getPartners" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {
  findCaseHandlerLink,
  findDisposeResult,
  findDetainTimeLimit,
  addCasehandler,
  addLeaveStation,
  addDetainTime,
  addDisposeResult
} from '@/api/custody/casehandle/manage'
import { findNameById } from '@/utils/index.js'
import PartnerDialog from '@/components/PartnerDialog'
import BasicInfo from '@/components/BasicInfo'
import Operator from '@/components/Operator'
export default {
  name: 'CaseHandleDialog',
  components: {
    PartnerDialog,
    BasicInfo,
    Operator
  },
  props: {
    type: {
      type: String,
      default: '' // register 全项录入 add 登记  eidt修改 detail详情
    },
    seleced: {
      type: Number,
      default: 0 // register 全项录入 add 登记  eidt修改 detail详情
    },
    title: {
      type: String,
      default: '' // 弹窗标题
    },
    show: {
      default: false,
      type: Boolean
    },
    prisoner: {
      default: () => ({}),
      type: Object
    }
  },
  data() {
    return {
      loading: false,
      showPartner: false,
      partnerType: '',
      changeData: [],
      datainData: [],
      resultData: [],
      caseHandleList: [],
      // 收戒人员登记表单
      form: {
        organizationType: '',
        organizationTypeName: '',
        legalInstrumentName: '',
        legalInstrumentId: '',
        legalIinstrumentType: '',
        legalInstrumentNumber: '',
        caseHandlerLinkAccomplices: [],
        remark: '',
        firstCaseHandlerName: '',
        firstPhone: '',
        secondCaseHandlerName: '',
        secondPhone: '',
        firstCertificateNumber: '',
        secondCertificateNumber: '',
        secondCertificateTypeId: '',
        firstCertificateTypeId: ''
      },
      formRules: {
        organizationTypeId: [
          { required: true, message: '请选择单位类型', trigger: 'blur' }
        ],
        organizationId: [
          { required: true, message: '请选择办案单位', trigger: 'blur' }
        ],
        linkId: [
          { required: true, message: '请选择办案环节', trigger: 'blur' }
        ],
        lockEndTime: [
          { required: true, message: '请选择现关押截止日期', trigger: 'blur' }
        ],
        legalInstrumentNumber: [
          { required: true, message: '请输入法律文书号', trigger: 'blur' }
        ],
        legalInstrumentId: [
          { required: true, message: '请选择文书类型', trigger: 'blur' }
        ],
        firstCaseHandlerName: [
          { required: true, message: '请输入办案人姓名', trigger: 'blur' }
        ],
        firstPhone: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ],
        secondCaseHandlerName: [
          { required: true, message: '请输入第二办案人姓名', trigger: 'blur' }
        ],
        secondPhone: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ]
        // firstCertificateNumber: [

        // ],
        // secondCertificateNumber: [

        // ]
      },
      caseHandleform: {
        cause: '',
        causeId: '',
        nowLinkName: '',
        nowLinkId: '',
        legalInstrumentName: '',
        legalInstrumentId: '',
        legalIinstrumentType: '',
        nowDetainTime: '',
        legalInstrumentNumber: ''
      },
      caseHandleRules: {
        causeId: [
          { required: true, message: '请选择变更原因', trigger: 'blur' }
        ],
        nowLinkId: [
          { required: true, message: '请选择办案环节', trigger: 'blur' }
        ],
        nowDetainTime: [
          { required: true, message: '请选择现关押截止日期', trigger: 'blur' }
        ],
        legalInstrumentId: [
          { required: true, message: '请选择法律文书', trigger: 'blur' }
        ],
        legalInstrumentNumber: [
          { required: true, message: '请输入法律文书号', trigger: 'blur' }
        ]
      },
      leaveStationform: {
        cause: '',
        causeId: '',
        prisonerId: '',
        prisonerName: '',
        leaveEndDate: '',
        ratifyDepartment: '',
        ratifyDepartmentName: '',
        ratifyDepartmentType: '',
        ratifyDepartmentTypeName: ''
      },
      leaveStationRules: {
        causeId: [
          { required: true, message: '请选择留所原因', trigger: 'blur' }
        ],
        linkId: [
          { required: true, message: '请选择批准单位', trigger: 'blur' }
        ],
        leaveEndDate: [
          { required: true, message: '请选择现关押截止日期', trigger: 'blur' }
        ]
      },
      resultform: {
        legalInstrumentName: '',
        legalIinstrumentType: '',
        legalInstrumentNumber: '',
        disposeResult: '',
        disposeResultId: '',
        organizationId: '',
        organizationName: '',
        decision: '',
        appendDisposeId: '',
        appendDispose: '',
        appealTime: '',
        executeTime: '',
        judge: '',
        prisonTerm: '',
        prisonTermEnd: '',
        prisonTermStart: '',
        prisonerId: '',
        prisonerName: '',
        probationPrisonTerm: '',
        disposeResultAccomplices: [],
        syear: '',
        smonth: '',
        sday: '',
        year: '',
        month: '',
        day: ''
      },
      resultRules: {
        organizationId: [
          { required: true, message: '请选择决定机关', trigger: 'blur' }
        ],
        decision: [
          { required: true, message: '请选择是否转决', trigger: 'blur' }
        ],
        legalInstrumentId: [
          { required: true, message: '请选择法律文书', trigger: 'blur' }
        ],
        legalInstrumentNumber: [
          { required: true, message: '请输入法律文书号', trigger: 'blur' }
        ],
        disposeResultId: [
          { required: true, message: '请选择处理结果', trigger: 'blur' }
        ],
        appendDisposeId: [
          { required: true, message: '请选择附加处理', trigger: 'blur' }
        ],
        prisonTerm: [
          { required: true, message: '请选择刑期', trigger: 'blur' }
        ],
        prisonTermEnd: [
          { required: true, message: '请选择刑期结束日期', trigger: 'blur' }
        ],
        prisonTermStart: [
          { required: true, message: '请选择刑期开始日期', trigger: 'blur' }
        ]
      }
    }
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapGetters(['dict']),
    showPop: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('update:show', val)
      }
    },
    caseUnitHandleList() {
      return this.caseHandleList.filter(item => {
        return item.parentId === this.form.organizationTypeId
      })
    }
  },
  watch: {
    showPop: {
      immediate: true,
      handler() {
        if (this.prisoner.id && this.type === 'detail') {
          this.getHistoryChange()
        }
      }
    }
  },
  mounted() {
    this.getDict()
  },
  methods: {
    ...mapActions(['getDictDesc']),
    beforeClose() {
      this.changeData = []
      this.datainData = []
      this.resultData = []
      this.$refs.resultform.resetFields()
      this.$refs.leaveStationform.resetFields()
      this.$refs.caseHandleform.resetFields()
      this.$refs.form.resetFields()
    },
    // 根据ID获取字典明细
    getDict() {
      // 获取办案环节类型
      if (!this.dict['1000000000082']) {
        this.getDictDesc(1000000000082)
      }
      // 获取办案单位
      if (!this.dict['1000000000006']) {
        this.getDictDesc(1000000000006)
      }
      // 获取办案单位
      if (!this.dict['10200821000005']) {
        this.getDictDesc(10200821000005).then(data => {
          this.caseHandleList = data
        })
      } else {
        this.caseHandleList = this.dict['10200821000005']
      }
      // 获取留所原因
      if (!this.dict['1000000000005']) {
        this.getDictDesc(1000000000005)
      }
      // 获取决定机关
      if (!this.dict['10200827000006']) {
        this.getDictDesc(10200827000006)
      }
      // 获取羁押期限变更原因
      if (!this.dict['10200827000003']) {
        this.getDictDesc(10200827000003)
      }
      // 获取羁押期限变更原因
      if (!this.dict['10200827000003']) {
        this.getDictDesc(10200827000003)
      }
      // 获取法律文书
      if (!this.dict['10200827000004']) {
        this.getDictDesc(10200827000004)
      }
      // 获取证件类型
      if (!this.dict['1000000000021']) {
        this.getDictDesc(1000000000021)
      }
      // 获取决定机关
      if (!this.dict['10200827000002']) {
        this.getDictDesc(10200827000002)
      }
      // 获取处理结果
      if (!this.dict['1000000000001']) {
        this.getDictDesc(1000000000001)
      }
      // 获取附加处理
      if (!this.dict['10200827000005']) {
        this.getDictDesc(10200827000005)
      }
    },
    getHistoryChange() {
      if (this.seleced === 0) {
        findCaseHandlerLink(this.prisoner.id).then(data => {
          this.changeData = data
        })
      } else if (this.seleced === 2) {
        findDisposeResult(this.prisoner.id).then(data => {
          this.resultData = data
        })
      } else if (this.seleced === 1) {
        findDetainTimeLimit(this.prisoner.id).then(data => {
          this.datainData = data
        })
      }
    },
    submit() {
      if (this.seleced === 0) {
        this.$refs.form.validate(v => {
          this.loading = false
          this.form.organizationName = findNameById(this.form.organizationTypeId, this.dict['1000000000006'])
          this.form.organization = findNameById(this.form.organizationId, this.dict['10200821000005'])
          this.form.linkName = findNameById(this.form.linkId, this.dict['1000000000082'])
          this.form.legalInstrumentName = findNameById(this.form.legalInstrumentId, this.dict['10200827000004'])
          this.form.legalInstrumentTypeId = 10200827000004
          this.form.legalInstrumentTypeName = this.dict['_10200827000004'].dictionaryTypeName
          this.form.caseHandlerInfo = {
            caseHandlerName: this.form.firstCaseHandlerName,
            phone: this.form.firstPhone,
            certificateTypeId: this.form.firstCertificateTypeId,
            certificateName: findNameById(this.form.firstCertificateTypeId, this.dict['1000000000021']),
            certificateNumber: this.form.firstCertificateNumber
          }
          this.form.sencodCaseHandlerInfo = {
            caseHandlerName: this.form.secondCaseHandlerName,
            phone: this.form.secondPhone,
            certificateTypeId: this.form.secondCertificateTypeId,
            certificateName: findNameById(this.form.secondCertificateTypeId, this.dict['1000000000021']),
            certificateNumber: this.form.secondCertificateNumber
          }
          this.form.prisonerName = this.prisoner.personName
          this.form.prisonerId = this.prisoner.id
          this.form.parentLinkId = this.prisoner.caseSegmentId
          this.form.parentLinkName = this.prisoner.caseSegmentName
          addCasehandler(this.form).then(data => {
            this.loading = false
            this.showPop = false
            this.$message.success('环节变动变更成功')
          }).catch(err => {
            console.log(err)
            this.loading = false
          })
        })
        return
      } else if (this.seleced === 3) {
        this.$refs.leaveStationform.validate(v => {
          this.loading = false
          this.leaveStationform.cause = findNameById(this.leaveStationform.causeId, this.dict['1000000000005'])
          this.leaveStationform.ratifyDepartmentName = findNameById(this.leaveStationform.ratifyDepartment, this.dict['10200827000006'])
          this.leaveStationform.ratifyDepartmentTypeId = 10200827000006
          this.leaveStationform.ratifyDepartmentTypeName = this.dict['_10200827000006'].dictionaryTypeName
          this.leaveStationform.prisonerId = this.prisoner.id
          this.leaveStationform.prisonerName = this.prisoner.personName
          addLeaveStation(this.leaveStationform).then(data => {
            this.loading = false
            this.showPop = false
            this.$message.success('留所服刑登记成功')
          }).catch(err => {
            console.log(err)
            this.loading = false
          })
        })
        return
      } else if (this.seleced === 1) {
        this.$refs.caseHandleform.validate(v => {
          this.loading = false
          this.caseHandleform.cause = findNameById(this.caseHandleform.causeId, this.dict['10200827000003'])
          this.caseHandleform.nowLinkName = findNameById(this.caseHandleform.nowLinkId, this.dict['1000000000082'])
          this.caseHandleform.legalInstrumentName = findNameById(this.caseHandleform.legalInstrumentId, this.dict['10200827000004'])
          this.caseHandleform.legalInstrumentTypeId = 10200827000004
          this.caseHandleform.legalInstrumentTypeName = this.dict['_10200827000004'].dictionaryTypeName
          this.caseHandleform.origDetainTime = this.prisoner.custodyDateEnd
          this.caseHandleform.origlinkId = this.prisoner.caseSegmentId
          this.caseHandleform.origlinkName = this.prisoner.caseSegmentName
          addDetainTime(this.caseHandleform).then(data => {
            this.loading = false
            this.showPop = false
            this.$message.success('羁押期限变更成功')
          }).catch(err => {
            console.log(err)
            this.loading = false
          })
        })
        return
      } else if (this.seleced === 2) {
        this.$refs.resultform.validate(v => {
          this.loading = false
          this.resultform.organizationName = findNameById(this.resultform.organizationId, this.dict['10200827000002'])
          this.resultform.organizationTypeId = 10200827000002
          this.resultform.organizationTypeName = this.dict['_10200827000002'].dictionaryTypeName
          this.resultform.disposeResultName = findNameById(this.resultform.disposeResultId, this.dict['1000000000001'])
          this.resultform.appendDisposeName = findNameById(this.resultform.appendDisposeId, this.dict['10200827000005'])
          this.resultform.legalInstrumentName = findNameById(this.resultform.legalInstrumentId, this.dict['10200827000004'])
          this.resultform.legalInstrumentTypeId = 10200827000004
          this.resultform.legalInstrumentTypeName = this.dict['_10200827000004'].dictionaryTypeName
          this.resultform.prisonerId = this.prisoner.id
          this.resultform.prisonerName = this.prisoner.personName
          addDisposeResult(this.resultform).then(data => {
            this.loading = false
            this.showPop = false
            this.$message.success('处理结果变更成功')
          }).catch(err => {
            console.log(err)
            this.loading = false
          })
        })
        return
      }

      if (this.type === 'register' || this.type === 'add') {
        this.addServer()
        addCasehandler()
        addLeaveStation()
        addDetainTime()
        addDisposeResult()
      } else {
        this.updateServer()
      }
    },
    /**
     * 提交修改的内容
     */
    updateServer(params) {
    },
    addPartner() {
      if (this.seleced === 0) {
        this.partnerType = 'bananhuanjie'
      } else if (this.seleced === 2) {
        this.partnerType = 'chulijieguo'
      }
      this.showPartner = true
    },
    changePartnerNo(val, scope, index) {
      if ((scope.certificateTypeId === 1000000000000 || scope.certificateTypeId === 1000000000001) && !/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(val)) {
        scope.idValedate = false
        this.$set(this.form.matches, index, scope)
      } else {
        scope.idValedate = true
        this.$set(this.form.matches, index, scope)
      }
    },
    changePrisonTerm() {
      this.resultform.prisonTerm = `${this.resultform.year},${this.resultform.month},${this.resultform.day}`
    },
    changeProbationPrisonTerm() {
      this.resultform.probationPrisonTerm = `${this.resultform.syear},${this.resultform.smonth},${this.resultform.sday}`
    },
    getPartners(list) {
      if (this.seleced === 0) {
        this.form.caseHandlerLinkAccomplices.push(...list)
      } else {
        this.resultform.disposeResultAccomplices.push(...list)
      }
    }
  }
}

</script>
<style lang="scss" scoped>
.origin {
  border-bottom: 1px solid #E8E8E8;
  .dialog-content {
    margin: 10px 0 20px;
  }
}
.detail-row {
  margin-top: 20px;

  .dialog-title {
    font-size: 18px;
    color: #000;
    font-weight: bold;
  }
  .dialog-content {
    font-size: 14px;
    color: #000;
    margin: 10px 0;
    display: inline-block;
  }
}
.link {
  height: 33px;
  text-align: center;
  color: #dcdfe6;
}
.el-input, .el-select, .el-date {
  width: 100%;
}
::v-deep .el-form-item__label {
  font-size: 12px;
  height: 32px;
}
::v-deep  .el-range-editor--small.el-input__inner {
  height: 33px;
}

::v-deep .el-input.is-disabled .el-input__inner {
  color: #333;
}
.partner-box {
 border-top: 1px solid #E8E8E8;
 padding: 20px 0 12px;
}

</style>
