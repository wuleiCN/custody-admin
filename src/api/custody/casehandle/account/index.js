import request from '@/utils/request'

// 办案台账分页
export function caseHandlerBook(data) {
  return request({
    url: 'supervise/reception-case-management/caseHandlerBook/caseHandlerBook',
    method: 'post',
    data
  })
}

// 查询办案台账单个
export function caseHandlerBookDesc(id) {
  return request({
    url: `supervise/reception-case-management/caseHandlerBook/caseHandlerBookDesc/${id}`,
    method: 'get'
  })
}
