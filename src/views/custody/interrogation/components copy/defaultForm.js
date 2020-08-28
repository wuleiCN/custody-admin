const startTime = new Date()
const endTime = new Date()
endTime.setFullYear(endTime.getFullYear() + 2)

export default {
  'numberClothesNumber': '',
  'custodyWardId': '',
  'custodyWardName': '',
  'bodyCheckId': 0,
  'bodyStatus': [],
  'rejectReasonId': null,
  'rejectReason': '',
  'custodyStatus': '2',
  'basicInfo': {
    'personNumber': '',
    'certificateTypeId': 1000000000000, // 默认身份证
    'certificateTypeName': '',
    'certificateNumber': '',
    'personName': '',
    'personAliasName': null,
    'personSex': '',
    'personBirthday': null,
    'personNationalityId': 1000000001482, // 默认中国,
    'personNationalityName': '',
    'personNationId': 1000000000154, // 默认汉族
    'personNationName': '',
    'personMaritalStatusId': null,
    'personMaritalStatusName': '',
    'personRegisteredResidence': '',
    'personPermanentResidence': null,
    'personEducationId': 1000000000249, // 默认初中毕业
    'personEducationName': '',
    'personWorkCompany': null,
    'personMedicalInsuranceSituation': null,
    'personResume': null,
    'personProcessingRecord': null,
    'personPhysicalFeatures': null,
    'strongWarning': {
      'enteringInstituteDate': new Date().getTime(),
      'decisionOfficeId': null,
      'decisionOfficeName': '',
      'legalDocumentNo': '',
      'drugDetoxificationTermStart': startTime.getTime(),
      'drugDetoxificationTermEnd': endTime.getTime(),
      'drugDetoxificationTermRange': [startTime.getTime(), endTime.getTime()],
      'caseHandlingUnitTypeId': 1000000001739,
      'caseHandlingUnitTypeName': null,
      'caseHandlingUnitId': null,
      'caseHandlingUnitName': '',
      'caseHandlerOne': '',
      'caseHandlerOnePhone': '',
      'caseHandlerTow': '',
      'caseHandlerTowPhone': '',
      'firstDrugTime': null,
      'drugDetoxificationCount': null,
      'smokingNarcoticsTypeId': null,
      'smokingNarcoticsTypeName': '',
      'smokingNarcoticsMethodId': null,
      'smokingNarcoticsMethodName': '',
      'entryMethodId': 10200820000006,
      'entryMethodName': null,
      'otherConcurrentPenaltie': null,
      'limitation': [],
      'remark': null,
      'operatorName': '',
      'operatorAlarmSignal': '',
      'caseHandlers': [{
        'caseHandlerName': '',
        'phone': ''
      }, {
        'caseHandlerName': '',
        'phone': ''
      }]
    },
    'homes': [{
      'homeName': '',
      'phone': ''
    }, {
      'homeName': '',
      'phone': ''
    }]
  },
  'storages': [],
  'matches': [],
  'bodys': []
}
