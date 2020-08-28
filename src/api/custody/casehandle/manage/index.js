import request from '@/utils/request'

// 办案环节分页
export function caseHandlerLink(data) {
  return request({
    url: 'supervise/reception-case-management/caseHandlerLink/list',
    method: 'post',
    data
  })
}
// 期限变更分页
export function detainTimeLimit(data) {
  return request({
    url: 'supervise/reception-case-management/detainTimeLimit/list',
    method: 'post',
    data
  })
}

// 处理结果分页
export function disposeResult (data) {
  return request({
    url: 'supervise/reception-case-management/disposeResult/list',
    method: 'post',
    data
  })
}

// 留所服刑分页
export function leaveStationSentence(data) {
  return request({
    url: 'supervise/reception-case-management/leaveStationSentence/list',
    method: 'post',
    data
  })
}

// 查询办案环节单个
export function findCaseHandlerLink(id) {
  return request({
    url: `supervise/reception-case-management/caseHandlerLink/findHistry/${id}`,
    method: 'get'
  })
}

// 查询处理结果单个
export function findDisposeResult(id) {
  return request({
    url: `supervise/reception-case-management/disposeResult/findHistry/${id}`,
    method: 'get'
  })
}

// 查询羁押期限单个
export function findDetainTimeLimit(id) {
  return request({
    url: `supervise/reception-case-management/detainTimeLimit/findHistry/${id}`,
    method: 'get'
  })
}

// 新增期限变更
export function addDetainTime(data) {
  return request({
    url: 'supervise/reception-case-management/detainTimeLimit/add',
    method: 'post',
    data
  })
}

// 新增留所服刑
export function addLeaveStation(data) {
  return request({
    url: 'supervise/reception-case-management/leaveStationSentence/add',
    method: 'post',
    data
  })
}

// 新增办案环节
export function addCasehandler(data) {
  return request({
    url: 'supervise/reception-case-management/caseHandlerLink/add',
    method: 'post',
    data
  })
}

// 新增处理结果
export function addDisposeResult(data) {
  return request({
    url: 'supervise/reception-case-management/disposeResult/add',
    method: 'post',
    data
  })
}

// 办案环节查找同案人员
export function findLinkAccomplice(data) {
  return request({
    url: 'supervise/reception-case-management/caseHandlerLink/findLinkAccomplice',
    method: 'post',
    data
  })
}
// 处理结果查找同案人员
export function findResultAccomplice(data) {
  return request({
    url: 'supervise/reception-case-management/disposeResult/findResultAccomplice',
    method: 'post',
    data
  })
}

// 生成提讯解码
export function getQrCode(id) {
  return request({
    url: `supervise/reception-case-management/caseHandlerLink/getQrCode/${id}`,
    method: 'get'
  })
}
