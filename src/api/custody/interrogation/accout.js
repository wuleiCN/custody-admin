
import request from '@/utils/request'

export const getList = data => {
  return request({
    url: 'supervise/reception-custody-watch/arraignSolutionLedger/conditionQuery',
    method: 'post',
    data
  })
}
export const getDetailById = id => {
  return request({
    url: 'supervise/reception-custody-watch/arraignSolutionLedger/find/' + id,
    method: 'get'
  })
}
