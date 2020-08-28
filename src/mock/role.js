import Mock from 'mockjs'

Mock.mock('/mock/role', {
  'content|2-5': [
    {
      'id|1': '@string("number", 7)',
      'roleName|1': [
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
        '综合管理岗民警',
        '巡视岗辅警'
      ],
      'powers|1-5': [
        {
          'name|1': [
            '新增收押',
            '生物信息录入',
            '查看台账',
            '修改台账',
            '数据统计'
          ]
        }
      ]
    }
  ]
})

Mock.mock('/mock/powers', {
  content: [
    {
      id: 1,
      label: '收押岗',
      children: [
        {
          id: 11,
          label: '首页'
        },
        {
          id: 12,
          label: '收押管理',
          children: [
            {
              id: 121,
              label: '新增收押'
            },
            {
              id: 122,
              label: '生物信息录入'
            },
            {
              id: 123,
              label: '收押台账',
              children: [
                {
                  id: 1231,
                  label: '查看台账'
                },
                {
                  id: 1232,
                  label: '修改台账'
                }
              ]
            },
            {
              id: 124,
              label: '数据统计'
            }
          ]
        }
      ]
    }
  ]
})

Mock.mock('/mock/dict', {
  dict: [
    {
      id: 1,
      name: '监室类型',
      children: [
        '已决监室',
        '单独关押监室',
        '一般监室',
        '会见室',
        '提讯室',
        '重点监室',
        '过渡监室',
        '未成年监室'
      ]
    }
  ]
})

Mock.mock('/mock/supervise-internal-service-basic-info/dictionaryType/select', 'post', {
  'code': 2000,
  'message': '成功',
  'data': [
    {
      'id': 1290986276480856066,
      'dictionaryTypeName': '处理结果',
      'dictionaryTypeCode': null,
      'state': null,
      'sortNumber': null,
      'createTime': null,
      'createBy': null,
      'updateTime': null,
      'updateBy': null
    },
    {
      'id': 1290986276489244674,
      'dictionaryTypeName': '人员管理类别代码',
      'dictionaryTypeCode': null,
      'state': null,
      'sortNumber': null,
      'createTime': null,
      'createBy': null,
      'updateTime': null,
      'updateBy': null
    },
    {
      'id': 1290986276506021889,
      'dictionaryTypeName': '临时出所原因代码',
      'dictionaryTypeCode': null,
      'state': null,
      'sortNumber': null,
      'createTime': null,
      'createBy': null,
      'updateTime': null,
      'updateBy': null
    },
    {
      'id': 1290986276514410497,
      'dictionaryTypeName': '出所原因代码',
      'dictionaryTypeCode': null,
      'state': null,
      'sortNumber': null,
      'createTime': null,
      'createBy': null,
      'updateTime': null,
      'updateBy': null
    },
    {
      'id': 1290986276531187714,
      'dictionaryTypeName': '留所原因代码',
      'dictionaryTypeCode': null,
      'state': null,
      'sortNumber': null,
      'createTime': null,
      'createBy': null,
      'updateTime': null,
      'updateBy': null
    },
    {
      'id': 1290986276539576321,
      'dictionaryTypeName': '办案单位类型代码',
      'dictionaryTypeCode': null,
      'state': null,
      'sortNumber': null,
      'createTime': null,
      'createBy': null,
      'updateTime': null,
      'updateBy': null
    },
    {
      'id': 1290986276547964929,
      'dictionaryTypeName': '奖惩形式代码',
      'dictionaryTypeCode': null,
      'state': null,
      'sortNumber': null,
      'createTime': null,
      'createBy': null,
      'updateTime': null,
      'updateBy': null
    },
    {
      'id': 1290986276556353537,
      'dictionaryTypeName': '使用戒具原因代码',
      'dictionaryTypeCode': null,
      'state': null,
      'sortNumber': null,
      'createTime': null,
      'createBy': null,
      'updateTime': null,
      'updateBy': null
    },
    {
      'id': 1290986276585713665,
      'dictionaryTypeName': '调整监室原因代码',
      'dictionaryTypeCode': null,
      'state': null,
      'sortNumber': null,
      'createTime': null,
      'createBy': null,
      'updateTime': null,
      'updateBy': null
    },
    {
      'id': 1290986276594102273,
      'dictionaryTypeName': '特殊身份代码',
      'dictionaryTypeCode': null,
      'state': null,
      'sortNumber': null,
      'createTime': null,
      'createBy': null,
      'updateTime': null,
      'updateBy': null
    }
  ],
  'query': {
    'pageNo': 1,
    'resultSize': 10,
    'key': '',
    'id': 0,
    'dictionaryTypeName': '',
    'dictionaryTypeCode': '',
    'state': 0,
    'dic': null
  },
  'total': 99
})

Mock.mock('/mock/prison', {
  region: [
    {
      id: 1,
      name: '一监区',
      value: 'one'
    },
    {
      id: 2,
      name: '二监区',
      value: 'tow'
    }
  ],
  prison: [
    {
      id: 3,
      name: '一般监室',
      value: 'normal'
    },
    {
      id: 4,
      name: '重点监室',
      value: 'weight'
    },
    {
      id: 5,
      name: '单独关押监室',
      value: 'alone'
    }
  ]
})

Mock.mock('/mock/prisonList', {
  'prisonList|2-5': [
    {
      prisonNum: '@string("number", 3)',
      'prisonName|1': ['一般监室', '重点监室', '单独关押监室'],
      'type|1': ['一般监室', '重点监室', '单独关押监室'],
      'fatRegion|1': ['一监区', '二监区'],
      usernameFirst: '@cname',
      usernameTwo: '@cname',
      maxPerson: '@string("number",2)'
    }
  ]
})

Mock.mock('/mock/journal', {
  'data|2-5': [
    {
      id: '@string("number", 7)',
      username: '@cname',
      date: '@datetime',
      ip: '@ip',
      'operation|1': ['修改角色', '新增角色', '修改入所原因', '新增字典'],
      'type|1': ['登录', '角色管理', '权限管理', '字典管理'],
      'result|1': ['成功', '失败']
    }
  ]
})
