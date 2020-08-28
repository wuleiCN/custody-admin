import request from '@/utils/request'

// 添加办案人员
export function addPersonCaseHandlerInfomation(data) {
  return request({
    url: 'supervise/reception-case-management/personCaseHandlerInfomation/add',
    method: 'post',
    data
  })
}
// 获取办案人员列表
export function personCaseHandlerInfomation(data) {
  return request({
    url: 'supervise/reception-case-management/personCaseHandlerInfomation/list',
    method: 'post',
    data
  })
}

// 根据id修改办案人员信息
export function updatePersonCaseHandler (data) {
  return request({
    url: 'supervise/reception-case-management/personCaseHandlerInfomation/update',
    method: 'post',
    data
  })
}

// 批量导入办案人员
export function addListPersonCaseHandlerInfomation(data) {
  return request({
    url: 'supervise/reception-case-management/personCaseHandlerInfomation/addList',
    method: 'post',
    data
  })
}
