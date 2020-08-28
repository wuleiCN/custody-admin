export default (self) => {
  const idCardValedate = (rule, value, callback) => {
    if (!/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value) &&
    (self.form.basicInfo.certificateTypeId === 1000000000000 || self.form.basicInfo.certificateTypeId === 1000000000001)) {
      callback(new Error('请输入正确的身份证号码'))
    } else {
      callback()
    }
  }
  return {
    'basicInfo.certificateTypeId': [{
      required: true, trigger: 'change', message: '请选择证件类型'
    }],
    'basicInfo.certificateNumber': [
      { required: true, trigger: 'blur', message: '请输入证件号码' },
      { validator: idCardValedate, trigger: 'blur' }
    ],
    'basicInfo.personName': [{
      required: true, trigger: 'blur', message: '请输入姓名'
    }],
    'basicInfo.personSex': [{
      required: true, trigger: 'change', message: '请选择性别'
    }],
    'basicInfo.personBirthday': [{
      required: true, trigger: 'change', message: '请选择国籍'
    }],
    'basicInfo.personNationalityId': [{
      required: true, trigger: 'change', message: '请选择国籍'
    }],
    'basicInfo.personNationId': [{
      required: true, trigger: 'change', message: '请选择民族'
    }],
    'basicInfo.personRegisteredResidence': [{
      required: true, trigger: 'blur', message: '请输入户口所在地'
    }],
    'basicInfo.personEducationId': [{
      required: true, trigger: 'change', message: '请选择文化程度'
    }],
    'basicInfo.strongWarning.enteringInstituteDate': [{
      required: true, trigger: 'change', message: '请选择入所日期'
    }],
    'basicInfo.strongWarning.caseHandlingUnitId': [{
      required: true, trigger: 'change', message: '请选择办案单位'
    }],
    'basicInfo.strongWarning.caseHandlingUnitTypeId': [{
      required: true, trigger: 'change', message: '请选择办案单位类型'
    }],
    'basicInfo.homes[0].homeName': [{
      required: true, trigger: 'blur', message: '请输入家属姓名'
    }, {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入家属姓名'))
        } else if (value === self.form.basicInfo.homes[1].homeName) {
          callback(new Error('重复家属姓名!'))
        } else {
          callback()
          // self.$refs.form.validateField('basicInfo.homes[1].homeName')
        }
      }, trigger: 'blur'
    }],
    'basicInfo.homes[1].homeName': [{
      validator: (rule, value, callback) => {
        if (value === self.form.basicInfo.homes[0].homeName) {
          callback(new Error('重复家属姓名!'))
        } else {
          callback()
          // self.$refs.form.validateField('basicInfo.homes[0].homeName')
        }
      }, trigger: 'blur'
    }],
    'basicInfo.homes[0].phone': [{
      required: true, trigger: 'blur', message: '请输入家属电话'
    }, {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入家属姓名'))
        } else if (value === self.form.basicInfo.homes[1].phone) {
          callback(new Error('重复家属电话!'))
        } else {
          callback()
          // self.$refs.form.validateField('basicInfo.homes[1].phone')
        }
      }, trigger: 'blur'
    }],
    'basicInfo.homes[1].phone': [{
      validator: (rule, value, callback) => {
        if (value === self.form.basicInfo.homes[0].phone) {
          callback(new Error('重复家属电话!'))
        } else {
          callback()
          // self.$refs.form.validateField('basicInfo.homes[0].phone')
        }
      }, trigger: 'blur'
    }],
    'basicInfo.strongWarning.legalDocumentNo': [{
      required: true, trigger: 'blur', message: '请输入法律文书号'
    }],
    'basicInfo.strongWarning.caseHandlers[0].phone': [{
      required: true, trigger: 'blur', message: '请输入办案人电话'
    }, {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入办案人电话'))
        } else if (value === self.form.basicInfo.strongWarning.caseHandlers[1].phone) {
          callback(new Error('两位办案人电话不能相同!'))
        } else {
          callback()
        }
      }, trigger: 'blur'
    }],
    'basicInfo.strongWarning.caseHandlers[0].caseHandlerName': [{
      required: true, trigger: 'blur', message: '请输入办案人姓名'
    }],
    'basicInfo.strongWarning.caseHandlers[1].phone': [{
      required: true, trigger: 'blur', message: '请输入办案人电话'
    }, {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入办案人电话'))
        } else if (value === self.form.basicInfo.strongWarning.caseHandlers[0].phone) {
          callback(new Error('两位办案人电话不能相同!'))
        } else {
          callback()
        }
      }, trigger: 'blur'
    }],
    'basicInfo.strongWarning.caseHandlers[1].caseHandlerName': [{
      required: true, trigger: 'blur', message: '请输入办案人姓名'
    }],
    'custodyWardId': [{
      required: true, trigger: 'change', message: '请选择收押监室'
    }],
    'basicInfo.strongWarning.entryReasonId': [{
      required: true, trigger: 'change', message: '请选择入所原因'
    }],
    'basicInfo.strongWarning.voucherId': [{
      required: true, trigger: 'change', message: '请选择收押凭证'
    }],
    'basicInfo.strongWarning.caseSummary': [{
      required: true, trigger: 'blur', message: '请输入简要案情'
    }],
    'basicInfo.strongWarning.custodyDateEnd': [{
      required: true, trigger: 'change', message: '请选择关押截止日期'
    }],
    'basicInfo.strongWarning.sendUnitId': [{
      required: true, trigger: 'change', message: '请选择送押单位'
    }],
    'basicInfo.strongWarning.caseSegmentId': [{
      required: true, trigger: 'change', message: '请选择办案环节'
    }],
    'basicInfo.strongWarning.crimeId': [{
      required: true, trigger: 'change', message: '请选择案件类型'
    }],
    'basicInfo.strongWarning.accusation': [{
      required: true, trigger: 'blur', message: '请选择涉嫌罪名'
    }],
    'basicInfo.strongWarning.criminalRecord': [{
      required: true, trigger: 'change', message: '请选择有无前科'
    }]
  }
}
