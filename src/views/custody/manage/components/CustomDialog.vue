/* eslint-disable eqeqeq */
<template>
  <div>
    <el-dialog title="收戒人员信息" :visible.sync="showPop" width="75.56%" @close="beforeClose" @closed="afterClose">
      <el-row v-loading="loading" :gutter="15">
        <el-form
          v-if="showPop"
          ref="form"
          :model="form"
          :rules="formRules"
          label-width="100px"
          label-position="right"
        >
          <div class="base-title">
            基本信息
          </div>
          <el-col v-if="form.custodyStatus !== 5 && type === 'detail'" :span="24" style="margin-bottom:  20px;">
            <el-form-item label-width=" ">
              <el-row :gutter="10">
                <img class="head-img" src="" alt="生物信息">
                <img class="head-img" src="" alt="生物信息">
                <img class="head-img" src="" alt="生物信息">
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="人员编号: ">
              <el-input v-model="form.basicInfo.personNumber" disabled placeholder="请输入人员编号" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件类型: " prop="basicInfo.certificateTypeId">
              <el-select v-model="form.basicInfo.certificateTypeId" :disabled="type === 'detail'" placeholder="请选择证件类型">
                <el-option
                  v-for="item in dic.cardType"
                  :key="item.id"
                  :label="item.dictionaryName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件号码: " prop="basicInfo.certificateNumber">
              <el-input v-model="form.basicInfo.certificateNumber" :disabled="type === 'detail'" placeholder="请输入证件号码" @change="changeIdCard" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名: " prop="basicInfo.personName">
              <el-input v-model="form.basicInfo.personName" :disabled="type === 'detail'" placeholder="请输入人员姓名" />
            </el-form-item>
          </el-col>
          <el-col v-if="form.custodyStatus !== 5" :span="8">
            <el-form-item label="别名: ">
              <el-input v-model="form.basicInfo.personAliasName" :disabled="type === 'detail'" placeholder="请输入别名" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别: " prop="basicInfo.personSex">
              <el-select v-model="form.basicInfo.personSex" :disabled="type === 'detail'" placeholder="请选择性别">
                <el-option
                  v-for="item in dic.sex"
                  :key="item.id"
                  :label="item.dictionaryName"
                  :value="item.dictionaryName"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出生日期" prop="basicInfo.personBirthday">
              <el-date-picker
                v-model="form.basicInfo.personBirthday"
                :disabled="type === 'detail'"
                type="date"
                value-format="timestamp"
                placeholder="请选择出生日期"
              />
            </el-form-item>
          </el-col>
          <div v-if="form.custodyStatus !== 5">
            <el-col :span="8">
              <el-form-item label="国籍" prop="basicInfo.personNationalityId">
                <el-select
                  v-model="form.basicInfo.personNationalityId"
                  :disabled="type === 'detail'"
                  filterable
                  placeholder="请选择国籍"
                  @change="countriesChange"
                >
                  <el-option
                    v-for="item in dic.countries"
                    :key="item.id"
                    :label="item.dictionaryName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="民族" prop="basicInfo.personNationId">
                <el-select v-model="form.basicInfo.personNationId" :disabled="type === 'detail'" filterable placeholder="请选择民族">
                  <el-option
                    v-for="item in dic.national"
                    :key="item.id"
                    :label="item.dictionaryName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="户口所在地" prop="basicInfo.personRegisteredResidence">
                <el-input
                  v-model="form.basicInfo.personRegisteredResidence"
                  :disabled="type === 'detail'"
                  type="textarea"
                  resize="none"
                  placeholder="请输入户籍所在地"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  maxlength="500"
                  show-word-limit
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="常住地" prop="basicInfo.personPermanentResidence">
                <el-input
                  v-model="form.basicInfo.personPermanentResidence"
                  :disabled="type === 'detail'"
                  type="textarea"
                  resize="none"
                  placeholder="请输入常住地"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  maxlength="500"
                  show-word-limit
                  autocomplete="off"
                />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="文化程度" prop="basicInfo.personEducationId">
                <el-select v-model="form.basicInfo.personEducationId" :disabled="type === 'detail'" filterable placeholder="请选择文化程度">
                  <el-option
                    v-for="item in dic.education"
                    :key="item.id"
                    :label="item.dictionaryName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="婚姻状况" prop="basicInfo.personMaritalStatusId">
                <el-select v-model="form.basicInfo.personMaritalStatusId" :disabled="type === 'detail'" filterable placeholder="请选择婚姻状况">
                  <el-option
                    v-for="item in dic.marriage"
                    :key="item.id"
                    :label="item.dictionaryName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="体貌特征" prop="basicInfo.personPhysicalFeatures">
                <el-input v-model="form.basicInfo.personPhysicalFeatures" :disabled="type === 'detail'" placeholder="请输入体貌特征" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="家属一姓名" prop="basicInfo.homes[0].homeName">
                <el-input v-model="form.basicInfo.homes[0].homeName" :disabled="type === 'detail'" placeholder="请输入家属一姓名" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="家属电话" prop="basicInfo.homes[0].phone">
                <el-input v-model="form.basicInfo.homes[0].phone" :disabled="type === 'detail'" placeholder="请输入家属电话" type="number" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <span slot="label">&nbsp;</span>
                <div style="height:33px;" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="家属二姓名" prop="basicInfo.homes[1].homeName">
                <el-input v-model="form.basicInfo.homes[1].homeName" :disabled="type === 'detail'" placeholder="请输入家属二姓名" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="家属电话" prop="basicInfo.homes[1].phone">
                <el-input v-model="form.basicInfo.homes[1].phone" :disabled="type === 'detail'" placeholder="请输入家属电话" type="number" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <span slot="label">&nbsp;</span>
                <div style="height:33px;" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="工作单位">
                <el-input v-model="form.basicInfo.personWorkCompany" :disabled="type === 'detail'" placeholder="请输入工作单位" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="职业">
                <el-select
                  v-model="form.basicInfo.personWorkId"
                  :disabled="type === 'detail'"
                  filterable=""
                  placeholder="请选择职业"
                >
                  <el-option
                    v-for="item in dic.job"
                    :key="item.id"
                    :label="item.dictionaryName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="职务">
                <el-select
                  v-model="form.basicInfo.personPositionId"
                  :disabled="type === 'detail'"
                  placeholder="请选择职务"
                >
                  <el-option
                    v-for="item in dic.position"
                    :key="item.id"
                    :label="item.dictionaryName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          <!-- <el-col :span="24">
            <el-form-item label="本人简历">
              <el-input
                v-model="form.basicInfo.personResume"
                :disabled="type === 'detail'"
                type="textarea"
                resize="none"
                placeholder="请输入简历 500字符以内"
                :autosize="{ minRows: 2, maxRows: 4}"
                maxlength="500"
                show-word-limit
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item>
              <span slot="label" style="line-height: 1.2; width: 60px; display: inline-block;">何时何地受过何种处罚</span>
              <el-input
                v-model="form.basicInfo.personProcessingRecord"
                :disabled="type === 'detail'"
                type="textarea"
                resize="none"
                placeholder="500字符以内"
                :autosize="{ minRows: 2, maxRows: 4}"
                maxlength="500"
                show-word-limit
                autocomplete="off"
              />
            </el-form-item>
          </el-col> -->
          </div>
          <el-col :span="24">
            <div class="base-title">
              案件信息
            </div>
          </el-col>
          <el-col v-if="form.custodyStatus !== 5" :span="8">
            <el-form-item label="入所原因" prop="basicInfo.strongWarning.entryReasonId">
              <el-select v-model="form.basicInfo.strongWarning.entryReasonId" :disabled="type === 'detail'" filterable placeholder="请选择入所方式">
                <el-option
                  v-for="item in dic.joinReason"
                  :key="item.id"
                  :label="item.dictionaryName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收押凭证" prop="basicInfo.strongWarning.voucherId">
              <el-select v-model="form.basicInfo.strongWarning.voucherId" :disabled="type === 'detail'" filterable placeholder="请选择入所方式">
                <el-option
                  v-for="item in dic.credentials"
                  :key="item.id"
                  :label="item.dictionaryName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="法律文书号" prop="basicInfo.strongWarning.legalDocumentNo">
              <el-input v-model="form.basicInfo.strongWarning.legalDocumentNo" :disabled="type === 'detail'" placeholder="请输入法律文书号" type="text" />
            </el-form-item>
          </el-col>
          <el-col v-if="form.custodyStatus !== 5" :span="24">
            <el-form-item label="简要案情" prop="basicInfo.strongWarning.caseSummary">
              <el-input
                v-model="form.basicInfo.strongWarning.caseSummary"
                :disabled="type === 'detail'"
                type="textarea"
                resize="none"
                placeholder="500字符以内"
                :autosize="{ minRows: 2, maxRows: 4}"
                maxlength="500"
                show-word-limit
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
          <el-col v-if="form.custodyStatus !== 5" :span="8">
            <el-form-item label="入所日期" prop="basicInfo.strongWarning.enteringInstituteDate">
              <el-date-picker
                v-model="form.basicInfo.strongWarning.enteringInstituteDate"
                :disabled="type === 'detail'"
                type="date"
                placeholder="请输入入所日期"
                value-format="timestamp"
              />
            </el-form-item>
          </el-col>
          <el-col v-else :span="8">
            <el-form-item label="拒绝日期" prop="basicInfo.strongWarning.enteringInstituteDate">
              <el-date-picker
                v-model="form.basicInfo.strongWarning.enteringInstituteDate"
                :disabled="type === 'detail'"
                type="date"
                placeholder="请输入入所日期"
                value-format="timestamp"
              />
            </el-form-item>
          </el-col>
          <div v-if="form.custodyStatus !== 5">
            <!-- //TODO -->
            <el-col :span="8">
              <el-form-item label="关押截止日期" prop="basicInfo.strongWarning.custodyDateEnd">
                <el-date-picker
                  v-model="form.basicInfo.strongWarning.custodyDateEnd"
                  :disabled="type === 'detail'"
                  type="date"
                  placeholder="请输入关押截止日期"
                  value-format="timestamp"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="送押单位" prop="basicInfo.strongWarning.sendUnitId">
                <el-select v-model="form.basicInfo.strongWarning.sendUnitId" :disabled="type === 'detail'" filterable placeholder="请选择入所方式">
                  <!-- //TODO -->
                  <el-option
                    v-for="item in dic.sendList"
                    :key="item.id"
                    :label="item.dictionaryName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="逮捕日期">
                <el-date-picker
                  v-model="form.basicInfo.strongWarning.arrestDate"
                  :disabled="type === 'detail'"
                  type="date"
                  placeholder="请输入逮捕日期"
                  value-format="timestamp"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="羁押日期">
                <el-date-picker
                  v-model="form.basicInfo.strongWarning.detainDate"
                  :disabled="type === 'detail'"
                  type="date"
                  placeholder="请输入羁押日期"
                  value-format="timestamp"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="档案编号">
                <el-input v-model="form.basicInfo.strongWarning.recordNo" :disabled="type === 'detail'" placeholder="请输入档案编号" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="办案环节" prop="basicInfo.strongWarning.caseSegmentId">
                <el-select v-model="form.basicInfo.strongWarning.caseSegmentId" :disabled="type === 'detail'" filterable placeholder="请选择办案环节">
                  <el-option
                    v-for="item in dic.caseSegament"
                    :key="item.id"
                    :label="item.dictionaryName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </div>
          <el-col :span="8">
            <el-form-item label="办案单位类型" prop="basicInfo.strongWarning.caseHandlingUnitTypeId">
              <el-select v-model="form.basicInfo.strongWarning.caseHandlingUnitTypeId" :disabled="type === 'detail'" filterable placeholder="请选择办案单位类型">
                <el-option
                  v-for="item in dic.worksType"
                  :key="item.id"
                  :label="item.dictionaryName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="办案单位" prop="basicInfo.strongWarning.caseHandlingUnitId">
              <el-select v-model="form.basicInfo.strongWarning.caseHandlingUnitId" :disabled="type === 'detail'" filterable placeholder="请选择办案单位类型">
                <el-option
                  v-for="item in dic.works"
                  :key="item.id"
                  :label="item.dictionaryName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="form.custodyStatus === 5" :span="8">
            <el-form-item>
              <span slot="label">&nbsp;</span>
              <div style="height:33px;" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="办案人一姓名" prop="basicInfo.strongWarning.caseHandlers[0].caseHandlerName">
              <el-input v-model="form.basicInfo.strongWarning.caseHandlers[0].caseHandlerName" :disabled="type === 'detail'" placeholder="请输入办案人一姓名" type="text" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="办案人电话" prop="basicInfo.strongWarning.caseHandlers[0].phone">
              <el-input v-model="form.basicInfo.strongWarning.caseHandlers[0].phone" :disabled="type === 'detail'" placeholder="请输入办案人电话" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <span slot="label">&nbsp;</span>
              <div style="height:33px;" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="办案人二姓名" prop="basicInfo.strongWarning.caseHandlers[1].caseHandlerName">
              <el-input v-model="form.basicInfo.strongWarning.caseHandlers[1].caseHandlerName" :disabled="type === 'detail'" placeholder="请输入办案人二姓名" type="text" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="办案人电话" prop="basicInfo.strongWarning.caseHandlers[1].phone">
              <el-input v-model="form.basicInfo.strongWarning.caseHandlers[1].phone" :disabled="type === 'detail'" placeholder="请输入办案人电话" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <span slot="label">&nbsp;</span>
              <div style="height:33px;" />
            </el-form-item>
          </el-col>
          <el-col v-if="form.custodyStatus === 5" :span="24">
            <el-form-item label="拒绝原因:">
              <span style="font-size: 13px; color:#333; line-height: 33px;">{{ form.rejectReason }}</span>
            </el-form-item>
          </el-col>
          <div v-if="form.custodyStatus !== 5">
            <el-col :span="24">
              <el-form-item label="案件类型" prop="basicInfo.strongWarning.crimeId">
                <el-checkbox-group v-model="form.basicInfo.strongWarning.crimeId" :disabled="type === 'detail'">
                  <!-- <el-checkbox v-for="item in dic.crime" :key="item.id" :label="item.dictionaryName" :value="item.id" /> -->
                  <el-checkbox label="涉毒类" />
                  <el-checkbox label="涉枪暴类" />
                  <el-checkbox label="涉盗抢骗类" />
                  <el-checkbox label="涉黑类" />
                  <el-checkbox label="涉电信类" />
                  <el-checkbox label="涉网络类" />
                  <el-checkbox label="涉黄类" />
                  <el-checkbox label="涉赌类" />
                  <el-checkbox label="其他" />
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="涉嫌罪名" prop="basicInfo.strongWarning.accusation">
                <el-input v-model="form.basicInfo.strongWarning.accusation" :disabled="type === 'detail'" placeholder="请输入涉嫌罪名" type="number" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="有无前科" prop="basicInfo.strongWarning.criminalRecord">
                <el-radio v-model="form.basicInfo.strongWarning.criminalRecord" :disabled="type === 'detail'" label="1">有</el-radio>
                <el-radio v-model="form.basicInfo.strongWarning.criminalRecord" :disabled="type === 'detail'" label="2">无</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="特殊限制">
                <el-checkbox-group v-model="form.basicInfo.strongWarning.limitation" :disabled="type === 'detail'">
                  <el-checkbox label="单独关押" />
                  <el-checkbox label="禁止其他单位审讯" />
                  <el-checkbox label="禁止律师会见" />
                  <el-checkbox label="禁止家属会见" />
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input
                  v-model="form.basicInfo.strongWarning.remark"
                  :disabled="type === 'detail'"
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
          </div>
          <div v-if="form.custodyStatus !== 5">
            <div v-if="form.custodyStatus !== 5">
              <el-col :span="24">
                <div class="base-title">
                  收押信息
                </div>
              </el-col>
              <el-col :span="8">
                <el-form-item label="号码服务">
                  <el-input v-model="form.numberClothesNumber" :disabled="type === 'detail'" placeholder="请输入号码服务" type="text" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收押监室" prop="custodyWardId">
                  <el-select v-model="form.custodyWardId" :disabled="type === 'detail'" filterable placeholder="请选择病室">
                    <el-option
                      v-for="item in dic.room"
                      :key="item.id"
                      :label="item.dictionaryName"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item>
                  <span slot="label">&nbsp;</span>
                  <div style="height:33px;" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="体表情况">
                  <el-checkbox-group v-model="form.bodyStatus" :disabled="type === 'detail'">
                    <el-checkbox label="正常" :disabled="hasOtherItem && form.bodyStatus.length > 0" />
                    <el-checkbox label="外伤史" :disabled="form.bodyStatus.indexOf('正常') !== -1 && form.bodyStatus.length > 0" />
                    <el-checkbox label="手术史" :disabled="form.bodyStatus.indexOf('正常') !== -1 && form.bodyStatus.length > 0" />
                    <el-checkbox label="纹身" :disabled="form.bodyStatus.indexOf('正常') !== -1 && form.bodyStatus.length > 0" />
                    <el-checkbox label="其他" :disabled="form.bodyStatus.indexOf('正常') !== -1 && form.bodyStatus.length > 0" />
                  </el-checkbox-group>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="体表照片: ">
                  <el-upload
                    v-if="type !== 'detail'"
                    :limit="10"
                    multiple
                    :file-list="bodyFileListForAttribut"
                    action="supervise/fastdfs-client/upload"
                    :on-remove="onImageRemove"
                    :on-success="onImageUploadSuccess"
                    list-type="picture-card"
                  >
                    <span>添加图片</span>
                  </el-upload>
                  <span v-if="type !== 'detail'" class="tips">（最多可添加10张格式为jpg/png、大小不超过5MB的图片）</span>
                  <div v-else class="imgList">
                    <img v-for="(item, index) in bodyFileList" :key="index" :src="item.url" alt="">
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="储物柜">
                  <el-input v-model="form.place" :disabled="type === 'detail'" placeholder="请输入储物柜" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label=" ">
                  <el-table
                    :data="form.storages"
                    style="width:  100%;"
                  >
                    <el-table-column type="index" label="序号" />
                    <el-table-column prop="itemName" label="物品名称" align="center">
                      <template slot-scope="scope">
                        <el-input v-if="scope.$index == form.storages.length - 1 && type !== 'detail'" v-model="scope.row.itemName" />
                        <span v-else>{{ scope.row.itemName }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="itemCount" label="数量" align="center">
                      <template slot-scope="scope">
                        <el-input v-if="scope.$index == form.storages.length - 1 && type !== 'detail'" v-model="scope.row.itemCount" type="number" />
                        <span v-else>{{ scope.row.itemCount }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="itemUnit" label="单位" align="center">
                      <template slot-scope="scope">
                        <el-input v-if="scope.$index == form.storages.length - 1 && type !== 'detail'" v-model="scope.row.itemUnit" />
                        <span v-else>{{ scope.row.itemUnit }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column v-if="type !== 'detail'" label="操作" align="center" fixed="right">
                      <template slot-scope="scope">
                        <el-button
                          type="text"
                          size="mini"
                          @click="addFullItem()"
                        >新增</el-button>
                        <el-button v-if="form.storages.length > 1" type="text" size="mini" @click="delFullItem(scope.$index)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="同案批处理">
                  <el-button
                    v-if="type !== 'detail'"
                    type="primary"
                    @click="addPartner()"
                  >添加同案人员</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label=" ">
                  <el-table
                    :data="form.matches"
                    style="width:  100%;"
                  >
                    <el-table-column prop="personName" label="姓名" align="center">
                      <template slot-scope="scope">
                        <el-input v-if="scope.$index == form.matches.length - 1 && type !== 'detail'" v-model="scope.row.personName" />
                        <span v-else>{{ scope.row.personName }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="itemCount" label="证件类型" align="center">
                      <template slot-scope="scope">
                        <el-select
                          v-if="scope.$index == form.matches.length - 1 && type !== 'detail'"
                          v-model="scope.row.certificateTypeId"
                          placeholder="请选择证件类型"
                        >
                          <el-option
                            v-for="item in dic.cardType"
                            :key="item.id"
                            :label="item.dictionaryName"
                            :value="item.id"
                          />
                        </el-select>
                        <span v-else>{{ scope.row.itemCount }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="certificateNumber" label="证件号" align="center" class-name="tableidcard">
                      <template slot-scope="scope">
                        <template v-if="scope.$index == form.matches.length - 1 && type !== 'detail'">
                          <el-input v-model="scope.row.certificateNumber" :class="{validate: !scope.row.idValedate}" @change="changePartnerNo(scope.row.certificateNumber,scope.row,scope.$index)" />
                          <div v-show="!scope.row.idValedate" class="el-form-item__error">
                            请输入正确的身份证号码
                          </div>
                        </template>
                        <span v-else>{{ scope.row.certificateNumber }}</span>

                      </template>
                    </el-table-column>
                    <el-table-column v-if="type !== 'detail'" label="操作" align="center" fixed="right">
                      <template slot-scope="scope">
                        <el-button
                          type="text"
                          size="mini"
                          @click="addRowPartner()"
                        >新增</el-button>
                        <el-button v-if="form.matches.length > 1" type="text" size="mini" @click="delRowPartner(scope.$index)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item v-if="type === 'detail' || type === 'update'" label="最后录入人员: ">
                  <el-input v-model="form.operatorName" disabled />
                </el-form-item>
              </el-col>
            </div>
          </div>
        </el-form>
      </el-row>

      <div slot="footer" class="dialog-footer" style="padding-top: 10px">
        <div class="inputGroup" style="float: left;">
          <el-form label-width="100px" inline>
            <!-- //TODO 修改的时候会使用之前的操作人员吗？ -->
            <el-form-item label="操作员">
              <el-input v-model="user.userName" disabled placeholder="请输入操作员 " />
            </el-form-item>
            <el-form-item label="警号">
              <el-input v-model="user.policeCode" disabled placeholder="请输入警号" />
            </el-form-item>
          </el-form>
        </div>
        <el-button type="default" @click="showPop = false">
          取消
        </el-button>
        <el-button v-if="type !== 'detail'" type="primary" @click="submit">
          确定提交
        </el-button>
      </div>
    </el-dialog>
    <partner-dialog :show.sync="showPartner" @getPartners="getPartners" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDictDesc } from '@/api/basic/dict'
import { getDetail, update, delImage, supervisionOffice, delStorage, delMatche } from '@/api/custody/account/index'
import { addCustodyInformation, findSuggestion } from '@/api/custody/custodyReg'
import { deepClone } from '@/components/PublicMethod'
import PartnerDialog from '@/components/PartnerDialog'
// import sysRestoreVue from '../../../mnt/deploy/sysRestore.vue'
import formRules from './formRules'
import defaultForm from './defaultForm'
export default {
  name: 'CustomDialog',
  components: {
    PartnerDialog
  },
  props: {
    type: {
      type: String,
      default: 'detail' // register 全项录入 add 登记  eidt修改 detail详情
    },
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
    const rules = formRules(this)
    return {
      loading: false,
      showPartner: false,
      formRules: rules,
      dic: {
        sendList: [],
        worksType: [],
        works: [], // 办案单位
        cardType: [], // 证件类型
        sex: [], // 性别
        countries: [], // 国家
        national: [], // 民族
        marriage: [], // 婚姻
        education: [], // 文化程度
        job: [], // 职业
        position: [], // 职务
        joinReason: [], // 入所原因
        credentials: [], // 收押凭证
        caseSegament: [], // 办案环节
        crime: [], // 案件 类型
        room: [] // 病室
      },
      showPop: false,
      // 收戒人员登记表单
      form: defaultForm,
      bodyFileListForAttribut: [], // 这个是初始化的时候查询后台数据库 基本都开始查出来的时候有，后面就不会动了
      bodyFileList: [], // 这个是随时会更改的， 删除、新增都会影响到它
      pickerOptions: {
        shortcuts: [
          {
            text: '一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              end.setMonth(start.getMonth() + 1)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              end.setMonth(start.getMonth() + 3)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '六个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              end.setMonth(start.getMonth() + 6)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '一年',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              end.setMonth(start.getMonth() + 12)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '两年',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              end.setMonth(start.getMonth() + 24)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  watch: {
    show: {
      immediate: true,
      handler() {
        this.showPop = this.show
        if (this.show) {
          this.getItemDetail()
        }
      }
    }
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapGetters(['user']),
    hasOtherItem() {
      const arr = ['手术史', '外伤史', '纹身', '其他']
      for (let i = 0, len = this.form.bodyStatus.length; i < len; i++) {
        if (arr.indexOf(this.form.bodyStatus[i]) !== -1) {
          return true
        }
      }
      return false
    }
  },
  mounted() {
    /**
     * 加载字典
     */
    getDictDesc({ id: 10200824000004 }).then(data => {
      this.dic.sendList = data.dic
    }) // 办案单位类型
    getDictDesc({ id: 1000000000006 }).then(data => {
      this.dic.worksType = data.dic
    }) // 办案单位类型
    getDictDesc({ id: 10200821000005 }).then(data => {
      this.dic.works = data.dic
    }) // 办案单位
    getDictDesc({ id: 1000000000021 }).then(data => {
      this.dic.cardType = data.dic
    }) // 证件类型
    getDictDesc({ id: 1000000000024 }).then(data => {
      this.dic.sex = data.dic
    }) // 性别
    getDictDesc({ id: 1000000000026 }).then(data => {
      this.dic.countries = data.dic
    }) // 国籍
    getDictDesc({ id: 1000000000025 }).then(data => {
      this.dic.marriage = data.dic
    }) // 婚姻状况
    getDictDesc({ id: 1000000000028 }).then(data => {
      this.dic.education = data.dic
    }) // 文化程度
    getDictDesc({ id: 1000000000030 }).then(data => {
      this.dic.job = data.dic
    }) // 职业
    getDictDesc({ id: 1000000000081 }).then(data => {
      this.dic.position = data.dic
    }) // 职务
    getDictDesc({ id: 1000000000089 }).then(data => {
      this.dic.joinReason = data.dic
    }) // 入所原因
    getDictDesc({ id: 1000000000012 }).then(data => {
      this.dic.credentials = data.dic
    }) // 收押凭证
    getDictDesc({ id: 1000000000082 }).then(data => {
      this.dic.caseSegament = data.dic
    }) // 办案环节
    getDictDesc({ id: 1000000000035 }).then(data => {
      this.dic.crime = data.dic
    }) // 案件 类型
    // getDictDesc({ id: 1597806360537 }).then(data => {
    //   this.dic.room = data.dic
    // }) // 病室
    supervisionOffice().then(data => {
      this.dic.room = data.records.map(e => {
        return {
          dictionaryName: e.supervisionOfficeName,
          id: e.id
        }
      })
    })

    getDictDesc({ id: 1000000000027 }).then(data => {
      this.dic.national = data.dic
    }) // 民族
  },
  methods: {
    afterClose() {
      this.$emit('update:show', false)
    },
    beforeClose() {
      this.$refs.form.clearValidate()
    },
    /**
     * 当切换国家为中国的时候 民族设置为汉族，
     * 当切换到其他国家的时候 民族设置为其他
     */
    countriesChange(val) {
      if (val === 1000000001482) {
        this.form.basicInfo.personNationId = 1000000000154 // 汉族
      } else {
        this.form.basicInfo.personNationId = 1000000000214 // 其他
      }
    },
    /**
     * 拉取收戒详情
     */
    getItemDetail() {
      this.form = deepClone(defaultForm)
      if (this.id === '' || this.type === 'register') {
        this.addFullItem()
        this.addRowPartner()
        return
      }
      this.loading = false
      getDetail(this.id).then(data => {
        this.loading = false
        const conversionArr = str => str && str.split ? str.split(',') : []
        if (data.basicInfo.homes.length === 1) {
          data.basicInfo.homes.push({
            homeName: '',
            phone: ''
          })
        }
        data.bodyStatus = conversionArr(data.bodyStatus)
        data.basicInfo.strongWarning.limitation = conversionArr(data.basicInfo.strongWarning.limitation)
        data.basicInfo.strongWarning.crimeName = conversionArr(data.basicInfo.strongWarning.crimeName)
        data.basicInfo.strongWarning.crimeId = conversionArr(data.basicInfo.strongWarning.crimeId)
        this.bodyFileList = data.bodys.map(e => {
          return {
            _id: e.id,
            status: 'success',
            url: e.imagePath
          }
        })
        this.bodyFileListForAttribut = data.bodys.map(e => {
          return {
            _id: e.id,
            status: 'success',
            url: e.imagePath
          }
        })
        if (data.storages.length > 0) {
          data.place = data.storages[0].place
        }
        this.$set(this, 'form', data)
        this.$forceUpdate()
        if (this.type !== 'detail') {
          this.addFullItem()
          this.addRowPartner()
        }
      }).catch(() => {
        this.loading = false
      })
    },
    /**
     * 新增一行储物柜
     */
    addFullItem() {
      var template = {
        itemName: '',
        itemCount: '',
        itemUnit: '',
        place: ''
      }
      if (this.form.storages.length > 0) {
        const lastOne = this.form.storages[this.form.storages.length - 1]
        for (const i in template) {
          if (i === 'place') {
            continue
          }
          const e = lastOne[i]
          if (e === '' || e === null || e === undefined) {
            this.$message.error('请完善数据')
            return
          }
        }
      }
      this.form.storages.push(template)
    },
    delFullItem(index) {
      const item = this.form.storages.splice(index, 1)
      const id = item[0] ? item[0].id : ''
      if (id && id !== 0) {
        delStorage(item[0] ? item[0].id : '')
      }
    },
    /**
     * 新增一行同案人员
     */
    addRowPartner() {
      var template = {
        personName: '',
        certificateTypeName: '居民身份证', // 默认居民身份证
        certificateTypeId: 1000000000000,
        certificateNumber: '',
        idValedate: true
      }
      if (this.form.matches.length > 0) {
        const lastOne = this.form.matches[this.form.matches.length - 1]
        lastOne.idValedate = true
        for (const i in template) {
          const e = lastOne[i]
          if (e === '' || e === null || e === undefined) {
            this.$message.error('请完善数据')
            return
          }
        }
      }
      this.form.matches.push(template)
    },
    delRowPartner(index) {
      if (this.form.matches[index]) {
        const item = this.form.matches.splice(index, 1)
        const id = item[0] ? item[0].id : ''
        if (id && id !== 0) {
          delMatche(id)
        }
      }
    },
    /**
     * 上传图片成功
     */
    onImageUploadSuccess(res) {
      if (res.code === 2000) {
        this.bodyFileList.push({ url: res.data })
      }
    },
    /**
     * 当移除图片
     */
    onImageRemove(file, fileList) {
      const url = file.response ? file.response.data : file.url
      const _id = file._id
      if (_id) {
        delImage(_id)
      }
      this.bodyFileList = this.bodyFileList.filter(e => e.url !== url)
    },
    submit() {
      this.$refs.form.validate(v => {
        if (v) {
          let flag = false
          this.form.matches.forEach(item => {
            if (!item.idValedate && this.type !== 'edit') {
              flag = true
            }
          })
          if (flag) {
            return
          }
          this.loading = false
          const params = deepClone(this.form) // 处理数据
          const basicInfo = params.basicInfo
          const strongWarning = params.basicInfo.strongWarning
          /**
           * 将下拉框的中文提取出来
           */
          const findNameById = (type, id) => {
            const item = this.dic[type].find(e => e.id === id)
            return item ? item.dictionaryName : ''
          }
          if (basicInfo.certificateTypeId) {
            basicInfo.certificateTypeName = findNameById('cardType', basicInfo.certificateTypeId)
          } // 证件类型
          if (basicInfo.personNationalityId) {
            basicInfo.personNationalityName = findNameById('countries', basicInfo.personNationalityId)
          } // 国籍信息
          if (basicInfo.personNationId) {
            basicInfo.personNationName = findNameById('national', basicInfo.personNationId)
          } // 民族信息
          if (basicInfo.personEducationId) {
            basicInfo.personEducationName = findNameById('education', basicInfo.personEducationId)
          } // 文化程度
          if (basicInfo.personMaritalStatusId) {
            basicInfo.personMaritalStatusName = findNameById('marriage', basicInfo.personMaritalStatusId)
          } // 婚姻状况
          if (strongWarning.caseHandlingUnitTypeId) {
            strongWarning.caseHandlingUnitTypeName = findNameById('worksType', strongWarning.caseHandlingUnitTypeId)
          } // 办案单位类型
          if (strongWarning.caseHandlingUnitId) {
            strongWarning.caseHandlingUnitName = findNameById('works', strongWarning.caseHandlingUnitId)
          } // 办案单位
          if (strongWarning.caseHandlingUnitTypeId) {
            strongWarning.caseHandlingUnitTypeName = findNameById('works', strongWarning.caseHandlingUnitTypeId)
          } // 办案单位类型
          if (basicInfo.personWorkId) {
            basicInfo.personWorkName = findNameById('job', basicInfo.personWorkId)
          } // 职业
          if (basicInfo.personPositionId) {
            basicInfo.personPositionName = findNameById('position', basicInfo.personPositionId)
          } // 职务

          if (strongWarning.caseSegmentId) {
            strongWarning.caseSegmentName = findNameById('caseSegament', strongWarning.caseSegmentId)
          } // 办案环节
          if (strongWarning.entryReasonId) {
            strongWarning.entryReasonName = findNameById('joinReason', strongWarning.entryReasonId)
          } // 入所原因
          if (strongWarning.voucherId) {
            strongWarning.voucherName = findNameById('credentials', strongWarning.voucherId)
          } // 收押凭证
          if (params.custodyWardId) {
            params.custodyWardName = findNameById('room', params.custodyWardId)
          } // 病室
          if (strongWarning.sendUnitId) {
            strongWarning.sendUnitName = findNameById('sendList', strongWarning.sendUnitId)
          } // 病室
          /**
           * 去掉空数据
           * 将储物柜编号塞进table的每列中
           */
          params.storages = params.storages.filter(e => {
            return e.itemName && e.itemCount && e.itemUnit
          })
          params.storages.forEach(e => {
            e.place = params.place
          })
          params.matches = params.matches.filter(e => {
            return e.personName && e.certificateTypeName && e.certificateTypeId && e.certificateNumber
          })
          /**
           * 图片转换
           */
          params.bodys = this.bodyFileList.map(e => {
            return {
              imagePath: e.url,
              id: e._id
            }
          })

          /**
           * 警官处理
           */
          // strongWarning.caseHandlers[0].caseHandlerName = strongWarning.caseHandlerOne
          // strongWarning.caseHandlers[0].phone = strongWarning.caseHandlerOnePhone
          // strongWarning.caseHandlers[1].caseHandlerName = strongWarning.caseHandlerTwo
          // strongWarning.caseHandlers[1].phone = strongWarning.caseHandlerTwoPhone
          /**
           * 家属信息处理
           * 如果没填写就不传
           */
          basicInfo.homes = basicInfo.homes.filter(e => e.homeName && e.phone)
          /**
           * 时间转时间戳
           */
          // strongWarning.firstDrugTime = strToTimeTemp(strongWarning.firstDrugTime)
          // basicInfo.personBirthday = strToTimeTemp(basicInfo.personBirthday)
          // strongWarning.enteringInstituteDate = strToTimeTemp(strongWarning.enteringInstituteDate)
          /**
           * 把入所日期当成开始关押日期
           */
          strongWarning.custodyDateStart = strongWarning.enteringInstituteDate
          /**
           * 数组转成字符串
           */
          params.bodyStatus = params.bodyStatus.toString()
          strongWarning.limitation = strongWarning.limitation.toString()
          strongWarning.crimeId = strongWarning.crimeId.toString()
          strongWarning.crimeName = strongWarning.crimeId.toString()
          if (this.type === 'register' || this.type === 'add') {
            this.addServer(params)
          } else {
            this.updateServer(params)
          }
        }
      })
    },
    /**
     * 提交新增的内容
     */
    addServer(params) {
      addCustodyInformation(params).then(data => {
        this.showPop = false
        this.loading = false
        this.$emit('success')
      }).catch(() => {
        this.loading = false
      })
    },
    /**
     * 提交修改的内容
     */
    updateServer(params) {
      update(params).then(data => {
        this.$message.success('修改成功')
        this.showPop = false
        this.loading = false
        this.$emit('success')
      }).catch(() => {
        this.loading = false
      })
    },
    addPartner() {
      this.showPartner = true
    },
    changeIdCard(val) {
      this.$refs.form.validateField('basicInfo.certificateNumber', (error) => {
        if (!error) {
          if ((this.type === 'register' || this.type === 'add') && (this.form.basicInfo.certificateTypeId === 1000000000000 || this.form.basicInfo.certificateTypeId === 1000000000001)) {
            const y = val.slice(6, 10)
            const m = val.slice(10, 12)
            const d = val.slice(12, 14)
            const sex = val.slice(16, 17)
            if (sex % 2 === 1) {
              this.form.basicInfo.personSex = '男'
            } else {
              this.form.basicInfo.personSex = '女'
            }
            this.form.basicInfo.personBirthday = new Date([y, m, d].join('-')).getTime()
            findSuggestion({ certificateNumber: val, certificateTypeId: this.form.basicInfo.certificateTypeId }).then(data => {
              console.log(data)
              this.form.basicInfo.strongWarning.caseHandlingUnitName = data.caseHandlingUnitName
              this.form.basicInfo.strongWarning.caseHandlingUnitId = data.caseHandlingUnitId
              this.form.basicInfo.strongWarning.caseHandlingUnitTypeId = data.caseHandlingUnitTypeId
              this.form.basicInfo.strongWarning.caseHandlingUnitTypeName = data.caseHandlingUnitTypeName
              this.form.basicInfo.strongWarning.caseHandlerOne = data.caseHandlers[0].caseHandlerName
              this.form.basicInfo.strongWarning.caseHandlerOnePhone = data.caseHandlers[0].phone
              this.form.basicInfo.strongWarning.caseHandlerTow = data.caseHandlers[1].caseHandlerName
              this.form.basicInfo.strongWarning.caseHandlerTowPhone = data.caseHandlers[1].phone
            })
          }
        } else {
          return false
        }
      })
      // if((this.type === 'register' || this.type === 'add') && (this.basicInfo.certificateTypeId === 1000000000000 || this.basicInfo.certificateTypeId === 1000000000001)) {
      // const y = v.certificateNumber.slice(6, 10)
      // const m = v.certificateNumber.slice(10, 12)
      // const d = v.certificateNumber.slice(12, 14)
      // const sex = v.certificateNumber.slice(16, 17)
      // if (sex % 2 === 1) {
      //   v.personSex = '男'
      // } else {
      //   v.personSex = '女'
      // }
      // v.personBirthday = new Date([y, m, d].join('-'))
      // }
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
    getPartners(list) {
      const temp = []
      for (let index = 0; index < list.length; index++) {
        const element = list[index]
        let flag = false
        this.form.matches.forEach(item => {
          if (item.unique === element.unique) {
            flag = true
          }
        })
        if (flag) {
          continue
        } else {
          element.idValedate = true
          temp.push(element)
        }
      }
      console.log(temp)
      this.form.matches.unshift(...temp)
    }
  }
}

</script>
<style lang="scss" scoped>
.base-title {
  font-size: 16px;
  color: #333;
  position: relative;
  padding-left: 13px + 3px + 9px;
  margin-top: 20px;
  margin-bottom: 20px;
  &::after {
    content:'';
    position: absolute;
    left: 9px;
    width: 3px;
    height: 18px;
    background-color: #0070F4;
  }
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

.head-img {
  width: 140px;
  height: 140px;
  box-shadow: 0 0 6px 1px rgba(0,0,0,.05);
  display: inline-block;
  border-radius: 5px;
  margin: 10px;
}
::v-deep .el-input.is-disabled .el-input__inner {
  color: #333;
}

::v-deep .el-radio__input.is-disabled.is-checked .el-radio__inner,
::v-deep .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
  border-color: #1890ff;
  background: #1890ff;
}

.imgList {
  img {
    height: 146px;
    width: 146px;
    display: inline-block;
    border: 1px solid #f5f7fa;
    border-radius: 5px;
    margin-right: 15px;
  }
}
::v-deep .tableidcard {
  padding: 20px 0;
  position: relative;
  .validate {
     input {
      border-color: #ff4949;
    }
  }
   .el-form-item__error {
      left: 10px;
      top: auto;
    }
}
</style>
