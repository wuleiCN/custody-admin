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
      required: true, trigger: 'change', message: '请选择登记日期'
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
    'basicInfo.strongWarning.decisionOfficeId': [{
      required: true, trigger: 'change', message: '请选择强制戒毒机关'
    }],
    'basicInfo.strongWarning.drugDetoxificationTermRange': [{
      required: true, trigger: 'change', message: '请选择强制戒毒期限'
    }],
    'basicInfo.strongWarning.firstDrugTime': [{
      required: true, trigger: 'change', message: '请选择初次吸毒时间'
    }],
    'basicInfo.strongWarning.drugDetoxificationCount': [{
      required: true, trigger: 'blur', message: '请输入以往戒毒次数'
    }],
    // 'basicInfo.strongWarning.otherConcurrentPenaltie': [{
    //   required: true, trigger: 'blur', message: '请输入其他并行处罚'
    // }],
    'basicInfo.strongWarning.smokingNarcoticsTypeId': [{
      required: true, trigger: 'change', message: '请选择吸食毒品种类'
    }],
    'basicInfo.strongWarning.smokingNarcoticsMethodId': [{
      required: true, trigger: 'change', message: '请选择吸食方式'
    }],
    'basicInfo.strongWarning.entryMethodId': [{
      required: true, trigger: 'change', message: '请选择入所方式'
    }],
    'custodyWardId': [{
      required: true, trigger: 'change', message: '请选择病室'
    }]
  }
}
