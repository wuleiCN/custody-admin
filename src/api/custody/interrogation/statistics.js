import request from '@/utils/request'

export const getCustodyStatistics = data => {
  return request({
    url: 'supervise/reception-custody-watch/arraignSolutionLedger/statistics',
    method: 'post',
    data: data
  })
}
