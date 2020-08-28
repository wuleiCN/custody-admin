
const defualtTime = new Date().getTime()

export default {
  'basicInfo': {
    'certificateTypeId': 1000000000000,
    'personBirthday': null,
    'personSex': '',
    'personName': '',
    'certificateNumber': null,
    'certificateTypeName': '',
    'number': '',
    'strongWarning': {
      'caseHandlingUnitId': null,
      'caseHandlers': [
        {
          'caseHandlerName': '',
          'phone': null
        },
        {
          'caseHandlerName': '',
          'phone': null
        }
      ],
      'legalDocumentNo': '',
      'decisionOfficeName': '',
      'decisionOfficeId': '',
      'caseHandlingUnitName': '',
      'enteringInstituteDate': defualtTime
    }
  },
  'rejectReason': [],
  'rejectReasonId': []
}
