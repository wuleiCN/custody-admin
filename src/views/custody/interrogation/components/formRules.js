export default (self) => {
  const idHandle = (value, id, callback) => {
    if (!/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value) &&
    (id === 1000000000000 || id === 1000000000001)) {
      callback(new Error('请输入正确的身份证号码'))
    } else {
      callback()
    }
  }
  return {
    'caseHandlerCertificatesOne': [
      { validator: (rule, value, callback) => {
        return idHandle(value, self.form.certificatesTypeIdOne, callback)
      }, trigger: 'blur' }
    ],
    'caseHandlerCertificatesTwo': [
      { validator: (rule, value, callback) => {
        return idHandle(value, self.form.certificatesTypeIdTwo, callback)
      }, trigger: 'blur' }
    ],
    'registerTime': [{
      required: true, trigger: 'change', message: '请选择登记日期'
    }],
    'caseHandlingUnitId': [{
      required: true, trigger: 'change', message: '请选择办案单位'
    }],
    'caseHandlingUnitTypeId': [{
      required: true, trigger: 'change', message: '请选择办案单位类型'
    }],
    'caseHandlerPhoneOne': [{
      required: true, trigger: 'blur', message: '请输入办案人电话'
    }, {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入办案人电话'))
        } else if (value === self.form.caseHandlerPhoneTwo) {
          callback(new Error('两位办案人电话不能相同!'))
        } else {
          callback()
        }
      }, trigger: 'blur'
    }],
    'caseHandlerOne': [{
      required: true, trigger: 'blur', message: '请输入办案人姓名'
    }],
    'caseHandlerPhoneTwo': [{
      required: true, trigger: 'blur', message: '请输入办案人电话'
    }, {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入办案人电话'))
        } else if (value === self.form.caseHandlerPhoneOne) {
          callback(new Error('两位办案人电话不能相同!'))
        } else {
          callback()
        }
      }, trigger: 'blur'
    }],
    'caseHandlerTwo': [{
      required: true, trigger: 'blur', message: '请输入办案人姓名'
    }]
  }
}
