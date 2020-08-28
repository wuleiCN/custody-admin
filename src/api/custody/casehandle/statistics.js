// 办案统计api
import request from '@/utils/request'
// 办案统计
export function caseHandlerTotal(params) {
  return request({
    url: `supervise/reception-case-management/caseHandlerBook/caseHandlerTotal`,
    method: 'post',
    params
  })
}
