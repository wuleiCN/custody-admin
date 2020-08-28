import Mock from 'mockjs'

Mock.mock('/mock/user', {
  'content|2-5': [
    {
      'policeCode|1': '@string("number", 7)',
      'username|1': '@cname',
      'role|1-3': [
        {
          'name|1': [
            '收押岗民警',
            '接待岗民警',
            '管教岗民警',
            '巡视岗民警',
            '医疗岗民警',
            '财物岗民警',
            '后勤岗民警',
            '管教岗辅警',
            '巡视岗辅警',
            '所领导',
            '巡视岗辅警',
            '综合管理岗民警'
          ]
        }
      ],
      'existFace|1': '@boolean',
      'existFingerprint|1': '@boolean',
      'state|1': '@boolean'
    }
  ]
})

Mock.mock('/mock/roles', 'get', [
  '收押岗民警',
  '接待岗民警',
  '管教岗民警',
  '巡视岗民警',
  '医疗岗民警',
  '财物岗民警',
  '后勤岗民警',
  '管教岗辅警',
  '巡视岗辅警',
  '所领导',
  '巡视岗辅警',
  '综合管理岗民警'
])

Mock.mock('/mock/supervise-internal-service-basic-info/user/list', 'post', {
  'code': 2000,
  'message': '成功',
  'data': [
    {
      'pageNo': 1,
      'resultSize': 8,
      'key': null,
      'id': 1,
      'userName': 'a',
      'userPhone': null,
      'userEmail': null,
      'policeCode': 'd',
      'face': '1',
      'existFace': 1,
      'departmentId': 1,
      'userType': '1',
      'userSource': '1',
      'state': 1,
      'roleList': [
        {
          'id': 1,
          'roleName': '1',
          'code': '1',
          'state': null,
          'createBy': null,
          'createTime': null,
          'updateBy': null,
          'updateTime': null,
          'sortNumber': 1
        },
        {
          'id': 2,
          'roleName': '2',
          'code': '2',
          'state': null,
          'createBy': null,
          'createTime': null,
          'updateBy': null,
          'updateTime': null,
          'sortNumber': 2
        },
        {
          'id': 3,
          'roleName': '3',
          'code': '3',
          'state': 1,
          'createBy': null,
          'createTime': null,
          'updateBy': null,
          'updateTime': null,
          'sortNumber': 3
        }
      ]
    },
    {
      'pageNo': 1,
      'resultSize': 8,
      'key': null,
      'id': 200810000001,
      'userName': 'a',
      'userPhone': '',
      'userEmail': '',
      'policeCode': 'aa',
      'face': '',
      'existFace': null,
      'departmentId': 10110111111110,
      'userType': '',
      'userSource': '',
      'state': 1,
      'roleList': null
    },
    {
      'pageNo': 1,
      'resultSize': 8,
      'key': null,
      'id': 200810000002,
      'userName': 'a',
      'userPhone': '',
      'userEmail': '',
      'policeCode': 'bb',
      'face': '',
      'existFace': null,
      'departmentId': 10110111111110,
      'userType': '',
      'userSource': '',
      'state': 1,
      'roleList': null
    },
    {
      'pageNo': 1,
      'resultSize': 8,
      'key': null,
      'id': 200810000003,
      'userName': 'a',
      'userPhone': '',
      'userEmail': '',
      'policeCode': 'cc',
      'face': '',
      'existFace': null,
      'departmentId': 10110111111110,
      'userType': '',
      'userSource': '',
      'state': 1,
      'roleList': null
    },
    {
      'pageNo': 1,
      'resultSize': 8,
      'key': null,
      'id': 200810000004,
      'userName': 'a',
      'userPhone': '',
      'userEmail': '',
      'policeCode': 'dd',
      'face': '',
      'existFace': null,
      'departmentId': 10110111111110,
      'userType': '',
      'userSource': '',
      'state': 1,
      'roleList': null
    },
    {
      'pageNo': 1,
      'resultSize': 8,
      'key': null,
      'id': 200810000005,
      'userName': 'a',
      'userPhone': '',
      'userEmail': '',
      'policeCode': 'ff',
      'face': '',
      'existFace': null,
      'departmentId': 10110111111110,
      'userType': '',
      'userSource': '',
      'state': 1,
      'roleList': null
    },
    {
      'pageNo': 1,
      'resultSize': 8,
      'key': null,
      'id': 200810000006,
      'userName': 'a',
      'userPhone': '',
      'userEmail': '',
      'policeCode': 'dds',
      'face': '',
      'existFace': null,
      'departmentId': 10110111111110,
      'userType': '',
      'userSource': '',
      'state': 1,
      'roleList': null
    },
    {
      'pageNo': 1,
      'resultSize': 8,
      'key': null,
      'id': 200811000017,
      'userName': 'a',
      'userPhone': null,
      'userEmail': null,
      'policeCode': 'f',
      'face': null,
      'existFace': 1,
      'departmentId': 1,
      'userType': null,
      'userSource': null,
      'state': 1,
      'roleList': null
    }
  ],
  'query': null,
  'total': 19
})
